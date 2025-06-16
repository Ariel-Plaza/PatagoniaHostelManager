# PatagoniaHostelManager
PatagoniaHostelManager is a fullstack JS app for managing hostel bookings, guests, rooms, and services. Built with Node.js, Express, PostgreSQL, and Bootstrap, it supports filtering, real-time availability, reports, and JWT-based security. Ideal for small hostels in high-tourism zones.


# Pasos para la creación del proyecto PatagoniaHostelManager

## 1. Inicializa el proyecto

```bash
npm init -y
```

## 2. Instala las dependencias

```bash
npm install express sequelize pg pg-hstore dotenv cors morgan express-fileupload express-handlebars
npm install --save-dev nodemon
```

## 3. Crea la estructura de carpetas

```
/PatagoniaHostelManager
  /src
    /config
      db.config.js
    /models
      init-models.js
      (tus modelos aquí)
    /routes
      (tus rutas aquí)
    /views
      /partials
      (tus vistas aquí)
    app.js
  .env
  server.js
  package.json
```

## 4. Configura la base de datos

Crea el archivo `.env` con tus variables:

```
DB_NAME=nombre_de_tu_bd
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=localhost
PORT=3000
```

Configura Sequelize en `src/config/db.config.js`.

## 5. Crea los modelos

Define tus modelos en `src/models/`.

Usa `init-models.js` para inicializarlos y asociarlos.

## 6. Crea las rutas

Define tus rutas en `src/routes/`.

## 7. Configura Express y middlewares

En `src/app.js`, configura middlewares como `cors`, `morgan`, `express.json`, `express.urlencoded`, `fileupload`, y el motor de vistas Handlebars.

## 8. Configura el servidor

En `server.js`, importa `app`, conecta la base de datos y levanta el servidor.

## 9. Agrega scripts en package.json

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## 10. Ejecuta el proyecto

```bash
npm run dev
