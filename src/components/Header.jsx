import Button from "../assets/Button";
export default function Header({ handleLogoutFunc }) {
  return (
    <header>
      <div style={{ width: "50%", color: "white" }}>
        <h1>Habit tracker</h1>
      </div>
      <div
        style={{
          width: "50%",
          alignItems: "flex-end",
        }}
      >
        <Button name="Logout" onClick={handleLogoutFunc}></Button>
      </div>
    </header>
  );
}
