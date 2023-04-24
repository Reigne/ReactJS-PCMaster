import React, { Fragment, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import Toast from "../layout/Toast";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'
import {
  getProductReviews,
  clearErrors,
  deleteReview,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

import { MDBContainer } from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ProductReviews = () => {
  const schema = yup.object({
    productId: yup
      .string()
      .min(24, "Product i.d must be 24 characters")
      .required("Product i.d is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    
    if (error) {
      Toast("error fetching reviews", "error");
      dispatch(clearErrors());
    }

    if (deleteError) {
      Toast(deleteError, "error");
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      Toast("Review deleted successfully", "success");
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    // }, [dispatch, alert, error, productId, isDeleted, deleteError])
  }, [dispatch, error, productId, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    Swal.fire({
      title: "Delete Review",
      icon: "warning",
      text: "Do you want to delete this review?",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(id, productId));
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className="fa fa-trash bg-danger"></i>
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Product Reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <div className="shadow-lg p-4 rounded-7">
                  <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="form-group">
                      <label htmlFor="productId_field">Enter Product ID</label>
                      <input
                        {...register("productId")}
                        type="text"
                        id="productId_field"
                        className={`form-control m-0 ${
                          errors.productId ? "is-invalid" : ""
                        }`}
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                      />
                      <p className="text-danger">{errors.productId?.message}</p>
                    </div>
                    <button
                      id="search_button"
                      type="submit"
                      className="btn btn-primary btn-block py-2"
                    >
                      SEARCH
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="shadow-lg p-4 mr-4 rounded-7 mt-4">
              {reviews && reviews.length > 0 ? (
                <MDBDataTable
                  data={setReviews()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              ) : (
                <MDBContainer>
                  <div className="row justify-content-center">
                    <div className="col-9 text-center">
                      <img
                        className="my-5 img-fluid d-block mx-auto"
                        src="/images/no-results.png"
                        alt="Cart Empty"
                        width="200"
                        height="200"
                      />

                      <h2 className="text-danger">No Reviews Found</h2>
                      <p className="text-muted">
                        It seems that there are currently no reviews available
                        for this product.
                      </p>
                    </div>
                  </div>
                </MDBContainer>
              )}
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
