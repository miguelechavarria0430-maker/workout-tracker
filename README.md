# Workout Tracker API

API RESTful desarrollada con Node.js y Express para gestionar usuarios, entrenamientos, ejercicios y progreso.

## Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/v1/users` | Listar todos los usuarios |
| GET | `/api/v1/users/:id` | Obtener un usuario por ID |
| POST | `/api/v1/users` | Crear un usuario |
| PUT | `/api/v1/users/:id` | Actualizar un usuario |
| PATCH | `/api/v1/users/:id` | Actualizar parcialmente un usuario |
| DELETE | `/api/v1/users/:id` | Eliminar un usuario |
## Entrenamientos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/v1/workouts` | Listar todos los entrenamientos |
| GET | `/api/v1/workouts/:id` | Obtener un entrenamiento por ID |
| POST | `/api/v1/workouts` | Crear un entrenamiento |
| PUT | `/api/v1/workouts/:id` | Actualizar un entrenamiento |
| DELETE | `/api/v1/workouts/:id` | Eliminar un entrenamiento |

### Filtros

Los entrenamientos pueden filtrarse mediante query strings:

```text
GET /api/v1/workouts?userId=ID
GET /api/v1/workouts?status=pending
## Ejemplo de creación

```json
{
  "name": "Usuario Prueba",
  "email": "prueba@example.com",
  "role": "user"
}