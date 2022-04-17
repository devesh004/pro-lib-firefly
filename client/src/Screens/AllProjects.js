import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import { colleges } from "../utils/CollgeNameList";
import { domains } from "../utils/Domains";
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
      <Row className="py-3">
        <Col md={8}>
          <span className="m-2">College</span>
          <select
            name="college"
            className="p-1"
            onChange={(e) => handleFilters(e)}
          >
            <option value={""}>Select</option>
            {colleges.map((col) => (
              <option value={col}>{col}</option>
            ))}
            <option>others</option>
          </select>
        </Col>
        <Col md={4}>
          <span className="m-2">Select Domain</span>
          <select
            name="domain"
            className="p-1"
            onChange={(e) => handleFilters(e)}
          >
            <option value={""}>Select</option>
            {domains.map((dom) => (
              <option key={dom} value={dom}>
                {dom}
              </option>
            ))}
            <option>others</option>
          </select>
        </Col>
      </Row>
      <Row className="py-2">
        <Col md={4}>
          <span className="m-2">Hash Tag</span>
          <select
            name="hashTags"
            className="p-1"
            onChange={(e) => handleFilters(e)}
          >
            <option value={""}>Select</option>
            <option>others</option>
          </select>
        </Col>
        <Col md={4}>
          <span className="m-2">Sort</span>
          <select
            name="sort"
            className="p-1"
            onChange={(e) => handleFilters(e)}
          >
            <option value={""}>Select</option>
            <option value={"stars"}>Stars</option>
            <option value={"forks"}>Forks</option>
            <option value={"issues"}>Issues</option>
          </select>
        </Col>
      </Row>
      <Button variant="success" onClick={filterProjects}>
        Apply
      </Button>
    </Container>
  );
};

export default AllProjects;
