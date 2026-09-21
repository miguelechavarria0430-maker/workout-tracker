# Workout Tracker API

Este proyecto corresponde al desarrollo de una API REST para el proyecto **Workout Tracker**, realizada con Node.js y Express.

La API permite manejar información relacionada con usuarios, entrenamientos, ejercicios y progreso.

## Tecnologías utilizadas

* Node.js
* Express
* MySQL2
* dotenv
* Nodemon
* Git y GitHub

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
├── .env
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## Versionamiento de la API

Las rutas principales de la API utilizan la versión `v1`.

La estructura utilizada es:

```text
/api/v1
```

Por ejemplo:

```text
/api/v1/users
/api/v1/workouts
/api/v1/exercises
/api/v1/progress
```

Esto permite organizar las diferentes versiones de la API si en el futuro se realizan cambios importantes.

---

# Usuarios

Estas rutas permiten consultar, crear, actualizar y eliminar usuarios.

| Método | Endpoint            | Función                         |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/v1/users`     | Consulta todos los usuarios     |
| GET    | `/api/v1/users/:id` | Consulta un usuario específico  |
| POST   | `/api/v1/users`     | Crea un usuario                 |
| PUT    | `/api/v1/users/:id` | Actualiza un usuario            |
| PATCH  | `/api/v1/users/:id` | Actualiza una parte del usuario |
| DELETE | `/api/v1/users/:id` | Elimina un usuario              |

### Ejemplo POST

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
  "id": 1789940234033,
  "name": "Usuario Prueba",
  "email": "prueba@example.com",
  "role": "user",
  "createdAt": "2026-09-20T21:37:14.033Z"
}
```

En este caso se utiliza el código `201`, porque se creó un nuevo recurso.

### Ejemplo PATCH

```text
PATCH /api/v1/users/ID
```

Request:

```json
{
  "name": "Usuario Actualizado"
}
```

El método PATCH se utiliza cuando se necesita modificar solamente algunos datos del usuario.

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

### Ejemplo POST

Request:

```json
{
  "userId": 1,
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
  "comments": "Entrenamiento programado"
}
```

Response:

```json
{
  "id": 1789939229327,
  "userId": 1,
  "name": "Entrenamiento de piernas",
  "date": "2026-09-21",
  "time": "17:00",
  "status": "pending"
}
```

### Filtros

Los entrenamientos también pueden consultarse utilizando parámetros en la URL.

```text
GET /api/v1/workouts?userId=1
GET /api/v1/workouts?status=pending
```

Estos datos se reciben mediante `req.query`.

---

# Ejercicios

Los ejercicios representan los diferentes ejercicios que pueden utilizarse dentro de los entrenamientos.

| Método | Endpoint                | Función                       |
| ------ | ----------------------- | ----------------------------- |
| GET    | `/api/v1/exercises`     | Consulta todos los ejercicios |
| GET    | `/api/v1/exercises/:id` | Consulta un ejercicio por ID  |
| POST   | `/api/v1/exercises`     | Crea un ejercicio             |
| PUT    | `/api/v1/exercises/:id` | Actualiza un ejercicio        |
| DELETE | `/api/v1/exercises/:id` | Elimina un ejercicio          |

### Ejemplo POST

Request:

```json
{
  "name": "Curl de bíceps",
  "description": "Ejercicio para trabajar los bíceps",
  "category": "strength",
  "muscleGroup": "arms"
}
```

Response:

```json
{
  "id": 1789939553943,
  "name": "Curl de bíceps",
  "description": "Ejercicio para trabajar los bíceps",
  "category": "strength",
  "muscleGroup": "arms"
}
```

### Filtros

Se pueden utilizar parámetros para buscar ejercicios:

```text
GET /api/v1/exercises?category=strength
GET /api/v1/exercises?muscleGroup=chest
GET /api/v1/exercises?search=press
```

---

# Progreso

Esta sección permite registrar información relacionada con el progreso de los entrenamientos.

| Método | Endpoint               | Función                            |
| ------ | ---------------------- | ---------------------------------- |
| GET    | `/api/v1/progress`     | Consulta los registros de progreso |
| GET    | `/api/v1/progress/:id` | Consulta un registro por ID        |
| POST   | `/api/v1/progress`     | Crea un registro de progreso       |
| PUT    | `/api/v1/progress/:id` | Actualiza un registro              |
| DELETE | `/api/v1/progress/:id` | Elimina un registro                |

### Ejemplo POST

Request:

```json
{
  "userId": 1,
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
  "id": 1789939928448,
  "userId": 1,
  "workoutId": 1,
  "date": "2026-09-20",
  "weight": 68,
  "duration": 70,
  "calories": 500,
  "notes": "Mejor rendimiento que el entrenamiento anterior."
}
```

También se puede filtrar el progreso por usuario:

```text
GET /api/v1/progress?userId=1
```

---

# Request y Response

Para recibir información enviada en formato JSON se utiliza:

```js
app.use(express.json());
```

Los datos enviados desde el cliente se pueden obtener mediante:

```js
req.body
```

Para los parámetros incluidos directamente en una ruta se utiliza:

```js
req.params
```

Por ejemplo:

```text
/api/v1/users/1
```

El valor `1` se puede obtener mediante:

```js
req.params.id
```

Para los parámetros enviados después del signo `?` se utiliza:

```js
req.query
```

Ejemplo:

```text
/api/v1/workouts?status=pending
```

El valor se obtiene mediante:

```js
req.query.status
```

Las respuestas de la API se envían principalmente en formato JSON utilizando:

```js
res.status(200).json(...)
```

---

# Códigos de respuesta utilizados

| Código | Significado           | Uso en el proyecto                               |
| ------ | --------------------- | ------------------------------------------------ |
| 200    | OK                    | Consulta o actualización realizada correctamente |
| 201    | Created               | Registro creado correctamente                    |
| 400    | Bad Request           | Los datos enviados no cumplen con la validación  |
| 404    | Not Found             | El recurso solicitado no existe                  |
| 500    | Internal Server Error | Error interno del servidor                       |

Por ejemplo, cuando se intenta consultar un usuario que no existe, la API responde con `404`.

Cuando se crea correctamente un usuario, entrenamiento, ejercicio o registro de progreso, se utiliza `201`.

---

# Headers

También se realizaron pruebas con headers HTTP.

Para consultar información de los headers recibidos se puede utilizar:

```js
req.headers
```

También se puede consultar un header específico mediante:

```js
req.get('Authorization')
```

En el proyecto se realizó una prueba utilizando el header personalizado:

```text
X-API-Key
```

Ejemplo:

```text
X-API-Key: 123456
```

Si no se envía la API Key, el servidor responde indicando que es necesaria.

También se utilizaron otros headers para realizar pruebas:

```text
X-Client-Version
X-Request-ID
```

Para establecer headers en la respuesta se utiliza:

```js
res.set(...)
```

---

# Manejo de errores

El proyecto cuenta con un middleware para manejar errores internos del servidor.

Cuando ocurre un error no controlado, se devuelve:

```json
{
  "error": "Error interno del servidor"
}
```

con código de estado:

```text
500
```

También se realizan validaciones en las rutas para evitar solicitudes con datos incompletos o recursos que no existen.

---

# Rutas principales

Las rutas principales de la aplicación son:

```text
GET /
GET /api
GET /api/v1/users
GET /api/v1/workouts
GET /api/v1/exercises
GET /api/v1/progress
```

La ruta `/api` muestra información general de la API y la versión disponible.

---

# Control de versiones

El proyecto fue trabajado utilizando Git y GitHub.

Se utilizó una rama `main` para la versión principal y una rama `develop` para integrar los cambios antes de pasarlos a `main`.

También se trabajó con ramas para las diferentes funcionalidades:

```text
feat/users
feat/workouts
feat/exercises
feat/progress
```

Los cambios de cada funcionalidad fueron enviados mediante Pull Request hacia `develop`.

Después de integrar las funcionalidades se realizó el Pull Request de:

```text
develop → main
```

De esta forma se mantuvo separado el desarrollo de la versión principal del proyecto.

---

# Ejecución del proyecto

Para instalar las dependencias:

```bash
npm install
```

Para ejecutar el proyecto normalmente:

```bash
npm start
```

Para ejecutarlo durante el desarrollo:

```bash
npm run dev
```

El servidor se ejecuta en:

```text
http://localhost:8000
```

---

# Conclusión

Con este proyecto se realizó la configuración inicial de una API REST utilizando Node.js y Express. Se organizaron las rutas por versión y se separaron las rutas de la lógica de los controladores.

También se realizaron pruebas con diferentes métodos HTTP, parámetros de ruta, query strings, datos enviados en el body, headers y códigos de respuesta.

El proyecto quedó organizado para continuar posteriormente con la conexión a la base de datos y las demás funcionalidades del sistema Workout Tracker.
