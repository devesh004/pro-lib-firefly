import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <div>WELCOME TO</div>
      <div>PROLIB</div>
      <Link to="/allProjects">All projects</Link>
    </Container>
  );
};

export default Home;
