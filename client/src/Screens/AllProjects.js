import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import { colleges } from "../utils/CollgeNameList";
import { domains } from "../utils/Arrays";
import { FloatingLabel, Form } from "react-bootstrap";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get("/api/project/allProjects", options);
      //   console.log(data);
      setProjects(data);
    };
    fetchProjects();
  });

  const handleFilters = (e) => {
    setFilters((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const filterProjects = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/project?college=${filters.college}&domains=${filters.domain}&hashTags=${filters.hashTags}&sort=${filters.sort}`,
      options
    );
    console.log(data);
    //   setProjects(data);
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
            >
              <option>Open this select menu</option>
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
            <Form.Select onChange={(e) => handleFilters(e)} aria-label='domain'>
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
      <Button variant='success' onClick={filterProjects}>
        Apply
      </Button>
    </Container>
  );
};

export default AllProjects;
