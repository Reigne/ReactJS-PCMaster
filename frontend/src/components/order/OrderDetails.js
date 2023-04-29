import React, { useRef, Fragment, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

// import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import { getOrderDetails, clearErrors } from "../../actions/orderActions";

import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const OrderDetails = () => {
  //   const alert = useAlert();

  const dispatch = useDispatch();

  const pdfExportComponent = useRef(null);

  const contentArea = useRef(null);

  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  let { id } = useParams();

  const handleExportPdf = (event) => {
    const fileName = `Receipt-Order-${order._id}.pdf`;
    savePDF(contentArea.current, {
      paperSize: "A4",
      scale: 0.6,
      margin: "2cm",
      fileName,
    });
  };

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      //   alert.error(error);

      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MDBContainer className="">
            <MDBRow>
              <MDBCol size="9" className="col-12 col-lg-9">
                <MDBCol className="p-4 shadow-5 rounded-7 my-3">
                  <h1 className="">Order # {order._id}</h1>
                  <hr />
                  <h4 className="mb-3 text-primary">Shipping Information</h4>
                  <MDBRow tag="dl">
                    <MDBCol tag="dt" sm="2">
                      Name:
                    </MDBCol>
                    <MDBCol tag="dd" sm="9">
                      {user && user.name}
                    </MDBCol>
                    <MDBCol tag="dt" sm="2">
                      Phone#:
                    </MDBCol>
                    <MDBCol tag="dd" sm="9">
                      {shippingInfo && shippingInfo.phoneNo}
                    </MDBCol>
                    <MDBCol tag="dt" sm="2">
                      Address:
                    </MDBCol>
                    <MDBCol tag="dd" sm="9">
                      {shippingDetails}
                    </MDBCol>
                    <MDBCol tag="dt" sm="2">
                      Amount:
                    </MDBCol>
                    <MDBCol tag="dd" sm="9">
                      ${totalPrice}
                    </MDBCol>
                    <MDBCol tag="dt" sm="2">
                      Order Placed:
                    </MDBCol>
                    <MDBCol tag="dd" sm="9">
                    {order.createdAt && `${String(order.createdAt).substring(0, 10)} ${String(order.createdAt).split('T')[1]?.substring(0, 5)}`}


                    </MDBCol>
                    
                  </MDBRow>
                </MDBCol>
                <MDBCol className="p-4 shadow-5 rounded-7 my-3">
                  <h4 className="text-primary">In the Package:</h4>

                  <div className="cart-item pr-4">
                    <div className="row my-3">
                      <div className="col-4 col-lg-2">
                        <h6>Image</h6>
                      </div>
                      <div className="col-5 col-lg-5">
                        <h6>Name</h6>
                      </div>
                      <div className="col-4 col-lg-2">
                        <h6>Price</h6>
                      </div>
                      <div className="col-4 col-lg-2">
                        <h6>Quantity</h6>
                      </div>
                      <div className="col-4 col-lg-1">
                        <h6>Total</h6>
                      </div>
                    </div>
                    <hr />
                    {orderItems &&
                      orderItems.map((item) => (
                        <div key={item.product} className="row">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/product/${item.product}`}>
                              <h6>{item.name}</h6>
                            </Link>
                            <p className="text-muted">
                              Product ID: {item.product}
                            </p>
                          </div>

                          <div className="col-4 col-lg-2">
                            <p>${item.price}</p>
                          </div>

                          <div className="col-4 col-lg-2 ">
                            <p>{item.quantity}</p>
                          </div>

                          <div className="col-4 col-lg-1 ">
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <hr />
                        </div>
                      ))}

                    <div className="row my-3">
                      <div className="text-end">
                        <h5>
                          Total:&nbsp;
                          <h5 className="text-danger float-end">
                            $
                            {orderItems && orderItems.length > 0 && orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}

                          </h5>
                        </h5>
                        <p className="text-muted small">tax is not included*</p>
                      </div>
                    </div>
                  </div>
                </MDBCol>
                <MDBCol className="col-12 shadow-5 rounded-8 p-3 my-3" >
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

              <MDBCol className="col-12 col-lg-3 my-3">
                <div className="shadow-5 p-4 rounded-9"
                  style={{ position: "sticky", top: "0" }}>
                  
                <h4 className="mt-2">Payment</h4>

                <p className={isPaid ? "text-success" : "text-danger"}>
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>
                
                <hr/>
                <h4 className="mt-2">Order Status:</h4>
                <p className="float-start"><b>Status</b>:&nbsp;</p>
                <p
                  className={
                    order.orderStatus &&
                    String(order.orderStatus).includes("Delivered")
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {orderStatus}
                </p>

                <p className="float-start"><b>Delivered At</b>:&nbsp;</p>
                <p
                  className={
                    order.orderStatus &&
                    String(order.orderStatus).includes("Delivered")
                      ? ""
                      : ""
                  }
                >
                  {order.deliveredAt && `${String(order.deliveredAt).substring(0, 10)} ${String(order.deliveredAt).split('T')[1]?.substring(0, 5)}`}
                </p>

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
            </MDBRow>
          </MDBContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
