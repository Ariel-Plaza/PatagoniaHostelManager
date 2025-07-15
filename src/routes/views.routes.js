import { Router } from 'express';

const router = Router();

//Rutas publicas
//Rutas de verificacion

router.get('/', (req, res) => {
  res.send('¡Hola, esta es una respuesta básica!');
});
//Rutas publicas
router.get('/prueba', (req, res) => {
  res.send('¡Hola, esta es la pagina de prueba!');
});

router.get('/json', (req, res) => {
  res.json({ mensaje: 'Respuesta en formato JSON' });
});

//Ruta del proyecto
router.get('/guests', controller.guests);


export default router;