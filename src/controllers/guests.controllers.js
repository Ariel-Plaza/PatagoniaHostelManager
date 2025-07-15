import { Op } from "sequelize";
import Guest  from "../models/guest.model.js";

export const createGuest = async (req, res) => {
  try {
    // recuperar informacion desde la pagina desde req.body
    let { guest_id, first_name, last_name, nationality, city_of_origin, email, phone_number, street, city, region, country, postal_code
    } = req.body

    //Validacion basica para que los campos sean obligatorios
    if (
      !first_name ||
      !last_name ||
      !email ||
      !street ||
      !city ||
      !region ||
      !country ||
      !postal_code
    ) {
      return res.status(400).json({
        code: 400,
        message: "Faltan campos obligatorios",
      });
    }

    //Creacion  de usuario y envio de datos recibidos
    let newGuest = await Guest.create(
      {
        guest_id,
        first_name,
        last_name,
        nationality,
        city_of_origin,
        email,
        phone_number,
        address: {
          street,
          city,
          region,
          country,
          postal_code,
        },
      },
      {
        include: {
          model: Address,
        },
      }
    );
    //respuesta de exito en la creacion 
    res.status(201).json({
      code: 201,
      message: "Usuario creado con exito",
      //puedo devoler informacion
      data: newGuest,
    })
    
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error al crear usuario",
      error: error.message,
    });
  }

}