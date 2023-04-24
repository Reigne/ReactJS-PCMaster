import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { allUsers, clearErrors, deleteUser } from "../../actions/userActions";

import { DELETE_USER_RESET } from "../../constants/userConstants";

import { MDBBadge } from 'mdb-react-ui-kit';

import Swal from "sweetalert2";

const UsersList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);

  const { isDeleted } = useSelector((state) => state.user);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("User deleted successfully");
      // alert.success('User deleted successfully');

      navigate("/admin/users");

      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);
  //   }, [dispatch, alert, error, navigate]);


  const deleteUserHandler = (id) => {
    Swal.fire({
      title: "Delete User",
      icon: "warning",
      text: "Do you want to delete this user?",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
      }
    });
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",

          field: "id",

          sort: "asc",
        },

        {
          label: "Name",

          field: "name",

          sort: "asc",
        },

        {
          label: "Email",

          field: "email",

          sort: "asc",
        },

        {
          label: "Role",

          field: "role",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",
        },
      ],

      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role &&
        String(user.role).includes("admin") ? (
          <MDBBadge pill color='primary' light className="text-uppercase">
            {user.role}
          </MDBBadge>
          // <p style={{ color: "green" }} className="bg-transparent">{order.orderStatus}</p>
        ) : (
          <MDBBadge pill color='success' light className="text-uppercase">
            {user.role}
          </MDBBadge>

        ),

        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil bg-primary"></i>
            </Link>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash bg-danger"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Users"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-3">Manage Users</h1>

            <div className="shadow-lg p-4 mr-4 rounded-7">
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setUsers()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              )}
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
