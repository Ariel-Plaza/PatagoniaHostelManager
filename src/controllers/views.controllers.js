import {Op} from 'sequelize';
import { Guest } from '../models/guest.model.js';

export const getGuests = async (req, res) => {
  try {
    let { guest_id, first_name, last_name, nationality, city_of_origin, email, phone_number, address_id } = req.query;
  } catch (error) {

  }
}