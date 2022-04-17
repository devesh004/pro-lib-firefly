import "./lux.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginScreen from "./Screens/LoginScreen";
import Header from "./components/Layout/Header";
import SignupScreen from "./Screens/SignupScreen";
import Privateroute from "./components/Routes/Privateroute";
import AddProjectScreen from "./Screens/AddProjectScreen";
import Home from "./Screens/Home";
import AllProjects from "./Screens/AllProjects";

function App() {
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
          </Routes>
        </main>
      </Container>
    </>
  );
}

export default App;
