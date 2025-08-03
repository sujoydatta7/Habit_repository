import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { HabitsContextProvider } from "./store/HabitsContext";

function App() {
  return (
    <div className="App">
      <HabitsContextProvider>
        <Header></Header>
        <Main></Main>
      </HabitsContextProvider>
    </div>
  );
}

export default App;
