import { createContext, useState } from "react";

const LoginContext = createContext({
  login: () => {},
  showLoginModalFunc: () => {},
  showLoginModal: true,
});

export function LoginContextProvider({ children }) {
  const [loginModalShown, setLoginModalShow] = useState(true);
  async function loginFunc(username, password) {
    console.log(username + " " + password);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.ok) {
        setLoginModalShow(false);
        console.log(username + " " + password);
      }
    } catch (Err) {}
  }
  const loginCtx = {
    login: loginFunc,
    showLoginModalFunc: setLoginModalShow,
    showLoginModal: loginModalShown,
  };
  return (
    <LoginContext.Provider value={loginCtx}>{children}</LoginContext.Provider>
  );
}

export default LoginContext;
