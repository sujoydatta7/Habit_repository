import { useContext, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { HabitsContextProvider } from "./store/HabitsContext";
import { LoginContextProvider } from "./store/LoginContext";
import { LoginModal } from "./assets/LoginModal";
import LoginContext from "./store/LoginContext";

function AppWrapper() {
  return (
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  );
}

function App() {
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    if (!loginCtx.showLoginModal) {
      setTimeout(() => {
        loginCtx.showLoginModalFunc(true);
      }, 5 * 60 * 1000);
    }
  });

  function handleShowLogoutModal() {
    loginCtx.showLoginModalFunc(true);
  }
  async function handleLogInFormSubmit(username, password) {
    loginCtx.login(username, password);
  }
  return (
    <div className="App">
      <HabitsContextProvider>
        {!loginCtx.showLoginModal && (
          <Header handleLogoutFunc={handleShowLogoutModal}></Header>
        )}
        {!loginCtx.showLoginModal && <Main></Main>}
        {loginCtx.showLoginModal && (
          <LoginModal
            open={loginCtx.showLoginModal}
            handleSubmit={handleLogInFormSubmit}
          ></LoginModal>
        )}
      </HabitsContextProvider>
    </div>
  );
}

export default AppWrapper;
