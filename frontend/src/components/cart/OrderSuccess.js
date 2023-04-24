import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";

import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
const OrderSuccess = () => {
  sessionStorage.clear();
  localStorage.clear();
  return (
    <Fragment>
      <MetaData title={"Order Success"} />

      <MDBContainer>
        <div className="shadow-5 rounded-9 p-5">
          <div className="row justify-content-center">
            <div className="col-9 text-center">
              <img
                className="my-5 img-fluid d-block mx-auto"
                src="/images/check-out.png"
                alt="Order Success"
                width="200"
                height="200"
              />

              <h2>You have successfully placed an order with us.</h2>
              <p className="text-muted">Congratulations on placing your order! We are pleased to inform you that your order has been successfully placed and is currently being processed. Our team is working diligently to ensure that your order is prepared and shipped in a timely manner.</p>
              <Link to="/orders/me">Go to Orders</Link>
            </div>
          </div>
        </div>
      </MDBContainer>
    </Fragment>
  );
};

export default OrderSuccess;
