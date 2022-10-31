import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Container,
  Row,
  Card,
  Badge,
  Spinner,
} from "react-bootstrap";
import { colleges } from "../utils/CollgeNameList";
import { domains } from "../utils/Arrays";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/project/allProjects");
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleFilters = (e) => {
    setFilters((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const filterProjects = async () => {
    let qs = "";
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/project?college=${filters.college}&domains=${filters.domain}&sort=${filters.sort}`
      );
      setLoading(false);
      setProjects(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <Row className='py-3'>
        <Col md={7}>
          <FloatingLabel
            className='mb-2'
            label='Select college'
            controlId='college'
          >
            <Form.Select
              onChange={(e) => handleFilters(e)}
              aria-label='college'
              name='college'
            >
              <option value=''>Any</option>
              {colleges.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md={5}>
          <FloatingLabel
            className='mb-2'
            label='Select domain'
            controlId='domain'
          >
            <Form.Select
              onChange={(e) => handleFilters(e)}
              aria-label='domain'
              name='domain'
            >
              <option value=''>Any</option>
              {domains.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className='py-3 justify-content-center'>
        <Col md={4} style={{ width: "100%" }}>
          <span className='m-2'>Hash Tag</span>
        </Col>
        <Col md={4}>
          <span className='m-2'>Sort</span>
          <select
            name='sort'
            className='p-1'
            onChange={(e) => handleFilters(e)}
          >
            <option value={""}>Select</option>
            <option value={"stars"}>Stars</option>
            <option value={"forks"}>Forks</option>
            <option value={"issues"}>Issues</option>
          </select>
        </Col>
      </Row>
      <Button
        variant='success'
        style={{ width: "110px" }}
        onClick={filterProjects}
      >
        {!loading && "Apply"}
        {loading && (
          <div className=''>
            <Spinner size='sm' animation='grow' variant='primary' />

            <Spinner
              size='sm'
              className='mx-1'
              animation='grow'
              variant='info'
            />
            <Spinner size='sm' animation='grow' variant='warning' />
          </div>
        )}
      </Button>

      {projects.map((pro) => (
        <Card key={pro._id} className='shadow my-4 px-2 py-2'>
          <Card.Header>{pro.name}</Card.Header>
          <Card.Body>
            <Badge bg='info'>{pro.isCompleted ? "Completed" : "Ongoing"}</Badge>
            <div className='my-1'>Domain : {pro.domain}</div>
            <strong className='my-1'>College : {pro.college}</strong>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default AllProjects;
