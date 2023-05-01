import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

// import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";

import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/productActions";

import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import Swal from "sweetalert2";

import Toast from "../layout/Toast";

const ProductsList = () => {
  //   const alert = useAlert();

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      //   alert.error(error);
      Toast((error), "danger");
      dispatch(clearErrors());
    }

    if (deleteError) {
      // alert.error(deleteError);
      Toast((deleteError), "danger");

      dispatch(clearErrors());
    }

    if (isDeleted) {
      Toast("Product deleted successfully", "success");

      navigate("/admin/products");

      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  },  [dispatch, error, deleteError, isDeleted, navigate]);
  // [dispatch, error, isDeleted, deleteError, navigate]);

 

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",

          field: "id",

          sort: "asc",
        },

        {
          label: "Name",

          field: "name",

          sort: "asc",
        },

        {
          label: "Price",

          field: "price",

          sort: "asc",
        },

        {
          label: "Stock",

          field: "stock",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",
        },
      ],

      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,

        name: product.name,

        price: `$${product.price}`,

        stock: product.stock,

        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil bg-primary"></i>
            </Link>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash bg-danger"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    Swal.fire({
      title: "Delete Product",
      icon: "warning",
      text: "Do you want to delete this product?",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
      }
    });
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-3">Manage Product</h1>
            
            <div className="shadow-lg p-4 mr-4 rounded-7">

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
