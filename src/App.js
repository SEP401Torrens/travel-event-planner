import "./App.css";
import { Route,  Routes } from "react-router-dom";
import SignInForm from "./components/sign-in-form/sign-in-form.component";
import MainPage from "./components/main/main-page.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>

  );
}

export default App;
