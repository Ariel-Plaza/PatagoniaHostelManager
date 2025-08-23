import { Router } from "express";
import { createGuest, readAllGuest, updateGuest }  from "../controllers/guests.controllers.js";

const router = Router();

//ruta agregar nuevo huesped
router.post('/create', createGuest)
router.get('/', readAllGuest)
router.post('/update', updateGuest)

export default router;