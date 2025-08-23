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
      email,
      phone_number,
      address,
    } = req.body;
    // Armar el objeto de dirección
    const { street, city, country} = address || {}; // 👈 validación defensiva

    // Validar campos obligatorios
    if (
      !first_name ||
      !last_name ||
      !nationality ||
      !email ||
      !phone_number ||
      !address.street ||
      !address.city ||
      !address.country
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
      data: guest_id,
    });
  } catch (error) {
    console.error("error:", error.stack);
    res.status(500).json({
      code: 500,
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

export const readAllGuest = async function (req, res) {
  try {
    const guests = await Guest.findAll({
        include:[
          {
            model: Address,
            as: "Address"
          }, 
      ],
      attributes: [
        "guest_id",
        "first_name",
        "last_name",
        "nationality",
        "email",
        "phone_number"
      ],
      }
    );
    res.status(200).json({
      code: 200,
      message: "Usuarios obtenidos correctamente",
      data: guests,
    });

  } catch (error) {
    console.error("error:", error.stack);
    res.status(404).json({
      code: 404,
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
}



// UPDATE
export const updateGuest = async (req, res) => {
  try {
    // Retrieves the user ID for update operations
    const { guest_id, first_name } = req.body

    console.log(guest_id, first_name)
    // Executes a database query to locate the corresponding ID
    const guest = await Guest.findByPk(guest_id,{
        include: [
      {
        model: Address,
        as: "Address"
      },
    ],
      attributes: [
      "guest_id",
      "first_name",
      "last_name",
      "nationality",
      "email",
      "phone_number"
    ],
    })
    //data shows
    console.log(guest, first_name)
    // Inserts the new records into the database table
    guest.first_name = first_name;
    //Save the new records into the database table
    await guest.save();

    res.status(200).json({
      code: 200,
      message: "Usuario actualizado correctamente",
      guest_id: guest_id,
      guest: guest,
    });
  } catch (error) {
    
  }


 };


/*
// DELETE

*/