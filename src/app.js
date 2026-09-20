const express = require("express");
const app = express();

const { port } = require('./config/env');

const routes = require('./routes');

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Lectura de cabeceras HTTP
app.get('/api/headers', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const contentType = req.headers['content-type'];

  const authorization = req.get('Authorization');
  const acceptLanguage = req.get('Accept-Language');
  const host = req.get('Host');

  res.json({
    userAgent,
    contentType,
    authorization: authorization || 'No autorización',
    language: acceptLanguage || 'No especificado',
    host
  });
});

// Cabecera personalizada
app.get('/api/data', (req, res) => {
  const apiKey = req.get('X-API-Key');
  const clientVersion = req.get('X-Client-Version');
  const requestId = req.get('X-Request-ID');

  if (!apiKey) {
    return res.status(401).json({
      error: 'API Key requerida en cabecera X-API-Key'
    });
  }

  res.set({
    'X-API-Version': '1.0',
    'X-Response-Time': '150ms'
  });

  res.json({
    message: 'Datos procesados correctamente',
    clientVersion: clientVersion || 'Desconocida',
    requestId: requestId || 'No especificado'
  });
});

// Inspección completa de cabeceras
app.get('/api/debug/headers', (req, res) => {
  const allHeaders = req.headers;

  res.json({
    totalHeaders: Object.keys(allHeaders).length,
    commonHeaders: {
      host: req.get('Host'),
      userAgent: req.get('User-Agent'),
      accept: req.get('Accept'),
      connection: req.get('Connection')
    },
    headers: allHeaders
  });
});

// Configurar rutas con prefijo /api
app.use('/api', routes);

// Manejo general de errores
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: 'Error interno del servidor'
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});