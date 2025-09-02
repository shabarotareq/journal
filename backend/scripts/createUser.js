const { Client } = require("pg");

const client = new Client({
  user: "postgres", // مستخدم الـ superuser الحالي
  host: "localhost",
  database: "rebuilt_voices", // اسم قاعدة البيانات
  password: "root", // عدّلها
  port: 5432,
});

const newUsername = "rv_user"; // اسم المستخدم الجديد
const newPassword = "123321"; // كلمة مرور المستخدم الجديد

(async () => {
  try {
    await client.connect();
    console.log("✅ Connected as superuser");

    // إنشاء المستخدم إذا لم يكن موجود
    await client.query(`DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${newUsername}') THEN
      CREATE ROLE "${newUsername}" WITH LOGIN PASSWORD '${newPassword}';
   END IF;
END
$$;`);
    console.log(`✅ User "${newUsername}" created (if it didn't exist)`);

    // منح جميع الصلاحيات على schema public
    await client.query(
      `GRANT ALL PRIVILEGES ON SCHEMA public TO "${newUsername}";`
    );
    await client.query(
      `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "${newUsername}";`
    );
    await client.query(
      `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "${newUsername}";`
    );

    console.log(
      `✅ Granted all privileges to "${newUsername}" on schema public`
    );
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.end();
    console.log("🔌 Disconnected");
  }
})();
