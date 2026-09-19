const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});