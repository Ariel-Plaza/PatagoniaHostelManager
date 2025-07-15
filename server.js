import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import express from "express";
import sequealize from "./src/config/db.config.js";
import initModels from "./src/models/init-models.js";
import chalk from "chalk";

const PORT = process.env.PORT;
const main = async () => {
  //Initialize express app
  try {    
    await sequealize.authenticate();
    await sequealize.sync();
    console.log(chalk.bgGreen('Conexión a la base de datos exitosa'));
    // Start the server
    initModels(sequealize);
    console.log(chalk.bgGreen("Base de datos - Sincronizada"));
    app.listen(PORT, () => {
      console.log(
        "servidor escuchando en puerto: http://localhost:" + PORT
      );
    });
  } catch (error) {
    console.error(chalk.bgRed('Error al conectar a la base de datos:', error));
  }
};

main();