import { Router } from "express";

import { createGuest }  from "../controllers/guests.controllers.js";

const router = Router();

//ruta agregar nuevo huesped
router.post('/', createGuest)

export default router;