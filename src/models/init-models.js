import Address from "./Address.models.js";
import Guest from "./Guest.models.js";
import Room from "./Room.models.js";
import Service from "./Service.models.js";
import ReservationHeader from "./ReservationHeader.models.js";
import ReservationDetail from "./ReservationDetail.models.js";

export default function initModels(sequelize) {
  // Address 1 <--> N Guest
  Address.hasMany(Guest, { foreignKey: "addres_id" });
  Guest.belongsTo(Address, { foreignKey: "addres_id" });

  // Guest 1 <--> N ReservationHeader
  Guest.hasMany(ReservationHeader, { foreignKey: "guest_id" });
  ReservationHeader.belongsTo(Guest, { foreignKey: "guest_id" });

  // Room 1 <--> N ReservationHeader
  Room.hasMany(ReservationHeader, { foreignKey: "room_id" });
  ReservationHeader.belongsTo(Room, { foreignKey: "room_id" });

  // ReservationHeader 1 <--> N ReservationDetail
  ReservationHeader.hasMany(ReservationDetail, { foreignKey: "reservation_id" });
  ReservationDetail.belongsTo(ReservationHeader, {
    foreignKey: "reservation_id",
  });

  // Service 1 <--> N ReservationDetail
  Service.hasMany(ReservationDetail, { foreignKey: "service_id" });
  ReservationDetail.belongsTo(Service, { foreignKey: "service_id" });
}