import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";

import CheckoutSteps from "./CheckoutSteps";

// import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from "react-redux";

import { createOrder, clearErrors } from "../../actions/orderActions";

import { clearCart } from "../../actions/cartActions";

import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Payment = () => {

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const { error } = useSelector((state) => state.newOrder);

  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const schema = yup.object({
    cardNum: yup
      .number()
      .typeError("Card number must be numeric")
      .required("Card Number is required"),
    cardExp: yup
      .number()
      .typeError("Card Expiration date must be numeric")
      .required("Card Expiration date is required"),
    cardCvc: yup
      .number()
      .typeError("Card CVC must be a numeric")
      .required("Card CVC is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const order = {
    orderItems: cartItems,

    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;

    order.shippingPrice = orderInfo.shippingPrice;

    order.taxPrice = orderInfo.taxPrice;

    order.totalPrice = orderInfo.totalPrice;
  }

  const submitHandler = async (e) => {
    // e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    order.paymentInfo = {
      id: "pi_1DpdYh2eZvKYlo2CYIynhU32",

      status: "succeeded",
    };

    dispatch(createOrder(order));
    dispatch(clearCart());

    navigate("/success");
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />

      <CheckoutSteps shipping confirmOrder payment />

      <MDBContainer className="mt-5">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol className="col-10 col-lg-7">
            <div>
              <form
                className="shadow-lg rounded-8 p-5"
                onSubmit={handleSubmit(submitHandler)}
              >
                <h1 className="mb-4 mt-3 text-center">Card Information</h1>

                <div className="form-group">
                  <label htmlFor="card_num_field">
                    Card Number<label className="text-danger">*</label>
                  </label>

                  <input
                    {...register("cardNum")}
                    type="text"
                    id="card_num_field"
                    className={`form-control m-0 ${
                      errors.cardNum ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setCardNum(e.target.value)}
                    value={cardNum}
                  />
                  <p className="text-danger">{errors.cardNum?.message}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="card_exp_field">
                    Card Expiry<label className="text-danger">*</label>
                  </label>

                  <input
                    {...register("cardExp")}
                    type="text"
                    id="card_exp_field"
                    className={`form-control m-0 ${
                      errors.cardExp ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setCardExp(e.target.value)}
                    value={cardExp}
                  />
                  <p className="text-danger">{errors.cardExp?.message}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="card_cvc_field">
                    Card CVC<label className="text-danger">*</label>
                  </label>

                  <input
                    {...register("cardCvc")}
                    type="text"
                    id="card_cvc_field"
                    className={`form-control m-0 ${
                      errors.cardCvc ? "is-invalid" : ""
                    }`}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                  />
                  <p className="text-danger">{errors.cardCvc?.message}</p>
                </div>

                <MDBBtn
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay {` - $${orderInfo && orderInfo.totalPrice}`}
                </MDBBtn>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Fragment>
  );
};

export default Payment;
