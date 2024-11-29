import { Navigate, Route, Routes } from "react-router-dom";
import SignInForm from "./components/sign-in-form/sign-in-form.component";
import MainPage from "./components/main/main-page.component";
import SignUpForm from "./components/sign-up-form/sign-up-form.component";
import { useSelector } from "react-redux";
import { isAuthenticated } from "./store/auth/auth.selector";
import Profile from "./components/profile/profile.component";
import Layout from "./components/layout/layout.component";

const App = () => {
  const isAuth = useSelector(isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuth ? <Navigate to="/main" /> : <SignInForm />}
      />
      <Route
        path="/main"
        element={isAuth ?  <MainPage /> : <Navigate to="/" />}
      />
      <Route
        path="/sign-up"
        element={isAuth ? <Navigate to="/main" /> : <SignUpForm />}
      />
      <Route
        path="/profile"
        element={isAuth ? (
          <Layout>
            <Profile />
          </Layout>
        ) : (
          <Navigate to="/" />
        )}/>
    </Routes>
  );
};

export default App;
