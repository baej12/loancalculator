import "./App.css";
import { Paths } from "./Routes";
import { CreateLoan } from "./components/CreateLoan";

function App() {
  return (
    <div className="App">
      <CreateLoan>
        <Paths />
      </CreateLoan>
    </div>
  );
}

export default App;
