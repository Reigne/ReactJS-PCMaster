import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register, clearErrors } from "../../actions/userActions";


const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const { name, email, password } = user;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const [avatarPreview, setAvatarPreview] = useState("/images/user.png");

  const schema = yup.object({
    name: yup.string().required("Name is required"),
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
    register: handleRegister,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const formSubmit = (e) => {
    // e.preventDefault();
  
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
  
    dispatch(register(formData));
  };
  

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      // setUser({ ...user, [e.target.name]: e.target.value });
      if (e.target.name === "name") {
        setName(e.target.value);
      } else if (e.target.name === "email") {
        setEmail(e.target.value);
      } else if (e.target.name === "password") {
        setPassword(e.target.value);
      }
      
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <MDBContainer>
        <MDBRow className="d-flex justify-content-center mt-5 no-gutters">
          <MDBCol className="rounded-3 shadow-lg p-5 col-10 col-lg-5">
            <form
              className="mt-5"
              // onSubmit={submitHandler}
              onSubmit={handleSubmit(formSubmit)}
              encType="multipart/form-data"
            >
              <h1 className="mb-3 text-center">
                <b>Register</b>
              </h1>

              <div className="form-group">
                <label htmlFor="email_field">Name<label className="text-danger">*</label></label>
                <input
                  {...handleRegister("name")}
                  type="name"
                  id="name_field"
                  className={`form-control m-0 ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  onChange={onChange}
                  value={name}
                />
                <p className="text-danger">{errors.name?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email<label className="text-danger">*</label></label>
                <input
                  {...handleRegister("email")}
                  type="email"
                  id="email_field"
                  className={`form-control m-0 ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  onChange={onChange}
                  value={email}
                />
                 <p className="text-danger">{errors.email?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password<label className="text-danger">*</label></label>
                <input
                  {...handleRegister("password")}
                  type="password"
                  id="password_field"
                  className={`form-control m-0 ${errors.password ? "is-invalid" : ""}`}
                  name="password"
                  onChange={onChange}
                  value={password}
                />
                 <p className="text-danger">{errors.password?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar<label className="text-danger">*</label></label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        width="50"
                        height="50"
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <MDBBtn
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                REGISTER
              </MDBBtn>
            </form>
          </MDBCol>
          <MDBCol className="d-none d-xxl-block col-lg-5">
            <img
              src="/images/background-4.gif"
              alt="Store Image"
              className="img-fluid"
              style={{ maxHeight: "700px", overflow: "auto" }}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div> */}
    </Fragment>
  );
};

export default Register;
