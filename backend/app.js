import fs from "node:fs/promises";

import express from "express";

async function loadHabits() {
  try {
    const dbFileData = await fs.readFile("./db.json");
    const parsedData = JSON.parse(dbFileData);
    return parsedData.habits;
  } catch (error) {
    return [];
  }
}

async function loadUsers() {
  try {
    const dbFileData = await fs.readFile("./userDB.json");
    const parsedData = JSON.parse(dbFileData);
    return parsedData.users;
  } catch (error) {
    return [];
  }
}

async function addNewHabit(habit) {
  const habits = await loadHabits();
  habits.unshift(habit);
  await fs.writeFile("./db.json", JSON.stringify({ habits }));
  return habit;
}

async function deleteHabit(habitToBeDeleted) {
  console.log(habitToBeDeleted);
  const habits = await loadHabits();
  const updatedHabitList = habits.filter(
    (habit) => habit.name !== habitToBeDeleted.name
  );
  await fs.writeFile(
    "./db.json",
    JSON.stringify({ habits: updatedHabitList }, null, 2)
  );
}

async function updateStreak(habitObject) {
  const { name } = habitObject;
  const habits = await loadHabits();
  const updatedHabitList = [...habits];
  for (const habit of updatedHabitList) {
    if (habit.name === name) {
      habit.streak++;
      break;
    }
  }

  await fs.writeFile(
    "./db.json",
    JSON.stringify({ habits: updatedHabitList }, null, 2)
  );
}

async function login(user) {
  const users = await loadUsers();
  users.unshift(user);
  await fs.writeFile("./userDB.json", JSON.stringify({ users }, null, 2));
  return true;
}

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.post("/addNewHabit", async (req, res) => {
  const { name, streak } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!name) {
    return res.status(400).json({ error: "name and number is required" });
  }

  try {
    const newHabit = await addNewHabit({ name, streak });
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: "Error saving new habit." });
  }
});

app.get("/habits", async (req, res) => {
  try {
    const habits = await loadHabits();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: "Error loading habits." });
  }
});

app.post("/deleteHabit", async (req, res) => {
  const { name, streak } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await deleteHabit({ name });
    const habits = await loadHabits();
    res.status(201).json(habits);
  } catch (error) {
    res.status(500).json({ error: "Error saving opinion." });
  }
});

app.post("/updateStreak", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await updateStreak(req.body);
    const updatedHabitList = await loadHabits();
    res.status(201).json(updatedHabitList);
  } catch (err) {}
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await login({ username, password });
  res.status(201).json(response);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
