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


### Modelos SQL
```sql
CREATE TABLE Address(
  address_id SERIAL PRIMARY KEY,
  street VARCHAR(150),
  city VARCHAR(50),
  region VARCHAR(50),
  country VARCHAR(50),
  postal_code VARCHAR(25)
)

CREATE TABLE Guest(
  guest_id SERIAL PRIMARY KEY, 
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  city_of_origin VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  addres_id INTEGER REFERENCES Address(address_id),
  CONSTRAINT check_email_format
  CHECK(email LIKE'%_@_%.__%')
)

CREATE TABLE Room(
  room_id SERIAL PRIMARY KEY,
  room_number VARCHAR(4) UNIQUE NOT NULL,
  room_type  VARCHAR(15),
  capacity INTEGER,
  price_per_night DECIMAL(10,2),
  r_status VARCHAR(15),
  CONSTRAINT check_capacity_positive
  CHECK (capacity >0),
  CONSTRAINT check_price_positive 
  CHECK (price_per_night >= 0),
  CONSTRAINT check_valid_status 
  CHECK (r_status IN ('available', 'occupied', 'maintenance', 'reserved'))
);

CREATE TABLE Service(
  service_id SERIAL PRIMARY KEY,
  s_name VARCHAR(50),
  description VARCHAR(200),
  price DECIMAL(10,2),
  available BOOLEAN DEFAULT TRUE,
  CONSTRAINT check_service_price_positive 
  CHECK (price >= 0)
);

CREATE TABLE ReservationHeader(
  reservation_id SERIAL PRIMARY KEY,
  guest_id INTEGER NOT NULL REFERENCES Guest(guest_id),
  room_id INTEGER NOT NULL REFERENCES Room(room_id),
  check_in DATE,
  check_out DATE,
  r_status VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_dates_logical
  CHECK (check_out > check_in),
  CONSTRAINT check_future_checkin
  CHECK(check_in >= CURRENT_DATE),
  CONSTRAINT check_max_stay
  CHECK (check_out - check_in <= 365)

);

CREATE TABLE ReservationDetail(
  detail_id SERIAL PRIMARY KEY,
  reservation_id INTEGER NOT NULL REFERENCES ReservationHeader(reservation_id),
  service_id INTEGER NOT NULL REFERENCES Service(service_id),
  quantity INTEGER,
  unit_price DECIMAL(10,2),
  CONSTRAINT check_quantity_positive 
  CHECK (quantity > 0),
  CONSTRAINT check_unit_price_positive 
  CHECK (unit_price >= 0)
);

```

## Conexion a BD



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
```