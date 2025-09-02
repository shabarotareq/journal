-- إنشاء قاعدة البيانات (لو مش موجودة)
CREATE DATABASE rebuilt_voices;

-- الاتصال بقاعدة البيانات
\c rebuilt_voices;

-- إنشاء المستخدم مع صلاحية LOGIN وكلمة سر
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'rv_user') THEN
      CREATE ROLE rv_user WITH LOGIN PASSWORD '123321';
   END IF;
END
$$;

-- منح جميع الصلاحيات على قاعدة البيانات
GRANT ALL PRIVILEGES ON DATABASE rebuilt_voices TO rv_user;

-- منح جميع الصلاحيات على الـ schema public
GRANT ALL PRIVILEGES ON SCHEMA public TO rv_user;

-- منح جميع الصلاحيات على الجداول المستقبلية
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO rv_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO rv_user;

-- تشغيل السكريبت
-- psql -U postgres -f init.sql