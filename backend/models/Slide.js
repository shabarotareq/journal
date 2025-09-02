const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Slide = sequelize.define(
  "Slide",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
    },
    textContent: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true, // ينشئ createdAt و updatedAt تلقائيًا
    tableName: "Slides",
  }
);

module.exports = Slide;
