import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  let navigate = useNavigate();

  // Calculate Order Prices

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 25;

  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));

  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),

      shippingPrice,

      taxPrice,

      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <MDBContainer>
        <MDBRow>
          <MDBCol className="mt-5">
            <MDBCol>
              <div className="shadow-5 p-4 rounded-8">
                <h4 className="mb-3 mt-3 text-primary">Shipping Information</h4>

                <p>
                  <b>Name:</b> {user && user.name}
                </p>

                <p>
                  <b>Phone:</b> {shippingInfo.phoneNo}
                </p>

                <p className="">
                  <b>Address:</b>{" "}
                  {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
                </p>
              </div>
            </MDBCol>
            <MDBCol>
              <div className="shadow-5 p-4 rounded-8 mt-4">
                <h3 className="mt-2 text-primary">Cart Items</h3>

                <div className="cart-item my-1 mt-3">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <p>
                        <b>Image</b>
                      </p>
                    </div>

                    <div className="col-5 col-lg-6">
                      <p>
                        <b>Product Name</b>
                      </p>
                    </div>

                    <div className="col-1 col-lg-2">
                      <p>
                        <b>Quantity</b>
                      </p>
                    </div>

                    <div className="col-2 col-lg-1">
                      <p>
                        <b>Price</b>
                      </p>
                    </div>

                    <div className="col-2 col-lg-1">
                      <p>
                        <b>Total</b>
                      </p>
                    </div>
                  </div>
                </div>

                {cartItems.map((item) => (
                  <Fragment key={item.product}>
                    <hr />
                    <div className="cart-item my-1">
                      <div className="row">
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt="Laptop"
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-6">
                          <Link to={`/product/${item.product}`}>
                            <p>{item.name}</p>
                          </Link>
                        </div>

                        <div className="col-1 col-lg-2">
                          <p>{item.quantity}</p>
                        </div>

                        <div className="col-2 col-lg-1">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-2 col-lg-1">
                          <p >${(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}

                <hr />

                <div className="row">
                  <div className="col-12 col-lg-8">
                  </div>
                  <div className="col-12 col-lg-4">
                    <div>

                    <p className="float-start">
                      <b>Total:</b>
                    </p>
                    <p className="text-danger float-end">
                      <b>
                        $
                        {cartItems
                          .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toFixed(2)}
                      </b>
                    </p>
                    </div>

                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBCol>

          <MDBCol className="col-12 col-lg-3 my-4">
            <div
              className="shadow-5 p-4 rounded-8"
              id="order_summary"
              style={{ position: "sticky", top: "0" }}
            >
              <h4>Order Summary</h4>

              <hr />

              <p>
                <b>
                Subtotal:{" "}
                </b>
                <span className="order-summary-values float-end mr-3">${itemsPrice.toFixed(2)}</span>
              </p>

              <p>
                <b>
                Shipping:{" "}
                </b>
                <span className="order-summary-values float-end mr-3">${shippingPrice.toFixed(2)}</span>
              </p>

              <p>
                <b>
                Tax: 
                </b>
                <span className="order-summary-values float-end mr-3"> ${taxPrice.toFixed(2)}</span>
              </p>

              <hr />

              <p>
                <b>
                Total:{" "}
                </b>
                <span className="order-summary-values text-danger float-end mr-3"><b>${totalPrice}</b></span>
              </p>

              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </MDBCol>

        </MDBRow>
      </MDBContainer>
    </Fragment>
  );
};

export default ConfirmOrder;
