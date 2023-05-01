import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { forgotPassword, clearErrors } from "../../actions/userActions";

import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  const success = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const notify = (error = "") => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    dispatch(clearErrors());
  };

  const schema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log("Error", error);
    if (message) {
      success(message);
    }

    if (error) {
      notify("User email is not found");
      dispatch(clearErrors());
    }
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    // e.preventDefault();

    const formData = new FormData();

    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />

      <MDBContainer>
        <MDBRow className="d-flex justify-content-center mt-5">
          <MDBCol className="col-10 col-lg-5">
            <form
              className="shadow-lg p-5 rounded-9"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-3 text-center">
                <b>Forgot Password</b>
              </h1>

              <div className="form-group">
                <label htmlFor="email_field">
                  Enter Email<label className="text-danger">*</label>
                </label>

                <input
                  {...register("email")}
                  type="text"
                  id="email_field"
                  className={`form-control m-0 mt-1 ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>

              <MDBBtn
                id="forgot_password_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                Send Email
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Fragment>
  );
};

export default ForgotPassword;
