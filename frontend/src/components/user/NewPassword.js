import React, { Fragment, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import { resetPassword, clearErrors } from "../../actions/userActions";

import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "react-toastify";

const NewPassword = () => {
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { error, success } = useSelector((state) => state.forgotPassword);

  let { token } = useParams();

  const schema = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const successToast = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      notify(error);

      dispatch(clearErrors());
    }

    if (success) {
      successToast('Password reset successfully')

      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    // e.preventDefault();

    const formData = new FormData();

    formData.set("password", password);

    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, formData));
  };

  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />

      <MDBContainer>
        <MDBRow className="d-flex justify-content-center mt-5">
          <MDBCol className="col-10 col-lg-5">
            <div className="shadow-lg rounded-9 p-5">
              <form className="" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-3 text-center">New Password</h1>

                <div className="form-group">
                  <label htmlFor="password_field">
                    Password<label className="text-danger">*</label>
                  </label>

                  <input
                    {...register("password")}
                    type="password"
                    id="password_field"
                    className={`form-control m-0 mt-1 ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="confirm_password_field">
                    Confirm Password<label className="text-danger">*</label>
                  </label>

                  <input
                    {...register("confirmPassword")}
                    type="password"
                    id="confirm_password_field"
                    className={`form-control m-0 mt-1 ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <p className="text-danger">
                    {errors.confirmPassword?.message}
                  </p>
                </div>

                <MDBBtn
                  id="new_password_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Reset Password
                </MDBBtn>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Fragment>
  );
};

export default NewPassword;
