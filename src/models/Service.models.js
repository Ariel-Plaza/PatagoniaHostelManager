import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Service = sequelize.define(
  "Service",
  {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    s_name: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.STRING(200),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0,
      },
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Service",
    timestamps: false,
  }
);

export default Service;
