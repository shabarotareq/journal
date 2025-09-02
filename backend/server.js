const express = require("express");
const sequelize = require("./config");
const Slide = require("./models/Slide");

const app = express();
const PORT = 5000;

app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ alter: true }); // ينشئ الجداول إذا لم تكن موجودة
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
