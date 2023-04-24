import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { MDBCol, MDBRow } from "mdbreact";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const schema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  // const redirect = location.search ? location.search.split("=")[1] : "";
  const redirect = new URLSearchParams(location.search).get("redirect");
  useEffect(() => {
    if (isAuthenticated && redirect === "shipping") {
      navigate(`/${redirect}`, { replace: true });
    } else if (isAuthenticated) navigate("/");
    if (error) {
      // alert.error(error);

      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  const submitHandler = (e) => {
    // e.preventDefault();
    dispatch(login(email, password));
  };
  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />
          

          <MDBContainer>
            <MDBRow className="d-flex justify-content-center mt-5">
              <MDBCol className="rounded-3 shadow-lg p-5 col-10 col-lg-5">
              <form className="mt-5" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-3 text-center"><b>PC Master</b></h1>
                <div className="d-flex justify-content-center"> 
                {/* <img src="/images/pcmaster_logo.png" alt="Store Image" 
                className="img-fluid rounded-4 align-center" 
                style={{ maxHeight:'900px', overflow:'auto', }}/> */}
                </div>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    {...register("email")}
                    type="text"
                    id="email_field"
                    // className="form-control"
                    className={`form-control m-0 mt-1 ${errors.email ? "is-invalid" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-danger">{errors.email?.message}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    {...register("password")}
                    type="password"
                    id="password_field"
                    className={`form-control m-0 mt-1 ${errors.password ? "is-invalid" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </div>

                <Link to="/password/forgot" className="small float-right mb-3">
                  Forgot Password?
                </Link>
                {/* <Button variant="success">bootstrap</Button> */}
                <MDBBtn
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </MDBBtn>
                <div className="text-center mt-3">
                <p className="d-inline-block">Create New Account?&nbsp;</p>
                <Link to="/register" className="d-inline-block">
                  Register here.
                </Link>
                </div>
              </form>
              </MDBCol>
              <MDBCol className="d-none d-xxl-block col-lg-4">
                <img src="/images/background-1.jpg" alt="Store Image" 
                className="img-fluid" 
                style={{ maxHeight:'600px', overflow:'auto', }}
                />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Fragment>
      )}
    </Fragment>
  );

  // turn (
  //   <Fragment>
  //     {loading ? (
  //       <Loader />
  //     ) : (
  //       <Fragment>
  //         <MetaData title={"Login"} />

  //         <div class="d-flex justify-content-center">
  //           <Container className="container-sm shadow-lg rounded m-3 mt-5">
  //             <h4 className="mt-4 text-center ">
  //               <strong>PC-Master</strong>
  //             </h4>
  //             <Form>
  //               <Form.Group
  //                 as={Row}
  //                 className="mb-3 mt-4"
  //                 controlId="formPlaintextEmail"
  //               >
  //                 <Form.Label column sm="2">
  //                   <strong>Email</strong>
  //                 </Form.Label>
  //                 <Col sm="10">
  //                   <Form.Control placeholder="pc-master@example.com" />
  //                 </Col>
  //               </Form.Group>

  //               <Form.Group
  //                 as={Row}
  //                 className="mb-3"
  //                 controlId="formPlaintextPassword"
  //               >
  //                 <Form.Label column sm="2">
  //                   <strong>Password</strong>
  //                 </Form.Label>
  //                 <Col sm="10">
  //                   <Form.Control type="password" placeholder="Password" />
  //                 </Col>
  //               </Form.Group>

  //               <Form.Group>
  //                 <Button
  //                   className="w-100 m-2 mb-0"
  //                   variant="success"
  //                   type="submit"
  //                 >
  //                   Login
  //                 </Button>
  //                 <Form.Text className="mb-3 ml-5 text-muted text-center">
  //                   Create New Account? <Link>Click here</Link>
  //                   <Link to="/password/forgot" className="float-right">
  //                   Forgot Password?
  //                   </Link>
  //                 </Form.Text>
  //               </Form.Group>
  //             </Form>
  //           </Container>
  //         </div>
  //       </Fragment>
  //     )}
  //   </Fragment>
  // );re
};

export default Login;
