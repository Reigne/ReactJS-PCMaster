import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import { updatePassword, clearErrors } from "../../actions/userActions";

import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import {
  MDBBtn,
  MDBContainer,
  MDBCol,
} from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.user);
  
  const schema = yup.object({
    oldPassword: yup
      .string()
      .required("Old Password is required")
      .min(6, "Password must be at least 6 characters"),
    password: yup
      .string()
      .required("New Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const success = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      console.log(error);

      notify(error);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      success("Password updated successfully");

      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    // e.preventDefault();

    const formData = new FormData();

    formData.set("oldPassword", oldPassword);

    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Change Password"} />

      <MDBContainer className="mt-5 d-flex justify-content-center">
        <MDBCol className="shadow-lg p-4 rounded-8 col-sm-6">
          <form onSubmit={handleSubmit(submitHandler)}>
            <h1 className="mt-2 mb-5 text-center">Update Password</h1>

            <div className="form-group">
              <label htmlFor="old_password_field"><b>Old Password </b>*</label>

              <input
              {...register("oldPassword")}
                type="password"
                id="old_password_field"
                className={`form-control m-0 ${errors.oldPassword ? "is-invalid" : ""}`}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <p className="text-danger">{errors.oldPassword?.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field"><b>New Password</b> *</label>

              <input
                {...register("password")}
                type="password" 
                id="new_password_field"
                className={`form-control m-0 ${errors.password ? "is-invalid" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-danger">{errors.password?.message}</p>
            </div>

            <MDBBtn
              type="submit"
              className="btn update-btn btn-block mt-4 mb-2"
              disabled={loading ? true : false}
            >
              Update Password
            </MDBBtn>
          </form>
        </MDBCol>
      </MDBContainer>
    </Fragment>
  );
};

export default UpdatePassword;
