import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
const ReservationDetail = sequelize.define(
  "ReservationDetail",
  {
    detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reservation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "reservationheader",
        key: "reservation_id",
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "service",
        key: "service_id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
      },
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "reservationdetail",
    timestamps: false,
  }
);

export default ReservationDetail;
