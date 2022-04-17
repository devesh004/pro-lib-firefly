import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// var sectionStyle = {
//   backgroundImage=url(
//     "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=628&q=80"
//   ),
// };

const Home = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "70vh",
        backgroundColor: "#555",
      }}
    >
      <Row className="d-flex justify-content-center align-items-center">
        <h1>WELCOME TO PROLIB</h1>
        <Link to="/allProjects">
          <Button>View Projects</Button>
        </Link>
      </Row>
    </Container>
  );
};

export default Home;
