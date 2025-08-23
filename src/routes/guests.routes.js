import { Router } from "express";
import { createGuest, deleteGuest, readAllGuest, updateGuest }  from "../controllers/guests.controllers.js";

const router = Router();

//ruta agregar nuevo huesped
router.post('/create', createGuest)
router.get('/', readAllGuest)
router.post('/update', updateGuest)
router.post('/delete', deleteGuest)

export default router;