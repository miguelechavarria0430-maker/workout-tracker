// Estado en memoria (simulación)
let progress = [
  {
    id: "1",
    userId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    workoutId: "1",
    date: "2026-09-20",
    weight: 68,
    duration: 60,
    calories: 450,
    notes: "Buen rendimiento durante el entrenamiento."
  }
];

// GET /progress
const getProgress = (req, res) => {
  const { userId } = req.query;

  let result = progress;

  if (userId) {
    result = result.filter(item => item.userId === userId);
  }

  res.status(200).json(result);
};

// GET /progress/:id
const getProgressById = (req, res) => {
  const { id } = req.params;

  const item = progress.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({
      error: "Registro de progreso no encontrado"
    });
  }

  res.status(200).json(item);
};

// POST /progress
const createProgress = (req, res) => {
  const {
    userId,
    workoutId,
    date,
    weight,
    duration,
    calories,
    notes
  } = req.body;

  if (!userId || !workoutId || !date) {
    return res.status(400).json({
      error: "userId, workoutId y date son requeridos"
    });
  }

  const newProgress = {
    id: `${Date.now()}`,
    userId,
    workoutId,
    date,
    weight: weight || 0,
    duration: duration || 0,
    calories: calories || 0,
    notes: notes || ""
  };

  progress.push(newProgress);

  res.status(201).json(newProgress);
};

// PUT /progress/:id
const updateProgress = (req, res) => {
  const { id } = req.params;

  const index = progress.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Registro de progreso no encontrado"
    });
  }

  const {
    userId,
    workoutId,
    date,
    weight,
    duration,
    calories,
    notes
  } = req.body;

  if (!userId || !workoutId || !date) {
    return res.status(400).json({
      error: "userId, workoutId y date son requeridos"
    });
  }

  progress[index] = {
    ...progress[index],
    userId,
    workoutId,
    date,
    weight: weight || 0,
    duration: duration || 0,
    calories: calories || 0,
    notes: notes || ""
  };

  res.status(200).json(progress[index]);
};

// DELETE /progress/:id
const deleteProgress = (req, res) => {
  const { id } = req.params;

  const index = progress.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Registro de progreso no encontrado"
    });
  }

  const deletedProgress = progress.splice(index, 1);

  res.status(200).json({
    deleted: deletedProgress[0].id
  });
};

module.exports = {
  getProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress
};