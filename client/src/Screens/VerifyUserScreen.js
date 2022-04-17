import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  FloatingLabel,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { colleges } from "../utils/CollgeNameList";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginUser, verifyUser } from "../redux/action/auth";
import { domains } from "../utils/Arrays";
import axios from "axios";
// import Meta from "../components/UI/Meta";

const VerifyUserScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [touched, setTouched] = useState(false);
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  //   const [name, setName] = useState("");
  //   const [domain, setDomain] = useState("");
  //   const [description, setDesc] = useState("");
  //   const [githubRepo, setGithubRepo] = useState("");
  const [err, setErr] = useState(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [mailData, setMailData] = useState(null);
  const [otp, setOtp] = useState("");
  const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const verifyEmail = async () => {
    console.log(college, email);
    try {
      setTouched(true);
      setEmailLoading(true);
      setErr(null);
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
      setEmailLoading(false);
      console.log(data);
      setMailData(data);
      setTouched(false);
      setPage(2);
    } catch (err) {
      setErr("Email not sent");
      setEmailLoading(false);
      setTouched(false);
    }
  };

  const verifyOTP = () => {
    setErr(null);
    if (!Number(otp)) {
      setErr("Please enter a valid otp");
    } else if (mailData == null) {
      console.log(mailData);
      setErr("Email was not sent");
    } else if (
      Date.now() - mailData.created_at > 5 * 60 * 1000 ||
      mailData.otp !== Number(otp)
    ) {
      setErr("OTP is not valid, please send again");
      return;
    } else {
      dispatch(
        verifyUser(() => {
          setMailData(null);
          setOtp("");
          setEmail("");
          setPage(3);
        })
      );
    }
  };

  return (
    <>
      {/* <Meta title='Shopzone | Login' /> */}
      {user && user.isVerified && <div>ALready verified</div>}
      {user && !user.isVerified && (
        <Row className='justify-content-md-center'>
          <Col md={8}>
            <div className='display-6 mb-5'>Verification</div>

            <div className='pt-3 pb-1'>
              {err && <Alert variant='danger'>{err}</Alert>}
              {emailLoading && (
                <div>
                  <Spinner size='sm' animation='grow' variant='primary' />
                  <Spinner
                    size='sm'
                    className='mx-1'
                    animation='grow'
                    variant='warning'
                  />
                  <Spinner size='sm' animation='grow' variant='success' />
                  <span className='mx-2 text-warning'>Sending mail</span>
                </div>
              )}

              {page === 1 && (
                <>
                  <div className='h5'>College</div>
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
                    controlId='otp'
                  >
                    <Form.Control
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      type='text'
                      placeholder='Enter OTP'
                    />
                  </FloatingLabel>
                  <Button
                    className='btn-s'
                    style={{ width: "175px" }}
                    variant='success'
                    onClick={verifyOTP}
                  >
                    Verify email
                  </Button>
                </>
              )}

              {page === 3 && (
                <>
                  <Alert variant='success'>User verified</Alert>
                  <Link to='/'>Go to home</Link>
                  <Link className='ms-3' to='/new-project'>
                    Add new project
                  </Link>
                </>
              )}
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default VerifyUserScreen;
