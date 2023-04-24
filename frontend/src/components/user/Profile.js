import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBRipple,
} from "mdb-react-ui-kit";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />

          <MDBContainer className="mt-5">
            <MDBRow className="gap-2">
              
              <MDBCol className="col-5 col-lg-3">

                <div className="shadow-5 rounded-8 p-4 text-center">
              <h2 className="mt-3 mb-3 text-center">My Profile</h2>

                  <MDBRipple rippleTag="a">
                    <img
                      className="rounded-circle img-fluid shadow-5"
                      src={user.avatar.url}
                      alt={user.name}
                    />
                  </MDBRipple>
                  <h5 className="mt-3 text-capitalize text-muted">
                    {user.role}
                  </h5>
                  <hr/>
                  {user.role !== "admin" && (
                    <Link
                      to="/orders/me"
                      className="btn btn-primary btn-block mt-3"
                    >
                      My Orders
                    </Link>
                  )}
                </div>
              </MDBCol>
              <MDBCol className="col-12 col-lg-8">
                <MDBCol>
                  <div className="shadow-5 rounded-8 p-4">
                    <h2 className="mt-2 mb-3">Personal Information</h2>
                    <MDBRow tag="dl">
                      <MDBCol tag="dt" sm="3">
                        Name:
                      </MDBCol>
                      <MDBCol tag="dd" sm="9">
                        {user.name}
                      </MDBCol>
                      <MDBCol tag="dt" sm="3">
                        Email:
                      </MDBCol>
                      <MDBCol tag="dd" sm="9">
                        {user.email}
                      </MDBCol>
                      <MDBCol tag="dt" sm="3">
                        Created At:
                      </MDBCol>
                      <MDBCol tag="dd" sm="9">
                        {String(user.createdAt).substring(0, 10)}
                      </MDBCol>
                    </MDBRow>
                    <Link
                      to="/me/update"
                      id="edit_profile"
                      className="btn btn-primary btn-block"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </MDBCol>

                <MDBCol className="mt-3">
                  <div className="shadow-5 rounded-8 p-4">
                    <h2 className="mt-1 mb-3">Password</h2>
                    <p class="text-sm mb-0">
                      You can change your password here.
                    </p>
                    <Link
                      to="/password/update"
                      className="btn btn-danger btn-block mt-3"
                    >
                      Change Password
                    </Link>
                  </div>
                </MDBCol>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          {/* <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user.name}
                />
              </figure>

              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>

              <p>{user.name}</p>

              <h4>Email Address</h4>

              <p>{user.email}</p>

              <h4>Joined On</h4>

              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
