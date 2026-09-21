# Workout Tracker API

API REST desarrollada con Node.js y Express para el caso de estudio **Workout Tracker**.

El proyecto permite gestionar usuarios, entrenamientos, ejercicios y registros de progreso mediante diferentes métodos HTTP. También se implementó el manejo de parámetros, filtros, datos enviados en las solicitudes, cabeceras HTTP, códigos de estado y control de versiones con Git y GitHub.

---

## Tecnologías utilizadas

* Node.js
* Express
* MySQL2
* dotenv
* Nodemon
* Git
* GitHub

---

## Instalación

Clonar el repositorio y acceder a la carpeta del proyecto:

```bash
git clone https://github.com/miguelechavarria0430-maker/workout-tracker.git
cd workout-tracker
```

Instalar las dependencias:

```bash
npm install
```

---

## Ejecución del proyecto

Para iniciar el servidor:

```bash
npm start
```

Para iniciar el servidor en modo desarrollo utilizando Nodemon:

```bash
npm run dev
```

El servidor se ejecuta en:

```text
http://localhost:8000
```

---

## Variables de entorno

El proyecto utiliza variables de entorno mediante `dotenv`.

Archivo `.env.example`:

```env
DB_HOST=localhost
DB_USER=''
DB_PASSWORD=''
DB_NAME=''
DB_PORT=''
PORT=8000
```

El archivo `.env` se mantiene local y está incluido en `.gitignore`.

---

## Estructura del proyecto

```text
workout-tracker/
├── src/
│   ├── app.js
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   │   ├── users.controller.js
│   │   ├── workouts.controller.js
│   │   ├── exercises.controller.js
│   │   └── progress.controller.js
│   └── routes/
│       ├── index.js
│       └── v1/
│           ├── index.js
│           ├── users.routes.js
│           ├── workouts.routes.js
│           ├── exercises.routes.js
│           └── progress.routes.js
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

La aplicación está organizada separando las rutas, los controladores y la configuración.

* `app.js`: configura Express, middleware, rutas y servidor.
* `config/env.js`: carga las variables de entorno.
* `routes/`: define los endpoints de la API.
* `controllers/`: contiene la lógica de las operaciones.
* `routes/v1/`: contiene las rutas correspondientes a la versión 1 de la API.

---

# Versionamiento de la API

La API utiliza versionamiento mediante la ruta:

```text
/api/v1
```

Esto permite organizar las rutas por versiones y facilitar futuras modificaciones de la API.

La estructura de las rutas se organiza de la siguiente manera:

```text
/api
   /v1
      /users
      /workouts
      /exercises
      /progress
```

Por ejemplo:

```text
GET /api/v1/users
```

---

# Rutas principales

## Usuarios

Estas rutas permiten consultar, crear, actualizar y eliminar usuarios.

| Método | Endpoint            | Función                           |
| ------ | ------------------- | --------------------------------- |
| GET    | `/api/v1/users`     | Consulta todos los usuarios       |
| GET    | `/api/v1/users/:id` | Consulta un usuario específico    |
| POST   | `/api/v1/users`     | Crea un usuario                   |
| PUT    | `/api/v1/users/:id` | Actualiza un usuario              |
| PATCH  | `/api/v1/users/:id` | Actualiza parcialmente un usuario |
| DELETE | `/api/v1/users/:id` | Elimina un usuario                |

### GET - Todos los usuarios

```text
GET /api/v1/users
```

Devuelve todos los usuarios registrados.

Respuesta:

```json
[
  {
    "id": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    "name": "Carlos Navia",
    "email": "carlos@example.com",
    "role": "user",
    "createdAt": "2025-09-12T12:00:00Z"
  }
]
```

Estado:

```text
200 OK
```

### GET - Usuario por ID

```text
GET /api/v1/users/b42f53fa-7b30-4b91-8d36-dc1c6ef27611
```

El ID se obtiene mediante `req.params`.

Si el usuario no existe:

```json
{
  "error": "Usuario no encontrado"
}
```

Estado:

```text
404 Not Found
```

### POST - Crear usuario

```text
POST /api/v1/users
```

Request:

```json
{
  "name": "Usuario Prueba",
  "email": "prueba@example.com",
  "role": "user"
}
```

Response:

```json
{
  "id": "1789940234033",
  "name": "Usuario Prueba",
  "email": "prueba@example.com",
  "role": "user",
  "createdAt": "2026-09-20T21:37:14.033Z"
}
```

Estado:

```text
201 Created
```

El código `201` se utiliza porque se creó un nuevo recurso.

Si no se envían los datos obligatorios `name` o `email`:

```json
{
  "error": "Name y email son requeridos"
}
```

Estado:

```text
400 Bad Request
```

### PUT - Actualizar usuario

```text
PUT /api/v1/users/1789940234033
```

PUT se utiliza para actualizar la información del usuario.

Ejemplo de Request:

```json
{
  "name": "Usuario Actualizado",
  "email": "actualizado@example.com",
  "role": "user"
}
```

Estado:

```text
200 OK
```

### PATCH - Actualizar parcialmente

```text
PATCH /api/v1/users/1789940234033
```

PATCH permite modificar solamente algunos datos del usuario.

Request:

```json
{
  "name": "Usuario Actualizado"
}
```

Response:

```json
{
  "id": "1789940234033",
  "name": "Usuario Actualizado",
  "email": "prueba@example.com",
  "role": "user",
  "createdAt": "2026-09-20T21:37:14.033Z"
}
```

Estado:

```text
200 OK
```

### DELETE - Eliminar usuario

```text
DELETE /api/v1/users/1789940234033
```

Response:

```json
{
  "deleted": "1789940234033"
}
```

Estado:

```text
200 OK
```

Si el usuario no existe:

```json
{
  "error": "Usuario no encontrado"
}
```

Estado:

```text
404 Not Found
```

---

# Entrenamientos

Estas rutas permiten trabajar con los entrenamientos registrados.

| Método | Endpoint               | Función                           |
| ------ | ---------------------- | --------------------------------- |
| GET    | `/api/v1/workouts`     | Consulta todos los entrenamientos |
| GET    | `/api/v1/workouts/:id` | Consulta un entrenamiento por ID  |
| POST   | `/api/v1/workouts`     | Crea un entrenamiento             |
| PUT    | `/api/v1/workouts/:id` | Actualiza un entrenamiento        |
| DELETE | `/api/v1/workouts/:id` | Elimina un entrenamiento          |

### GET - Todos los entrenamientos

```text
GET /api/v1/workouts
```

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "userId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    "name": "Entrenamiento de pecho",
    "date": "2026-09-20",
    "time": "18:00",
    "status": "pending",
    "exercises": [
      {
        "name": "Press de banca",
        "sets": 4,
        "reps": 10,
        "weight": 50
      }
    ],
    "comments": "Entrenamiento programado."
  }
]
```

Estado:

```text
200 OK
```

### GET - Entrenamiento por ID

```text
GET /api/v1/workouts/1
```

El ID se recibe mediante `req.params`.

Si no existe:

```json
{
  "error": "Entrenamiento no encontrado"
}
```

Estado:

```text
404 Not Found
```

### POST - Crear entrenamiento

```text
POST /api/v1/workouts
```

Request:

```json
{
  "userId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
  "name": "Entrenamiento de piernas",
  "date": "2026-09-21",
  "time": "17:00",
  "status": "pending",
  "exercises": [
    {
      "name": "Sentadilla",
      "sets": 4,
      "reps": 12,
      "weight": 50
    }
  ],
  "comments": "Mejorar técnica de sentadilla."
}
```

Response:

```json
{
  "id": "1789939229327",
  "userId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
  "name": "Entrenamiento de piernas",
  "date": "2026-09-21",
  "time": "17:00",
  "status": "pending",
  "exercises": [
    {
      "name": "Sentadilla",
      "sets": 4,
      "reps": 12,
      "weight": 50
    }
  ],
  "comments": "Mejorar técnica de sentadilla."
}
```

Estado:

```text
201 Created
```

### Filtros de entrenamientos

Los filtros se realizan mediante query strings utilizando `req.query`.

Filtrar por estado:

```text
GET /api/v1/workouts?status=pending
```

Filtrar por usuario:

```text
GET /api/v1/workouts?userId=b42f53fa-7b30-4b91-8d36-dc1c6ef27611
```

### DELETE - Eliminar entrenamiento

```text
DELETE /api/v1/workouts/1
```

El entrenamiento se elimina utilizando su identificador.

Si el entrenamiento no existe, la API devuelve:

```text
404 Not Found
```

---

# Ejercicios

Estas rutas permiten consultar, crear, actualizar y eliminar ejercicios.

| Método | Endpoint                | Función                       |
| ------ | ----------------------- | ----------------------------- |
| GET    | `/api/v1/exercises`     | Consulta todos los ejercicios |
| GET    | `/api/v1/exercises/:id` | Consulta un ejercicio por ID  |
| POST   | `/api/v1/exercises`     | Crea un ejercicio             |
| PUT    | `/api/v1/exercises/:id` | Actualiza un ejercicio        |
| DELETE | `/api/v1/exercises/:id` | Elimina un ejercicio          |

### GET - Todos los ejercicios

```text
GET /api/v1/exercises
```

Ejemplo:

```json
[
  {
    "id": 1,
    "name": "Press de banca",
    "description": "Ejercicio para trabajar principalmente el pecho.",
    "category": "strength",
    "muscleGroup": "chest"
  },
  {
    "id": 2,
    "name": "Sentadilla",
    "description": "Ejercicio para trabajar principalmente las piernas.",
    "category": "strength",
    "muscleGroup": "legs"
  }
]
```

Estado:

```text
200 OK
```

### GET - Ejercicio por ID

```text
GET /api/v1/exercises/1
```

Estado:

```text
200 OK
```

### POST - Crear ejercicio

```text
POST /api/v1/exercises
```

Request:

```json
{
  "name": "Curl de bíceps",
  "description": "Ejercicio para trabajar los bíceps.",
  "category": "strength",
  "muscleGroup": "arms"
}
```

Response:

```json
{
  "id": "1789939553943",
  "name": "Curl de bíceps",
  "description": "Ejercicio para trabajar los bíceps.",
  "category": "strength",
  "muscleGroup": "arms"
}
```

Estado:

```text
201 Created
```

### Filtros de ejercicios

Filtrar por categoría:

```text
GET /api/v1/exercises?category=strength
```

Filtrar por grupo muscular:

```text
GET /api/v1/exercises?muscleGroup=chest
```

Realizar una búsqueda:

```text
GET /api/v1/exercises?search=press
```

Los valores de los filtros se obtienen mediante `req.query`.

### DELETE - Eliminar ejercicio

```text
DELETE /api/v1/exercises/1
```

Si el ejercicio existe, se elimina correctamente.

Si no existe:

```text
404 Not Found
```

---

# Progreso

Estas rutas permiten consultar, crear, actualizar y eliminar registros de progreso.

| Método | Endpoint               | Función                                  |
| ------ | ---------------------- | ---------------------------------------- |
| GET    | `/api/v1/progress`     | Consulta todos los registros de progreso |
| GET    | `/api/v1/progress/:id` | Consulta un registro por ID              |
| POST   | `/api/v1/progress`     | Crea un registro de progreso             |
| PUT    | `/api/v1/progress/:id` | Actualiza un registro                    |
| DELETE | `/api/v1/progress/:id` | Elimina un registro                      |

### GET - Todos los registros

```text
GET /api/v1/progress
```

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "userId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    "workoutId": 1,
    "date": "2026-09-20",
    "weight": 68,
    "duration": 60,
    "calories": 450,
    "notes": "Buen rendimiento durante el entrenamiento."
  }
]
```

Estado:

```text
200 OK
```

### GET - Progreso por ID

```text
GET /api/v1/progress/1
```

Estado:

```text
200 OK
```

### POST - Crear registro de progreso

```text
POST /api/v1/progress
```

Request:

```json
{
  "userId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
  "workoutId": 1,
  "date": "2026-09-20",
  "weight": 68,
  "duration": 70,
  "calories": 500,
  "notes": "Mejor rendimiento que el entrenamiento anterior."
}
```

Response:

```json
{
  "id": "1789939928448",
  "userId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
  "workoutId": 1,
  "date": "2026-09-20",
  "weight": 68,
  "duration": 70,
  "calories": 500,
  "notes": "Mejor rendimiento que el entrenamiento anterior."
}
```

Estado:

```text
201 Created
```

### Filtro de progreso

Filtrar por usuario:

```text
GET /api/v1/progress?userId=b42f53fa-7b30-4b91-8d36-dc1c6ef27611
```

El valor se obtiene mediante `req.query`.

---

# Request y Response

La API utiliza diferentes elementos de Express para recibir y responder solicitudes.

### `express.json()`

Permite que Express pueda interpretar información enviada en formato JSON dentro del cuerpo de las solicitudes.

### `req.body`

Contiene los datos enviados por el cliente.

Ejemplo:

```json
{
  "name": "Usuario Prueba",
  "email": "prueba@example.com"
}
```

### `req.params`

Permite obtener valores incluidos directamente en la URL.

Ejemplo:

```text
/api/v1/users/123
```

El valor `123` se obtiene mediante:

```js
req.params.id
```

### `req.query`

Permite obtener filtros enviados mediante query strings.

Ejemplo:

```text
/api/v1/workouts?status=pending
```

El valor se obtiene mediante:

```js
req.query.status
```

### `req.headers`

Permite consultar información enviada en las cabeceras HTTP.

### `res.status()`

Permite establecer el código de estado HTTP de la respuesta.

### `res.json()`

Permite devolver información en formato JSON.

### `res.send()`

Permite enviar una respuesta de texto.

---

# Cabeceras HTTP

La API incluye rutas para trabajar con cabeceras HTTP.

## Consulta de cabeceras

```text
GET /api/headers
```

Esta ruta consulta información como:

* `User-Agent`
* `Content-Type`
* `Authorization`
* `Accept-Language`
* `Host`

También se utiliza:

```js
req.get()
```

para obtener determinadas cabeceras.

---

## X-API-Key

Se implementó una cabecera personalizada:

```text
X-API-Key
```

La ruta utilizada es:

```text
GET /api/data
```

Si no se envía la cabecera:

```json
{
  "error": "API Key requerida en cabecera X-API-Key"
}
```

Estado:

```text
401 Unauthorized
```

Ejemplo de cabeceras:

```text
X-API-Key: 123456
X-Client-Version: 1.0
X-Request-ID: req-001
```

Cuando la solicitud es correcta, la API devuelve:

```json
{
  "message": "Datos procesados correctamente",
  "clientVersion": "1.0",
  "requestId": "req-001"
}
```

También se utilizan cabeceras de respuesta mediante `res.set()`.

---

# Códigos de estado HTTP

| Código | Uso                                           |
| ------ | --------------------------------------------- |
| 200    | La operación se realizó correctamente         |
| 201    | Se creó un nuevo recurso                      |
| 400    | Los datos enviados no son correctos           |
| 401    | Se requiere autorización o una API Key válida |
| 404    | No se encontró el recurso solicitado          |
| 500    | Se presentó un error interno del servidor     |

Los códigos de estado permiten comunicar al cliente el resultado de cada solicitud.

---

# Manejo de errores

La aplicación cuenta con un middleware para manejar errores internos del servidor.

Cuando se produce un error no controlado, la API devuelve:

```json
{
  "error": "Error interno del servidor"
}
```

Estado:

```text
500 Internal Server Error
```

---

# Métodos HTTP utilizados

## GET

Se utiliza para consultar información.

Ejemplo:

```text
GET /api/v1/users
```

## POST

Se utiliza para crear un nuevo recurso.

Ejemplo:

```text
POST /api/v1/users
```

## PUT

Se utiliza para actualizar la información de un recurso.

Ejemplo:

```text
PUT /api/v1/users/:id
```

## PATCH

Se utiliza para actualizar solamente una parte de un recurso.

Ejemplo:

```text
PATCH /api/v1/users/:id
```

## DELETE

Se utiliza para eliminar un recurso.

Ejemplo:

```text
DELETE /api/v1/users/:id
```

---

# Control de versiones con Git y GitHub

El proyecto utiliza Git para controlar los cambios realizados durante el desarrollo.

Las ramas principales utilizadas son:

```text
main
develop
```

También se utilizaron ramas para trabajar las diferentes funcionalidades:

```text
feat/users
feat/workouts
feat/exercises
feat/progress
```

Las funcionalidades fueron desarrolladas en ramas independientes y posteriormente integradas mediante Pull Requests.

La rama `develop` se utilizó como rama de integración antes de llevar los cambios a la rama principal.

---

# Commits

Durante el desarrollo se realizaron diferentes commits para registrar los cambios realizados en el proyecto.

Los commits permiten identificar las modificaciones realizadas y mantener un historial del desarrollo.

Entre los cambios registrados se encuentran:

* Configuración inicial del proyecto.
* Configuración del servidor Express.
* Configuración de variables de entorno.
* Creación de rutas.
* Implementación de operaciones CRUD.
* Manejo de parámetros y filtros.
* Implementación de cabeceras HTTP.
* Separación de rutas y controladores.
* Actualización de documentación.

---

# Pruebas principales

Se realizaron pruebas de las rutas principales de la API utilizando solicitudes HTTP.

## Users

```text
GET     /api/v1/users
GET     /api/v1/users/:id
POST    /api/v1/users
PUT     /api/v1/users/:id
PATCH   /api/v1/users/:id
DELETE  /api/v1/users/:id
```

## Workouts

```text
GET     /api/v1/workouts
GET     /api/v1/workouts/:id
POST    /api/v1/workouts
PUT     /api/v1/workouts/:id
DELETE  /api/v1/workouts/:id
```

## Exercises

```text
GET     /api/v1/exercises
GET     /api/v1/exercises/:id
POST    /api/v1/exercises
PUT     /api/v1/exercises/:id
DELETE  /api/v1/exercises/:id
```

## Progress

```text
GET     /api/v1/progress
GET     /api/v1/progress/:id
POST    /api/v1/progress
PUT     /api/v1/progress/:id
DELETE  /api/v1/progress/:id
```

También se realizaron pruebas de:

```text
GET /api/headers
GET /api/data
GET /api/debug/headers
```

Estas pruebas permitieron comprobar el funcionamiento de las rutas, parámetros, filtros, métodos HTTP, cabeceras y respuestas de la API.

---

# Estado actual del proyecto

El proyecto implementa las rutas REST principales utilizando Node.js y Express.

Actualmente los datos utilizados por los controladores se manejan en memoria para las pruebas de las operaciones de la API. Aunque `mysql2` se encuentra instalado como dependencia del proyecto, la conexión y persistencia de datos en MySQL no forman parte de la implementación actual de estas rutas.

---

# Conclusión

El proyecto Workout Tracker permite aplicar los conceptos fundamentales de una API REST utilizando Node.js y Express.

Se implementaron rutas para usuarios, entrenamientos, ejercicios y progreso, utilizando los métodos GET, POST, PUT, PATCH y DELETE.

También se trabajó con `req.body`, `req.params`, `req.query` y `req.headers`, además de códigos de estado HTTP y manejo de errores.

Finalmente, Git y GitHub permitieron llevar el control de versiones del proyecto mediante ramas, commits y Pull Requests.
