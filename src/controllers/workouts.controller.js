// Estado en memoria (simulación)
let workouts = [
  {
    id: "1",
    userId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: "Entrenamiento de pecho",
    date: "2026-09-20",
    time: "18:00",
    status: "pending",
    exercises: [
      {
        exercise: "Press de banca",
        sets: 4,
        reps: 10,
        weight: 40
      }
    ],
    comments: "Entrenamiento principal de pecho"
  }
];

// GET /workouts
const getWorkouts = (req, res) => {
  const { userId, status } = req.query;

  let result = workouts;

  if (userId) {
    result = result.filter(workout => workout.userId === userId);
  }

  if (status) {
    result = result.filter(workout => workout.status === status);
  }

  res.status(200).json(result);
};

// GET /workouts/:id
const getWorkoutById = (req, res) => {
  const { id } = req.params;

  const workout = workouts.find(workout => workout.id === id);

  if (!workout) {
    return res.status(404).json({
      error: "Entrenamiento no encontrado"
    });
  }

  res.status(200).json(workout);
};

// POST /workouts
const createWorkout = (req, res) => {
  const {
    userId,
    name,
    date,
    time,
    exercises,
    comments
  } = req.body;

  if (!userId || !name || !date || !time || !exercises) {
    return res.status(400).json({
      error: "userId, name, date, time y exercises son requeridos"
    });
  }

  const newWorkout = {
    id: `${Date.now()}`,
    userId,
    name,
    date,
    time,
    status: "pending",
    exercises,
    comments: comments || ""
  };

  workouts.push(newWorkout);

  res.status(201).json(newWorkout);
};

// PUT /workouts/:id
const updateWorkout = (req, res) => {
  const { id } = req.params;

  const index = workouts.findIndex(workout => workout.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Entrenamiento no encontrado"
    });
  }

  const {
    userId,
    name,
    date,
    time,
    status,
    exercises,
    comments
  } = req.body;

  if (!userId || !name || !date || !time || !exercises) {
    return res.status(400).json({
      error: "userId, name, date, time y exercises son requeridos"
    });
  }

  workouts[index] = {
    ...workouts[index],
    userId,
    name,
    date,
    time,
    status: status || workouts[index].status,
    exercises,
    comments: comments || ""
  };

  res.status(200).json(workouts[index]);
};

// DELETE /workouts/:id
const deleteWorkout = (req, res) => {
  const { id } = req.params;

  const index = workouts.findIndex(workout => workout.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Entrenamiento no encontrado"
    });
  }

  const deletedWorkout = workouts.splice(index, 1);

  res.status(200).json({
    deleted: deletedWorkout[0].id
  });
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
};