import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";

import { myOrders, clearErrors } from "../../actions/orderActions";

import { MDBBadge } from 'mdb-react-ui-kit';

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",

          field: "id",

          sort: "asc",
        },

        {
          label: "Num of Items",

          field: "numOfItems",

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

          sort: "asc",
        },
      ],

      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,

        numOfItems: order.orderItems.length,

        amount: `$${order.totalPrice}`,

        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <MDBBadge pill color='success' light>
              {order.orderStatus}
            </MDBBadge>
          ) : (
            <MDBBadge pill color='danger' light>
              {order.orderStatus}
            </MDBBadge>
 
          ),

        actions: (
          <Link to={`/order/${order._id}`}>
            <a className="btn btn-primary">
              <i className="fa fa-eye bg-primary text-white"></i>
              </a>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"My Orders"} />

      <div className="container p-5">
        <div className="shadow-5 rounded-9 p-5">
          <h1 className="mb-3">My Orders</h1>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
              className="px-3"
              bordered
              hover
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ListOrders;
