import "../styles/HabitCard.css"; // CSS file we'll define next

export default function Habit({ habit, onDelete, onView }) {
  const { name, completed, streak } = habit;

  return (
    <div
      className={`habit-card ${completed ? "completed" : ""}`}
      onClick={onView}
    >
      <div className="habit-info">
        {/* <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(habit)}
        /> */}
        <div>
          <div className="habit-name">{name}</div>
          <div className="habit-streak">
            🔥 Streak: {streak} {streak === 1 ? "day" : "days"}
          </div>
        </div>
      </div>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(habit);
        }}
      >
        ✕
      </button>
    </div>
  );
}
