import dotenv from "dotenv";
dotenv.config();
import sequelize from "./src/config/db.config.js";
import { DataTypes } from "sequelize";

// Modelo mínimo para Guest
const Guest = sequelize.define("Guest", {
  guest_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  nationality: { type: DataTypes.STRING, allowNull: false },
  city_of_origin: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  phone: DataTypes.STRING,
  addres_id: DataTypes.INTEGER
}, { tableName: "guest", timestamps: false }); // <-- nombre de tabla en minúsculas

(async () => {
  try {
    await sequelize.authenticate();
    // Inserta un registro (ajusta addres_id según tu tabla Address)
    const guest = await Guest.create({
      first_name: "Ana",
      last_name: "García",
      nationality: "Chile",
      city_of_origin: "Santiago",
      email: "ana.garcia@email.com",
      phone: "123456789",
      addres_id: null // O pon un ID válido si tienes una dirección creada
    });
    console.log("Insertado:", guest.toJSON());
    await sequelize.close();
  } catch (error) {
    console.error("Error al insertar:", error);
  }
})();