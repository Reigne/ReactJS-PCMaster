import React from "react";
import { Link } from "react-router-dom";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
const CheckoutSteps = ({
  shipping,
  confirmOrder,
  payment,
  // , confirmOrder, payment
}) => {
  return (
    <MDBContainer className="d-flex justify-content-center">
      <div className="checkout-progress col-10 col-lg-10 mt-5 mb-3">
        <div className="position-relative" style={{ width: "100%" }}>
          <div className="progress" style={{ height: "1px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "100%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          {shipping ? (
            <Link to="/shipping" className="float-right">
              <MDBBtn
                color="primary"
                size="sm"
                className="position-absolute top-0 start-0 translate-middle rounded-pill"
              >
                Shipping
              </MDBBtn>
            </Link>
          ) : (
            <Link to="#!" disabled>
              <MDBBtn
                color="primary"
                size="sm"
                className="position-absolute top-0 start-0 translate-middle rounded-pill"
              >
                Shipping
              </MDBBtn>
            </Link>
          )}
          {confirmOrder ? (
            <Link to="/confirm" className="float-right">
              <MDBBtn
                color="primary"
                size="sm"
                className="position-absolute top-0 start-50 translate-middle rounded-pill"
              >
                Confirm Order
              </MDBBtn>

            </Link>
          ) : (
            <Link to="#!" disabled>
              <MDBBtn
                color="secondary"
                size="sm"
                className="position-absolute top-0 start-50 translate-middle rounded-pill"
              >
                Confirm Order
              </MDBBtn>

            </Link>
          )}

          {/* <div className='triangle2-incomplete'></div>

      <div className='step incomplete'>Confirm Order</div>

      <div className='triangle-incomplete'></div> */}

          {payment ? (
            <Link to="/payment" className="float-right">
              <MDBBtn
                color="primary"
                size="sm"
                className="position-absolute top-0 start-100 translate-middle rounded-pill"
              >
                Payment
              </MDBBtn>

          
            </Link>
          ) : (
            <Link to="#!" disabled>
              <MDBBtn
                color="secondary"
                size="sm"
                className="position-absolute top-0 start-100 translate-middle rounded-pill"
              >
                Payment
              </MDBBtn>

            </Link>
          )}

          {/* 
      <div className='triangle2-incomplete'></div>

      <div className='step incomplete'>Payment</div>

      <div className='triangle-incomplete'></div> */}
        </div>
      </div>
    </MDBContainer>
  );
};

export default CheckoutSteps;
