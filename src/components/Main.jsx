import { useContext, useState } from "react";
import Habit from "./Habit";
import { HabitsContext } from "../store/HabitsContext";
import Button from "../assets/Button";

export default function Main() {
  const [habitName, setHabitName] = useState("");
  const habitCtx = useContext(HabitsContext);

  function handleInputChange(e) {
    if (e.target.name === "name") {
      setHabitName(e.target.value);
    }
  }

  async function handleHabitCardDelete(habitToBeDeleted) {
    habitCtx.deleteHabit(habitToBeDeleted);
  }

  async function handleAddHabit() {
    const index = habitCtx.habits.findIndex(
      (habit) => habit.name === habitName
    );
    if (index === -1) habitCtx.addHabit({ name: habitName, streak: 0 });
  }

  async function updateStreak(habitObject) {
    habitCtx.updateHabit(habitObject);
  }
  return (
    <div style={{ width: "50%" }}>
      <div style={{ display: "flex", justifyContent: "start" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddHabit();
          }}
        >
          <input
            style={{
              margin: "10px",
              height: "30px",
              borderRadius: "10px",
              fontSize: "18px",
            }}
            type="text"
            name="name"
            value={habitName}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" name="+Add habit"></Button>
        </form>
      </div>
      <div>
        {habitCtx.habits.map((habit) => {
          return (
            <Habit
              key={habit.name}
              habit={habit}
              //   onToggle={handleHabitCardToggle}
              onDelete={handleHabitCardDelete}
              onView={() => updateStreak({ name: habit.name })}
            ></Habit>
          );
        })}
      </div>
    </div>
  );
}
