import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function LoginModal({ open, handleSubmit }) {
  const dialogRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmitLoginForm() {
    handleSubmit(username, password);
  }
  function handleInputChange(event) {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  }
  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);
  return createPortal(
    <dialog ref={dialogRef} className="modal">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitLoginForm();
        }}
      >
        <div style={{ display: "flex" }}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
            style={{ paddingRight: "10px" }}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}
