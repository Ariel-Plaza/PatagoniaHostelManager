dotenv.config();
import sequealize from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file


// Initialize Sequelize with environment variables
//BD conection configuration
const sequelize = new sequealize.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // Disable logging for cleaner output
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;