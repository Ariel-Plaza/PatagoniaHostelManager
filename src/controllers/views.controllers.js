import {Op} from 'sequelize';
import  Guest from '../models/Guest.models.js';
import Address from '../models/Address.models.js';
import { raw } from 'express';

export const viewGuestsController = async (req, res) => {
  try {
    //traigo la data desde la bd
    let guests = await Guest.findAll(
      {
        raw: true,
        attributes: ["guest_id", "first_name", "last_name", "nationality", "email", "phone_number"],
        include: [
          {
            model: Address,
            as: "Address",
            attributes: { exclude: ["address_id"], },
            raw: true,
          },
        ]
      },
    );
    //la proceso para enviar con formato Handlebars
    guests = guests.map((guest) => {
      guest.address = {
        id: guest["address.id"],
        street: guest["address.street"],
        city: ["address.city"],
        country: ["address.country"]
      };
      return guest;
    });
    console.log(guests)
    //mostrar la vista
    res.render("guests", {
      guestsView: true,
      guests,
    });
  } catch (error) {
    console.log(error);
    res.render("guests", {
      guestaView: true,
      error: true,
    });
  
  }
};

// export const getGuests = async (req, res) => {
//   try {
//     let { guest_id, first_name, last_name, nationality, email, phone_number, address_id } = req.query;
//   } catch (error) {

//   }
// }