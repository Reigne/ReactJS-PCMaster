import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import {
  allOrders,
  clearErrors,
  deleteOrder,
  getOrderDetails,
} from "../../actions/orderActions";

import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

import { MDBBadge } from "mdb-react-ui-kit";

import Swal from "sweetalert2";

const OrdersList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  const { isDeleted } = useSelector((state) => state.order);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const deleteOrderHandler = (id) => {
    Swal.fire({
      title: "Delete Order",
      icon: "warning", 
      text: "Do you want to delete this order?",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOrder(id));
      }
    });
  };

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("Order deleted successfully");

      navigate("/admin/orders");

      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);
  //   [dispatch, error, navigate]);
  //     dispatch(getOrderDetails(orderId));

  //     if (error) {
  //       errMsg(error);

  //       dispatch(clearErrors());
  //     }

  //     if (isUpdated) {
  //       successMsg("Order updated successfully");

  //       dispatch({ type: UPDATE_ORDER_RESET });
  //     }
  //   }, [dispatch, error, isUpdated, orderId]);

  // const deleteOrderHandler = (id) => {
  //   dispatch(deleteOrder(id));
  // };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",

          field: "id",

          sort: "asc",
        },

        {
          label: "No of Items",

          field: "numofItems",

          sort: "asc",
        },

        {
          label: "Amount",

          field: "amount",

          sort: "asc",
        },

        {
          label: "Status",

          field: "status",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",
        },
      ],

      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,

        numofItems: order.orderItems.length,

        amount: `$${order.totalPrice}`,

        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <MDBBadge pill color="success" light>
              {order.orderStatus}
            </MDBBadge>
          ) : (
            // <p style={{ color: "green" }} className="bg-transparent">{order.orderStatus}</p>
            <MDBBadge pill color="danger" light>
              {order.orderStatus}
            </MDBBadge>
          ),

        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye bg-primary"></i>
            </Link>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="fa fa-trash text bg-danger"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-3">Manage Orders</h1>
            <div className="shadow-lg p-4 mr-4 rounded-7">
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setOrders()}
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

export default OrdersList;
