import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { colleges } from "../utils/CollgeNameList";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/action/auth";
import { domains } from "../utils/Arrays";
import axios from "axios";
// import Meta from "../components/UI/Meta";

const AddProjectScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [touched, setTouched] = useState(false);
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState(null);
  const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    setTouched(true);

    // if (!isFormValid) return;

    // dispatch(loginUser(enteredEmail, enteredPassword));
  };

  const verifyEmail = async () => {
    console.log(college, email);
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/auth/verifyEmail",
        { email },
        options
      );
      console.log(data);
      setPage(2);
    } catch (err) {
      setErr(err.message);
    }
  };

  const verifyOTP = () => {
    console.log(college, email);
    setPage(3);
  };

  return (
    <>
      {/* <Meta title='Shopzone | Login' /> */}
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <div className='display-6 mb-5'>Add your project</div>

          <div className='pt-3 pb-1'>
            {err && <Alert variant='danger'>{err}</Alert>}
            {loading && (
              <div>
                <Spinner size='sm' animation='grow' variant='primary' />
                <Spinner
                  size='sm'
                  className='mx-1'
                  animation='grow'
                  variant='warning'
                />
                <Spinner size='sm' animation='grow' variant='success' />
                <span className='mx-1 text-warning'>Loging you in</span>
              </div>
            )}

            {page === 1 && (
              <>
                <div className='h5'>Add college details</div>
                <FloatingLabel
                  className='mb-2'
                  label='Select college'
                  controlId='college'
                >
                  <Form.Select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
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
                <FloatingLabel
                  className='mb-2'
                  label='Student email'
                  controlId='email'
                >
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name='email'
                    type='email'
                    placeholder='Enter email'
                  />
                  {touched && !mailReg.test(email) && (
                    <Form.Text className='error-text'>
                      Please enter valid email
                    </Form.Text>
                  )}
                </FloatingLabel>
                <Button
                  className='btn-s'
                  style={{ width: "175px" }}
                  variant='success'
                  type='submit'
                  onClick={verifyEmail}
                >
                  Get OTP
                </Button>
              </>
            )}
            {page === 2 && (
              <>
                <div className='h5'>Enter 6 digit OTP sent to your email</div>
                <FloatingLabel
                  className='mb-2'
                  label='Enter here'
                  controlId='name'
                >
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name='name'
                    type='text'
                    placeholder='Enter name'
                  />
                  {touched && name.trim().length === 0 && (
                    <Form.Text className='error-text'>
                      Please enter project name
                    </Form.Text>
                  )}
                </FloatingLabel>
                <Button
                  className='btn-s'
                  style={{ width: "175px" }}
                  variant='success'
                  type='submit'
                  onClick={verifyOTP}
                >
                  Verify email
                </Button>
              </>
            )}
            {/* <FloatingLabel
              className='mb-2'
              label='Select domain'
              controlId='domain'
            >
              <Form.Select
                onChange={(e) => setCollege(e.target.value)}
                aria-label='college'
              >
                <option>Open this select menu</option>
                {colleges.map((el, index) => (
                  <option key={index} value={el}>
                    {el}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel> */}

            {page === 3 && (
              <>
                <FloatingLabel
                  className='mb-2'
                  label='Project name'
                  controlId='name'
                >
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name='name'
                    type='text'
                    placeholder='Enter name'
                  />
                  {touched && name.trim().length === 0 && (
                    <Form.Text className='error-text'>
                      Please enter project name
                    </Form.Text>
                  )}
                </FloatingLabel>
                <Button
                  className='btn-s'
                  style={{ width: "175px" }}
                  variant='success'
                  type='submit'
                >
                  Add
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddProjectScreen;
