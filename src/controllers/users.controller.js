// Estado en memoria (simulación)
let users = [
  {
    id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: "Carlos Navia",
    email: "carlos@example.com",
    role: "user",
    createdAt: "2025-09-12T12:00:00Z"
  }
];

// GET /users
const getUsers = (req, res) => {
  const { role, search } = req.query;
  let result = users;

  if (role) {
    result = result.filter(u => u.role === role);
  }

  if (search) {
    result = result.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json(result);
};

// GET /users/:id
const getUserById = (req, res) => {
  const { id } = req.params;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "Usuario no encontrado"
    });
  }

  res.status(200).json(user);
};

// POST /users
const createUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name y email son requeridos"
    });
  }

  const newUser = {
    id: `${Date.now()}`,
    name,
    email,
    role: role || "user",
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json(newUser);
};

// PUT /users/:id
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Usuario no encontrado"
    });
  }

  if (!name || !email) {
    return res.status(400).json({
      error: "Name y email son requeridos"
    });
  }

  users[index] = {
    ...users[index],
    name,
    email,
    role
  };

  res.status(200).json(users[index]);
};

// DELETE /users/:id
const deleteUser = (req, res) => {
  const { id } = req.params;

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Usuario no encontrado"
    });
  }

  const deletedUser = users.splice(index, 1);

  res.status(200).json({
    deleted: deletedUser[0].id
  });
};
// PATCH /users/:id
const updateUserPartial = (req, res) => {
  const { id } = req.params;

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Usuario no encontrado"
    });
  }

  users[index] = {
    ...users[index],
    ...req.body
  };

  res.status(200).json(users[index]);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserPartial,
  deleteUser
};