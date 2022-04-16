import "./lux.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginScreen from "./Screens/LoginScreen";
import Header from "./components/Layout/Header";
import SignupScreen from "./Screens/SignupScreen";
import Privateroute from "./components/Routes/Privateroute";
import AddProjectScreen from "./Screens/AddProjectScreen";

function App() {
  return (
    <>
      <Header />
      <Container>
        <main>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
            <Route
              path='/new-project'
              element={<Privateroute component={<AddProjectScreen />} />}
            />
          </Routes>
        </main>
      </Container>
    </>
  );
}

export default App;
