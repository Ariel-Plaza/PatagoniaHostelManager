import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Guest = sequelize.define(
  "Guest",
  {
    guest_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city_of_origin: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        is: /^\+?[1-9]\d{1,14}$/, // E.164 format
      },
    },
    addres_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "address",
        key: "address_id",
      },
    },
  },
  {
    tableName: "guest",
    timestamps: false,
  }
);

export default Guest;
