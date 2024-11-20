import { Route, Routes } from "react-router-dom";
import SignInForm from "./components/sign-in-form/sign-in-form.component";
import MainPage from "./components/main/main-page.component";
import SignUpForm from "./components/sign-up-form/sign-up-form.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="main" element={<MainPage />} />
      <Route path="/sign-up" element={<SignUpForm />} />
    </Routes>
  );
};

export default App;
