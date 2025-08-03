import Button from "../assets/Button";
export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "purple",
      }}
    >
      <div style={{ width: "50%", color: "white" }}>
        <h1>Habit tracker</h1>
      </div>
      <div style={{ width: "50%", alignItems: "self-end" }}>
        <Button name="Login"></Button>
      </div>
    </div>
  );
}
