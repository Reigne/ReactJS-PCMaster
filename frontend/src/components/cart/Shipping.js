import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Shipping = () => {
  const countriesList = Object.values(countries);
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const schema = yup.object({
    address: yup
      .string()
      .required("Address is required"),
    city: yup
      .string()
      .required("City is required"),
    postalCode: yup
      .number()
      .typeError("Postal Code must be a numeric")
      .required('Postal Code is required'),
    phoneNo: yup
    .number()
      .typeError("Phone Number must be a numeric")
      .required('Phone number is required'),
    country: yup
      .string()
      .required('Please select valid country')  
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (e) => {
    // e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));

    navigate("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />
      <CheckoutSteps/>
      <MDBContainer className="container-sm d-flex justify-content-center mt-5">
        <MDBCol className="col-10 col-lg-7">
        <form className="p-5 shadow-lg rounded-9" onSubmit={handleSubmit(submitHandler)}>
          <h1 className="mb-5 text-center">Shipping Information</h1>

          <label htmlFor="address_field">Address<label className="text-danger">*</label></label>

          <input
          {...register("address")}
            type="text"
            id="address_field"
            className={`form-control m-0 ${
              errors.address ? "is-invalid" : ""
            }`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="type your address here..."
          />
          <p className="text-danger">{errors.address?.message}</p>

          <MDBRow className="mb-4">
            <MDBCol>
              <label htmlFor="city_field">City<label className="text-danger">*</label></label>
              <input
              {...register("city")}
                type="text"
                id="city_field"
                className={`form-control m-0 ${
                  errors.city ? "is-invalid" : ""
                }`}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <p className="text-danger">{errors.city?.message}</p>
            </MDBCol>
            <MDBCol>
            <label htmlFor="postal_code_field">Postal Code<label className="text-danger">*</label></label>

            <input
            {...register("postalCode")}
              type="number"
              id="postal_code_field"
              className={`form-control m-0 ${
                errors.postalCode ? "is-invalid" : ""
              }`}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <p className="text-danger">{errors.postalCode?.message}</p>
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol>
            <label htmlFor="country_field">Country<label className="text-danger">*</label></label>

            <select
            {...register("country")}
              id="country_field"
              className={`form-control m-0 ${
                errors.country ? "is-invalid" : ""
              }`}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countriesList.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <p className="text-danger">{errors.country?.message}</p>
            </MDBCol>
            <MDBCol>
              <label htmlFor="phone_field">Phone No<label className="text-danger">*</label></label>

              <input
              {...register("phoneNo")}
                type="phone"
                id="phone_field"
                className={`form-control m-0 ${
                  errors.phoneNo ? "is-invalid" : ""
                }`}
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <p className="text-danger">{errors.phoneNo?.message}</p>
            </MDBCol>
          </MDBRow>

          <MDBBtn className="mb-4" id="shipping_btn"
              type="submit" block>
            Next
          </MDBBtn>
        </form>
        </MDBCol>
      </MDBContainer>
    </Fragment>
  );
};

export default Shipping;
