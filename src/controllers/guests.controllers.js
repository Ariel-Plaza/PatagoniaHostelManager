import Guest from "../models/Guest.models.js";
import Address from "../models/Address.models.js";

export const createGuest = async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", JSON.stringify(req.body, null, 2));

    const {
      guest_id,
      first_name,
      last_name,
      nationality,
      city_of_origin,
      email,
      phone_number,
      address,
    } = req.body;
    // Armar el objeto de dirección
    const { street, city, region, country, postal_code } = address || {}; // 👈 validación defensiva

    // Validar campos obligatorios
    if (
      !first_name ||
      !last_name ||
      !nationality ||
      !city_of_origin ||
      !email ||
      !phone_number ||
      !address.street ||
      !address.city ||
      !address.region ||
      !address.country ||
      !address.postal_code
    ) {
      return res.status(400).json({
        code: 400,
        message: "Faltan campos obligatorios",
      });
    }

    // Crear la dirección
    const addressRecord = await Address.create(address);

    // Crear el huésped vinculado a la dirección
    const newGuest = await Guest.create({
      guest_id,
      first_name,
      last_name,
      nationality,
      city_of_origin,
      email,
      phone_number,
      address_id: addressRecord.address_id,
    });

    // Respuesta con include opcional
    const guestWithAddress = await Guest.findByPk(newGuest.guest_id, {
      include: {
        model: Address,
        as: "Address", // si usaste alias
      },
    });

    res.status(201).json({
      code: 201,
      message: "Usuario creado con éxito",
      data: guestWithAddress,
    });
  } catch (error) {
    console.error("Stack del error:", error.stack);
    res.status(500).json({
      code: 500,
      message: "Error al crear usuario backend",
      error: error.message,
    });
  }
};
