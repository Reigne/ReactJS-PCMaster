import React, { Fragment, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Sidebar from "./Sidebar";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";

import { UPDATE_USER_RESET } from "../../constants/userConstants";

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Swal from "sweetalert2";

const UpdateUser = () => {
  const schema = yup.object({
    name: yup
      .string()
      .max(50, "Charater must be maximum 50")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    role: yup
      .string()
      .oneOf(['admin', 'user'])
      .required('Please select valid user role')  
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { error, isUpdated } = useSelector((state) => state.user);

  const { user } = useSelector((state) => state.userDetails);

  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    // console.log(user && user._id !== userId);

    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);

      setEmail(user.email);

      setRole(user.role);
    }

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("User updated successfully");

      navigate("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated, id, user]);

  const submitHandler = (e) => {
    // e.preventDefault();
    Swal.fire({
      title: "Update User",
      icon: "info",
      text: "Do you want to update this user?",
      confirmButtonText: "Update",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        formData.set("name", name);

        formData.set("email", email);

        formData.set("role", role);

        dispatch(updateUser(user._id, formData));
      }
    });

    
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />

      <MDBRow>
        <MDBCol className="col-12 col-md-2">
          <Sidebar />
        </MDBCol>

          <MDBCol className="d-flex justify-content-center">
              <div className="col-12 col-lg-6">
                <div className="shadow-lg rounded-8 p-3">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <h1 className="mt-2 mb-5">Update User</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>

                    <input
                      {...register("name")}
                      type="name"
                      id="name_field"
                      className={`form-control m-0 ${
                        errors.productId ? "is-invalid" : ""
                      }`}
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <p className="text-danger">{errors.name?.message}</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>

                    <input
                      {...register("email")}
                      type="email"
                      id="email_field"
                      className={`form-control m-0 ${
                        errors.productId ? "is-invalid" : ""
                      }`}
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-danger">{errors.email?.message}</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="role_field">Select Role</label>

                    <select
                      {...register("role")}
                      id="role_field"
                      className={`form-control m-0 ${
                        errors.productId ? "is-invalid" : ""
                      }`}
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">user</option>

                      <option value="admin">admin</option>
                    </select>
                    <p className="text-danger">{errors.role?.message}</p>
                  </div>

                  <MDBBtn
                    type="submit"
                    className="btn btn-primary btn-block mt-4 mb-3"
                  >
                    Update
                  </MDBBtn>
                </form>
                </div>
              </div>
          </MDBCol>
      </MDBRow>
    </Fragment>
  );
};

export default UpdateUser;
