import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import {
  MDBBtn,
  MDBContainer,
  MDBCol,
} from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UpdateProfile = () => {
  const [name, setName] = useState("No available name");

  const [email, setEmail] = useState("example@email.com");

  const [avatar, setAvatar] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { error, isUpdated, loading } = useSelector((state) => state.user);
  

  const schema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    name: yup
      .string()
      .required("Name is required")
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
    console.log(isUpdated);

    if (user) {
      setName(user.name);

      setEmail(user.email);

      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      notify(error);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      success("User updated successfully");

      dispatch(loadUser());

      navigate("/me", { replace: true });

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  const submitHandler = (e) => {
    // e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);

    formData.set("email", email);

    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);

        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />

      <MDBContainer className="mt-5">
        <div className="d-flex justify-content-center">
          <MDBCol className="shadow-lg p-4 rounded-8 col-sm-6">
          <form
            className=""
            onSubmit={handleSubmit(submitHandler)}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5 text-center"><b>Update Profile</b></h1>

            <div className="form-group">
              <label htmlFor="email_field"><b>Name</b></label>

              <input
                {...register("name")}
                type="name"
                id="name_field"
                className={`form-control m-0 ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-danger">{errors.name?.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="email_field"><b>Email</b></label>

              <input
               {...register("email")}
                type="text"
                id="email_field"
                className={`form-control m-0 ${errors.email ? "is-invalid" : ""}`}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload"><b>Avatar</b></label>

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
                    accept="image/*"
                    onChange={onChange}
                  />

                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
            <hr/>
            <MDBBtn
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading ? true : false}
            >
              Update
            </MDBBtn>
          </form>
          </MDBCol>
        </div>

      </MDBContainer>
    </Fragment>
  );
};

export default UpdateProfile;
