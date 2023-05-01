import React, { useRef, Fragment, useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";

import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import Swal from "sweetalert2";

const ProcessOrder = () => {
  const dispatch = useDispatch();

  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);

  let { id } = useParams();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;
  const [status, setStatus] = useState("");

  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = id;

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const handleExportPdf = (event) => {
    savePDF(contentArea.current, {
      paperSize: "A4",
      scale: 0.6,
      margin: "2cm",
    });
  };

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("Order updated successfully");

      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, orderId]);

  const updateOrderHandler = (id) => {
    Swal.fire({
      title: "Update Order Status",
      icon: "info",
      text: "Do you want to update this order status?",
      confirmButtonText: "Update",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        formData.set("status", status);

        dispatch(updateOrder(id, formData));

        if (status === "Delivered") {
          // savePDF(contentArea.current, { paperSize: "A4" });
          pdfExportComponent.current.save();
        }
      }
    });
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={`Process Order # ${order && order._id}`} />

      <MDBRow>
        <MDBCol className="col-12 col-lg-2">
          <Sidebar />
        </MDBCol>

        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <>
              <MDBCol>
                <MDBCol>
                  <MDBCol className="col-12 shadow-5 rounded-8 p-3">
                    <div>
                      <h2 className="my-2">Order # {order._id}</h2>
                      <hr />
                      <h4 className="mb-4">Shipping Info</h4>

                      <p>
                        <b>Name:</b> {user && user.name}
                      </p>

                      <p>
                        <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                      </p>

                      <p className="mb-4">
                        <b>Address:</b>
                        {shippingDetails}
                      </p>

                      <p>
                        <b>Amount:</b> ${totalPrice}
                      </p>
                    </div>
                  </MDBCol>
                  <MDBCol className="col-12 shadow-5 rounded-8 p-3 my-3">
                    <h4 className="my-4">Payment</h4>

                    <p className={isPaid ? "greenColor" : "redColor"}>
                      <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                    </p>

                    <h4 className="my-4">Stripe ID</h4>

                    <p>
                      <b>{paymentInfo && paymentInfo.id}</b>
                    </p>

                    <h4 className="my-4">Order Status:</h4>

                    <p
                      className={
                        order.orderStatus &&
                        String(order.orderStatus).includes("Delivered")
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      <b>{orderStatus}</b>
                    </p>
                  </MDBCol>
                  <MDBCol className="col-12 shadow-5 rounded-8 p-3 my-3">
                    <h4 className="my-4">Order Items:</h4>
                    <div className="cart-item my-1">
                      <div className="row my-2">
                        <div className="col-4 col-lg-2">
                          <strong>Image</strong>
                        </div>
                        <div className="col-5 col-lg-4">
                          <strong>Name</strong>
                        </div>
                        <div className="col-4 col-lg-2">
                          <strong>Price</strong>
                        </div>
                        <div className="col-4 col-lg-2">
                          <strong>Quantity</strong>
                        </div>
                        <div className="col-4 col-lg-2">
                          <strong>Total</strong>
                        </div>
                      </div>
                      <hr />
                      {orderItems &&
                        orderItems.map((item) => (
                          <div key={item.product} className="row my-4">
                            <div className="col-4 col-lg-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                height="45"
                                width="65"
                              />
                            </div>
                            <div className="col-5 col-lg-4">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div className="col-4 col-lg-2 mt-2 mt-lg-0">
                              <p>${item.price}</p>
                            </div>
                            <div className="col-4 col-lg-2 mt-2 mt-lg-0">
                              <p>{item.quantity} Piece(s)</p>
                            </div>
                            <div className="col-4 col-lg-2 mt-2 mt-lg-0">
                              <p>${item.quantity * item.price}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-12 col-lg-10"></div>
                      <div className="col-12 col-lg-2">
                        <div>
                          <p className="float-start">
                            {" "}
                            <b>Total:&nbsp;</b>
                          </p>
                          <p className="text-danger">
                            <b>${totalPrice}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol className="col-12 shadow-5 rounded-8 p-3 my-3">
                    <PDFExport
                      ref={pdfExportComponent}
                      scale={0.6}
                      paperSize="A4"
                      margin="2cm"
                    >
                      <div className="container-sm" ref={contentArea}>
                        <div className="invoice">
                          <div className="invoice-header">
                            <div className="row">
                              <div className="col-12">
                                <h2 className="text-center">PC Master</h2>
                                <h5 className="text-center">Invoice</h5>
                                {/* <h4 className="text-center">Order #{order._id}</h4> */}
                                <hr />
                              </div>
                            </div>

                            <div className="row justify-content-between">
                              <h4>Order #{order._id}</h4>
                              <div className="col-12 col-lg-4 invoice-col">
                                <h5>Invoice Information</h5>
                                <p>
                                  <b>Order ID:</b> {order._id}
                                </p>
                                <p>
                                  <b>Date:</b>{" "}
                                  {String(order.createdAt).substring(0, 10)}
                                </p>
                                <p>
                                  <b>Total:</b> ${order.totalPrice}
                                </p>
                              </div>

                              <div className="col-12 col-lg-4 invoice-col">
                                <h5>Shipping Information</h5>
                                <p>
                                  <b>Name:</b> {user && user.name}
                                </p>
                                <p>
                                  <b>Phone:</b>{" "}
                                  {shippingInfo && shippingInfo.phoneNo}
                                </p>
                                <p className="mb-4">
                                  <b>Address:</b> {shippingDetails}
                                </p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <h5>Payment Details</h5>
                                <p>
                                  <b>Subtotal:</b> ${order.itemsPrice}
                                </p>
                                <p>
                                  <b>Shipping:</b> ${order.shippingPrice}
                                </p>
                                <p>
                                  <b>Tax:</b> ${order.taxPrice}
                                </p>
                                <p>
                                  <b>Total:</b> ${order.totalPrice}
                                </p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-12">
                                <h4>Order Items:</h4>
                                <table className="table table-bordered">
                                  <thead className="thead-light">
                                    <tr>
                                      <th>Image</th>
                                      <th>Name</th>
                                      <th>Price</th>
                                      <th>Quantity</th>
                                      <th>Total</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {orderItems &&
                                      orderItems.map((item) => (
                                        <tr key={item.product}>
                                          <td>
                                            <img
                                              src={item.image}
                                              alt={item.name}
                                              height="50"
                                              width="75"
                                            />
                                          </td>
                                          <td>{item.name}</td>
                                          <td>${item.price}</td>
                                          <td>{item.quantity}</td>
                                          <td>${item.price * item.quantity}</td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="invoice-footer"></div>
                          </div>
                        </div>
                      </div>
                    </PDFExport>
                  </MDBCol>
                </MDBCol>
              </MDBCol>
              <MDBCol className="col-12 col-lg-2 mx-3">
                <div
                  className="shadow-5 rounded-8 p-3"
                  style={{ position: "sticky", top: "0" }}
                >
                  <h4 className="my-3">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>

                      <option value="Shipped">Shipped</option>

                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateOrderHandler(order._id)}
                  >
                    Update Status
                  </button>
                  <PDFExport
                    ref={pdfExportComponent}
                    scale={0.6}
                    paperSize="A4"
                    margin="2cm"
                  >
                    <button
                      className="btn btn-warning mt-2 btn-block"
                      onClick={handleExportPdf}
                      disabled={orderStatus !== "Delivered"}
                    >
                      Generate Receipt
                    </button>
                  </PDFExport>
                </div>
              </MDBCol>
            </>
          )}
        </Fragment>
        <MDBRow></MDBRow>
      </MDBRow>
    </Fragment>
  );
};

export default ProcessOrder;
