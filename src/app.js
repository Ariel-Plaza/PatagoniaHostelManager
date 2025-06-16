import express from "express";
import cors from "cors";
import morgan from "morgan";
import { create } from "express-handlebars";
import fileUpload from "express-fileupload";

//Importacion de rutas
//Vistas
// import viewsRoutes from "./routes/views.routes.js";
//Endpoints
// import usuariosRoutes from "./routes/usuarios.routes.js";
// import entregasRoutes from "./routes/entregas.routes.js";
//Provides utilities for working with file and directory paths
import * as path from "path";
//Converts a file URL to a local file path
import { fileURLToPath } from "url";
// Get the directory name of the current module file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.use(morgan("tiny"));

//ruta publica
app.use("/public", express.static(path.resolve(__dirname, "./public")));
// Set the directory for Handlebars
const hbs = create({
  partialsDir: [path.resolve(__dirname, "./views/partials/")],
});

// Configure Handlebars as the view engine and set the views directory
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//Views routes
// app.use("/", viewsRoutes);

//Enpoints
// app.use("/api/usuarios", usuariosRoutes);
// app.use("/api/entregas", entregasRoutes);

// Handle 404 errors for undefined routes
// app.all("*", (req, res) => {
//   res.render("error404", {
//     layout: "error",
//   });
// });

export default app;