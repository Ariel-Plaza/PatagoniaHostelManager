import { DataTypes } from "sequelize";

import sequelize from "../config/db.config.js";

const Address = sequelize.define(
  "Address",
  {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
  },
  {
    tableName: "address",
    timestamps: false,
  }
);

export default Address;