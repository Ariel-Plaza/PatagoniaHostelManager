import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const ReservationHeader = sequelize.define(
  "ReservationHeader",
  {
    reservation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    guest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Guest",
        key: "guest_id",
      },
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Room",
        key: "room_id",
      },
    },
    check_in: {
      type: DataTypes.DATEONLY,
    },
    check_out: {
      type: DataTypes.DATEONLY,
    },
    r_status: {
      type: DataTypes.STRING(15),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "ReservationHeader",
    timestamps: false,
  }
);

export default ReservationHeader;
