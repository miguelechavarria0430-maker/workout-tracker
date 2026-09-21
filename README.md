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

## Ejemplo de creación

```json
{
  "name": "Usuario Prueba",
  "email": "prueba@example.com",
  "role": "user"
}
## Ejercicios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/v1/exercises` | Listar todos los ejercicios |
| GET | `/api/v1/exercises/:id` | Obtener un ejercicio por ID |
| POST | `/api/v1/exercises` | Crear un ejercicio |
| PUT | `/api/v1/exercises/:id` | Actualizar un ejercicio |
| DELETE | `/api/v1/exercises/:id` | Eliminar un ejercicio |

### Filtros

Los ejercicios pueden filtrarse mediante query strings:

```text
GET /api/v1/exercises?category=strength
GET /api/v1/exercises?muscleGroup=chest
GET /api/v1/exercises?search=press