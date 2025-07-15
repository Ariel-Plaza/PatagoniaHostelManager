import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Room = sequelize.define(
  "Room",
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_number: {
      type: DataTypes.STRING(4),
      unique: true,
      allowNull: false,
    },
    room_type: {
      type: DataTypes.STRING(15),
    },
    capacity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
      },
    },
    price_per_night: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0,
      },
    },
    r_status: {
      type: DataTypes.STRING(15),
      validate: {
        isIn: [["available", "occupied", "maintenance", "reserved"]],
      },
    },
  },
  {
    tableName: "room",
    timestamps: false,
  }
);

export default Room;
