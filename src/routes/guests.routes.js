import { Router } from "express";
import { createGuest, readAllGuest }  from "../controllers/guests.controllers.js";

const router = Router();

//ruta agregar nuevo huesped
router.post('/', readAllGuest)
router.post('/create', createGuest)

export default router;