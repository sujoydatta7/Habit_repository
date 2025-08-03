import fs from "node:fs/promises";

import express from "express";
import { resolve } from "node:path";
// import { resolve } from "node:path";

async function loadHabits() {
  try {
    const dbFileData = await fs.readFile("./db.json");
    const parsedData = JSON.parse(dbFileData);
    return parsedData.habits;
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

async function saveOpinion(opinion) {
  const opinions = await loadHabits();
  const newOpinion = { id: new Date().getTime(), votes: 0, ...opinion };
  opinions.unshift(newOpinion);
  const dataToSave = { opinions };
  await fs.writeFile("./db.json", JSON.stringify(dataToSave, null, 2));
  return newOpinion;
}

async function upvoteOpinion(id) {
  const opinions = await loadHabits();
  const opinion = opinions.find((o) => o.id === id);
  if (!opinion) {
    return null;
  }
  opinion.votes++;
  await fs.writeFile("./db.json", JSON.stringify({ opinions }, null, 2));
  return opinion;
}

async function downvoteOpinion(id) {
  const opinions = await loadHabits();
  const opinion = opinions.find((o) => o.id === id);
  if (!opinion) {
    return null;
  }
  opinion.votes--;
  await fs.writeFile("./db.json", JSON.stringify({ opinions }, null, 2));
  return opinion;
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
  const { name } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await updateStreak(req.body);
    const updatedHabitList = await loadHabits();
    res.status(201).json(updatedHabitList);
  } catch (err) {}
});

app.post("/opinions/:id/upvote", async (req, res) => {
  const { id } = req.params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const opinion = await upvoteOpinion(Number(id));
    if (!opinion) {
      return res.status(404).json({ error: "Opinion not found." });
    }
    res.json(opinion);
  } catch (error) {
    res.status(500).json({ error: "Error upvoting opinion." });
  }
});

app.post("/opinions/:id/downvote", async (req, res) => {
  const { id } = req.params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const opinion = await downvoteOpinion(Number(id));
    if (!opinion) {
      return res.status(404).json({ error: "Opinion not found." });
    }
    res.json(opinion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error downvoting opinion." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
