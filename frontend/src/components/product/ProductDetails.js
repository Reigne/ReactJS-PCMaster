import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import React, { Fragment, useState, useEffect } from "react";
import ListReviews from "../review/ListReviews";

// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../actions/cartActions";

import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBRipple,
  MDBCardHeader,
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const ProductDetails = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  let { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  useEffect(() => {
    dispatch(getProductDetails(id));
    if (error) {
      notify(error);
      dispatch(success());
    }
    //useeffect
    if (reviewError) {
      notify(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      // alert.success("Reivew posted successfully");
      successMsg("Reivew posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, reviewError, success, id]);
  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };
  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
    // alert.success('Item Added to Cart')
  };
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const reviewHandler = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);
    dispatch(newReview(formData));
  };
  function setUserRatings() {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.starValue = index + 1;
      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });
    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }
        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="container">
            <MDBRow>
              <MDBCol className="col-12 col-lg-5">
                <Carousel
                  className="bg-image hover-overlay p-2 rounded-5 shadow-5"
                  delay={1000}
                  pause="hover"
                  // showControls={product.images.length > 1}
                >
                  {product.images &&
                    product.images.map((image) => (
                      <Carousel.Item key={image.public_id}>
                        <MDBCardImage
                          className="rounded-5 d-block w-100"
                          src={image.url}
                          alt={product.title}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </MDBCol>
              <MDBCol className="col-12 col-lg-7">
                <div
                  className="shadow-5 rounded-9 p-4"
                  style={{
                    maxHeight: "530px",
                    height: "530px",
                    margin: "0 auto",
                  }}
                >
                  {/* <div className="d-flex align-items-center"> */}
                  <h3 className="m-0">{product.name}</h3>
                  {/* <p className="mb-0 ml-2 text-danger">
                      {product.stock} Items left
                    </p> */}
                  {/* </div> */}

                  <p id="product_id">Product # {product._id}</p>

                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      style={{ width: `${(product.ratings / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span id="no_of_reviews">
                    {" "}
                    ({product.numOfReviews} Reviews)
                  </span>
                  {/* <p id="product_price">${product.price}</p> */}
                  <MDBRow>
                    <MDBCol>
                      <h2 className="text-warning">
                        ${product.price ? product.price.toFixed(2) : ""}
                      </h2>
                      <p className="text-danger">
                        <b className="text-black">Stock: </b>
                        {product.stock} Items left
                      </p>
                    </MDBCol>
                    <MDBCol>
                      <h5>Seller:</h5>
                      <p>{product.seller}</p>
                    </MDBCol>
                  </MDBRow>

                  <div className="">
                    <div></div>
                    <span
                      className="btn btn-danger minus mr-2"
                      onClick={decreaseQty}
                    >
                      -
                    </span>
                    <input
                      type="number"
                      className="form-control count d-inline px-2 py-1 w-25 mr-2"
                      value={quantity}
                      readOnly
                    />
                    <span
                      className="btn btn-primary plus"
                      onClick={increaseQty}
                    >
                      +
                    </span>
                    <button
                      type="button"
                      id="cart_btn"
                      className="btn btn-success d-inline ml-4"
                      disabled={product.stock === 0}
                      onClick={addToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <hr />
                  <div className="d-flex align-items-center">
                    <p className="mr-5">
                      <b>Brand:</b> {product.brand}
                    </p>
                    <p>
                      <b>Category:</b> {product.category}
                    </p>
                  </div>
                  <MDBRow
                    style={{
                      maxHeight: "150px",
                      height: "auto",
                      overflow: "auto",
                    }}
                  >
                    <MDBCol>
                      <h5>Description:</h5>
                      <p>{product.description}</p>
                    </MDBCol>
                  </MDBRow>
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <div className="container-fluid mt-4">
                <div className="px-5 py-3 shadow-5 rounded-5">
                  <div className="">
                    {user ? (
                      <button
                        id="review_btn"
                        type="button"
                        className="btn btn-primary mt-4 float-end"
                        data-toggle="modal"
                        data-target="#ratingModal"
                        onClick={setUserRatings}
                      >
                        Submit Your Review
                      </button>
                    ) : (
                      <div className="alert alert-danger mt-5" type="alert">
                        Login to post your review.
                      </div>
                    )}
                    {product.reviews && product.reviews.length > 0 && (
                      <ListReviews reviews={product.reviews} />
                    )}
                  </div>
                </div>
              </div>
            </MDBRow>

            <div className="row mt-2 mb-5">
              <div className="rating w-50">
                <div
                  className="modal fade"
                  id="ratingModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="ratingModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3 className="modal-title" id="ratingModalLabel">
                          Review
                        </h3>
                      </div>
                      <div className="modal-body">
                        <ul className="stars justify-content-center">
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>

                        <textarea
                          name="review"
                          id="review"
                          className="form-control mt-3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Insert your review here..."
                        ></textarea>

                        <MDBBtn 
                          type="button"
                          className="btn my-4 float-right"
                          data-dismiss="modal"
                          aria-label="Close"
                          color='secondary'>
                          Close
                        </MDBBtn>
                        <MDBBtn
                          className="float-right mr-2 my-4"
                          onClick={reviewHandler}
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          Submit
                        </MDBBtn>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;
