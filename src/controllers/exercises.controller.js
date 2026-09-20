// Estado en memoria (simulación)
let exercises = [
  {
    id: "1",
    name: "Press de banca",
    description: "Ejercicio para trabajar principalmente el pecho.",
    category: "strength",
    muscleGroup: "chest"
  },
  {
    id: "2",
    name: "Sentadilla",
    description: "Ejercicio para trabajar principalmente las piernas.",
    category: "strength",
    muscleGroup: "legs"
  },
  {
    id: "3",
    name: "Correr",
    description: "Ejercicio cardiovascular para mejorar la resistencia.",
    category: "cardio",
    muscleGroup: "legs"
  }
];

// GET /exercises
const getExercises = (req, res) => {
  const { category, muscleGroup, search } = req.query;

  let result = exercises;

  if (category) {
    result = result.filter(exercise => exercise.category === category);
  }

  if (muscleGroup) {
    result = result.filter(
      exercise => exercise.muscleGroup === muscleGroup
    );
  }

  if (search) {
    result = result.filter(exercise =>
      exercise.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json(result);
};

// GET /exercises/:id
const getExerciseById = (req, res) => {
  const { id } = req.params;

  const exercise = exercises.find(exercise => exercise.id === id);

  if (!exercise) {
    return res.status(404).json({
      error: "Ejercicio no encontrado"
    });
  }

  res.status(200).json(exercise);
};

// POST /exercises
const createExercise = (req, res) => {
  const {
    name,
    description,
    category,
    muscleGroup
  } = req.body;

  if (!name || !description || !category || !muscleGroup) {
    return res.status(400).json({
      error: "name, description, category y muscleGroup son requeridos"
    });
  }

  const newExercise = {
    id: `${Date.now()}`,
    name,
    description,
    category,
    muscleGroup
  };

  exercises.push(newExercise);

  res.status(201).json(newExercise);
};

// PUT /exercises/:id
const updateExercise = (req, res) => {
  const { id } = req.params;

  const index = exercises.findIndex(exercise => exercise.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Ejercicio no encontrado"
    });
  }

  const {
    name,
    description,
    category,
    muscleGroup
  } = req.body;

  if (!name || !description || !category || !muscleGroup) {
    return res.status(400).json({
      error: "name, description, category y muscleGroup son requeridos"
    });
  }

  exercises[index] = {
    ...exercises[index],
    name,
    description,
    category,
    muscleGroup
  };

  res.status(200).json(exercises[index]);
};

// DELETE /exercises/:id
const deleteExercise = (req, res) => {
  const { id } = req.params;

  const index = exercises.findIndex(exercise => exercise.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Ejercicio no encontrado"
    });
  }

  const deletedExercise = exercises.splice(index, 1);

  res.status(200).json({
    deleted: deletedExercise[0].id
  });
};

module.exports = {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};