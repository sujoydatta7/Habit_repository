import { createContext, useEffect, useState } from "react";

export const HabitsContext = createContext({
  habits: [],
  addHabit: () => {},
  deleteHabit: () => {},
  updateHabit: () => {},
});

export function HabitsContextProvider({ children }) {
  const [habits, setHabits] = useState([]);
  async function deleteHabit(habitObject) {
    const { name, streak } = habitObject;
    try {
      const res = await fetch("http://localhost:3000/deleteHabit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, streak: Number(streak) }),
      });
      if (res.ok) {
        const updatedHabitList = await res.json();
        if (updatedHabitList) {
          setHabits(updatedHabitList);
        }
      }
    } catch (err) {}
  }
  async function updateHabit(habitObject) {
    const { name } = habitObject;
    try {
      const res = await fetch("http://localhost:3000/updateStreak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        const updatedHabitList = await res.json();
        setHabits(updatedHabitList);
      }
    } catch (err) {}
  }
  async function addHabit(habitObject) {
    const index = habits.findIndex(
      (habit) => habit.name.toLowerCase() === habitObject.name.toLowerCase()
    );
    if (index === -1) {
      const { name, streak } = habitObject;
      try {
        const res = await fetch("http://localhost:3000/addNewHabit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, streak: Number(streak) }),
        });
        if (res.ok) {
          const uploadedHabit = await res.json();
          setHabits([...habits, uploadedHabit]);
        }
      } catch (err) {}
    } else {
      console.log("already exists");
    }
  }
  async function deleteHabit(habitObject) {
    const { name, streak } = habitObject;
    try {
      const res = await fetch("http://localhost:3000/deleteHabit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, streak: Number(streak) }),
      });
      if (res.ok) {
        const updatedHabitList = await res.json();
        if (updatedHabitList) {
          setHabits(updatedHabitList);
        }
      }
    } catch (err) {}
  }

  useEffect(() => {
    async function fetchHabits() {
      try {
        const res = await fetch("http://localhost:3000/habits");
        if (res.ok) {
          const response = await res.json();
          setHabits(response);
        }
      } catch (err) {}
    }
    fetchHabits();
  }, []);

  const HabitCtx = {
    habits: habits,
    deleteHabit: deleteHabit,
    addHabit: addHabit,
    updateHabit: updateHabit,
  };
  return (
    <HabitsContext.Provider value={HabitCtx}>{children}</HabitsContext.Provider>
  );
}
