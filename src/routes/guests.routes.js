import { Router } from "express";
import { createGuest, findById, deleteGuest, readAllGuest, updateGuest }  from "../controllers/guests.controllers.js";

const router = Router();

//ruta agregar nuevo huesped
router.post('/create', createGuest)
router.get('/', readAllGuest)
router.post('/update', updateGuest)
router.post('/delete', deleteGuest)
router.get('/:id', findById)

export default router;