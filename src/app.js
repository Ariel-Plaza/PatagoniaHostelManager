import express from "express";
import cors from "cors";
import morgan from "morgan";
import { create } from "express-handlebars";
import fileUpload from "express-fileupload";

//Importacion de rutas
//Vistas
import viewsRoutes from "./routes/views.routes.js";

//Endpoints
import guestRoutes from "./routes/guests.routes.js";
// import entregasRoutes from "./routes/entregas.routes.js";

//Provides utilities for working with file and directory paths
import * as path from "path";
//Converts a file URL to a local file path
import { fileURLToPath } from "url";

// Obtiene el directorio actual del archivos
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.use(morgan("tiny"));

//ruta publica para acceso a archivos estaticos
app.use("/public", express.static(path.resolve(__dirname, "./public")));

//--- Handlebars ---
// Creacon de una instancia personalizada de handlebars
const hbs = create({
  //Define la carpeta donde estaran los partials(fragmentos reutilizables de vistas)
  partialsDir: [path.resolve(__dirname, "./views/partials/")]
});

//Regista handlebars como motoe de vistas con extension hbs
app.engine("handlebars", hbs.engine);
// Indica que el motor de vistas por defecto será Handlebars (.hbs)
app.set("view engine", "handlebars");
// Define la carpeta donde estarán las vistas principales
app.set("views", path.resolve(__dirname, "./views"));
// --- Fin Handlebars ---


//Views routes
app.use("/", viewsRoutes);

//Enpoints
app.use("/api/guests", guestRoutes);
// app.use("/api/entregas", entregasRoutes);

// Handle 404 errors for undefined routes
// app.all("*", (req, res) => {
//   res.render("error404", {
//     layout: "error",
//   });
// });

export default app;