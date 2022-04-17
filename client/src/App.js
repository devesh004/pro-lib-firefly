import "./lux.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginScreen from "./Screens/LoginScreen";
import Header from "./components/Layout/Header";
import SignupScreen from "./Screens/SignupScreen";
import Privateroute from "./components/Routes/Privateroute";
import AddProjectScreen from "./Screens/AddProjectScreen";
<<<<<<< HEAD
import VerifyUserScreen from "./Screens/VerifyUserScreen";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/action/auth";
=======
import Home from "./Screens/Home";
import AllProjects from "./Screens/AllProjects";
>>>>>>> f7d706f6839f5769a2377752684dd143ee2e3809

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <Header />
      <Container>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allProjects" element={<AllProjects />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route
              path="/new-project"
              element={<Privateroute component={<AddProjectScreen />} />}
            />
            <Route
              path='/user-verification'
              element={<Privateroute component={<VerifyUserScreen />} />}
            />
          </Routes>
        </main>
      </Container>
    </>
  );
}

export default App;
