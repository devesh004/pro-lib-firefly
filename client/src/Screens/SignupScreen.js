import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Spinner,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/action/auth";
import { colleges } from "../utils/CollgeNameList";
// import Alertt from "../components/Layout/Alert";
// import Meta from "../components/UI/Meta";

const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

const SignupScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const ref = useRef();
  const ref2 = useRef();
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [l, setL] = useState(false);

  // naviagte if registered

  useEffect(() => {
    if (user) {
      navigate(`/${redirect}`);
    }
  }, [redirect, user, navigate]);

  //   useEffect(() => {
  //     const checkIfClickedOutside = (e) => {
  //       if (
  //         showSearch &&
  //         ref.current &&
  //         !ref.current.contains(e.target) &&
  //         ref2.current &&
  //         !ref2.current.contains(e.target)
  //       ) {
  //         setShowSearch(false);
  //       }
  //     };

  //     document.addEventListener("click", checkIfClickedOutside, true);
  //     return () => {
  //       document.removeEventListener("click", checkIfClickedOutside, true);
  //     };
  //   }, [showSearch]);

  // form handling
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confPass: "",
    college: "",
    github: "",
    linkedIn: "",
  });
  const [touched, setTouched] = useState(false);

  const { name, email, password, confPass, college, github, linkedIn } =
    formData;

  const passInvalid = touched && !passReg.test(password);

  const emailInvalid = touched && !mailReg.test(email);

  const passNotMatch = touched && confPass !== password;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    setTouched(true);

    if (
      !passReg.test(password) ||
      !mailReg.test(email) ||
      confPass !== password ||
      name.trim().length === 0
    ) {
      return;
    } else {
      setTouched(false);
      // console.log(formData);
      dispatch(registerUser(name, email, password, college, github, linkedIn));
    }
  };

  return (
    <>
      {/* <Meta title='Shopzone | Signup' /> */}
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <div className='display-6'>Sign up</div>

          <Form onSubmit={formSubmissionHandler} className='pt-3 pb-2'>
            {error && <Alert variant='danger'>{error}</Alert>}
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
                <span className='mx-1 text-warning'>Signing you up</span>
              </div>
            )}
            <FloatingLabel className='mb-2' label='Full name' controlId='name'>
              <Form.Control
                value={name}
                onChange={changeHandler}
                name='name'
                type='text'
                placeholder='Enter name'
              />
              {touched && name.trim().length === 0 && (
                <Form.Text className='error-text'>
                  Please enter a name
                </Form.Text>
              )}
            </FloatingLabel>
            <FloatingLabel className='mb-2' label='Email' controlId='email'>
              <Form.Control
                value={email}
                onChange={changeHandler}
                name='email'
                type='email'
                placeholder='Enter email'
              />
              {touched && emailInvalid && (
                <Form.Text className='error-text'>
                  Please enter valid email
                </Form.Text>
              )}
            </FloatingLabel>
            <FloatingLabel
              className='mb-2'
              label='Select college'
              controlId='college'
            >
              <Form.Select
                onChange={(e) =>
                  setFormData({ ...formData, college: e.target.value })
                }
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
            <FloatingLabel className='mb-2' label='Github' controlId='github'>
              <Form.Control
                value={github}
                onChange={changeHandler}
                name='github'
                type='text'
                placeholder='github'
              />
            </FloatingLabel>
            <FloatingLabel
              className='mb-2'
              label='LinkedIn'
              controlId='linkedin'
            >
              <Form.Control
                value={linkedIn}
                onChange={changeHandler}
                name='linkedIn'
                type='text'
                placeholder='Enter linkedin'
              />
            </FloatingLabel>

            {/* <FloatingLabel
              controlId='college'
              label='College Name'
              className='mb-2 position-relative'
              ref={ref}
            >
              <Form.Control
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                name='college'
                type='text'
                placeholder='Enter College'
              />
              {keyword !== "" && (
                <div
                  className='px-2 py-1 mt-1 rounded overflow-auto'
                  style={{
                    backgroundColor: "#F7F7F9",
                    maxHeight: "250px",
                    position: "absolute",
                    zIndex: 11,
                    border: "1px solid gray",
                  }}
                >
                  {let res = colleges
                    .filter((el) => {
                      if (el.toLowerCase().startsWith(keyword.toLowerCase()))
                        return true;
                      for (let st of el.split(" "))
                        if (st.toLowerCase().startsWith(keyword.toLowerCase()))
                          return true;
                    })
                    res && res.length>0 && res.map((el) => (
                        <div
                          onClick={(e) => {
                            setFormData({ ...formData, college: keyword });
                            setKeyword("");
                          }}
                        >
                          {el}
                        </div>
                    
                    ))}
                </div>
              )}
            </FloatingLabel> */}

            <FloatingLabel
              controlId='password'
              label='Set Password'
              className='mb-2'
            >
              <Form.Control
                value={password}
                onChange={changeHandler}
                name='password'
                type='password'
                placeholder='Password'
              />
              <Form.Text className={passInvalid && "error-text"}>
                Password should be 7 to 15 characters which contain at least one
                numeric digit and a special character
              </Form.Text>
            </FloatingLabel>

            <FloatingLabel
              className='mb-2'
              controlId='confPass'
              label='Confirm password'
            >
              <Form.Control
                name='confPass'
                value={confPass}
                onChange={changeHandler}
                type='password'
                placeholder='Enter your password again'
              />
              {passNotMatch && (
                <Form.Text className='error-text'>
                  Password do not match
                </Form.Text>
              )}
            </FloatingLabel>

            <Button
              disabled={loading}
              className='btn-s'
              variant='success'
              type='submit'
              style={{ width: "175px" }}
            >
              Sign up
            </Button>
          </Form>
          <Row>
            <Col className='mb-5'>
              Already have an account ?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Login <i className='fas fa-location-arrow'></i>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SignupScreen;
