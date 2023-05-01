import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";

import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
const UpdateProduct = () => {
  const [name, setName] = useState("Untitled Product");

  const [price, setPrice] = useState(0);

  const [description, setDescription] = useState("No description available.");

  const [category, setCategory] = useState("Uncategorized");

  const [brand, setBrand] = useState("Unknown Brand");

  const [stock, setStock] = useState(0);

  const [seller, setSeller] = useState("Unknown Seller");

  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Select category...",
    "Mouse",
    "Mouse",
    "KeyBoard",
    "Headset",
    "Microphone",
    "Headphones",
    "Central Processing Unit",
    "Graphics Processing Unit",
    "Motherboard",
    "Memory",
    "Storage",
    "Power Supply Unit",
    "Gaming Peripherals",
    "Uncategorized",
  ];

  const brands = [
    "Select brand...",
    "Logitech",
    "Razer",
    "Corsair",
    "HyperX",
    "SteelSeries",
    "Sennheiser",
    "Audio-Technica",
    "Blue Yeti",
    "Samson",
    "Intel",
    "AMD",
    "Nvidia",
    "ASUS",
    "Gigabyte",
    "MSI",
    "ASRock",
    "Crucial",
    "Kingston",
    "Samsung",
    "Western Digital",
    "Seagate",
    "EVGA",
    "Cooler Master",
    "Thermaltake",
    "NZXT",
    "RAIDMAX",
    "Rosewill",
    "G.Skill",
    "Patriot",
    "ADATA",
    "Redragon",
    "Cougar",
    "Unknown Brand",
  ];

  const dispatch = useDispatch();

  const schema = yup.object({
    name: yup
      .string()
      .max(100, "Product name must be at most 100 characters")
      .required("Name of the product is required"),
    price: yup
      .number()
      .typeError("Price must be a numeric")
      .min(0, "Price must be greater than zero.")
      .required("Price is required"),
    description: yup.string().required("Description is required"),
    category: yup
      .string()
      .notOneOf(["Select category..."], "Please select a valid category")
      .required("Category is required"),
    brand: yup
      .string()
      .notOneOf(["Select brand..."], "Please select a valid brand")
      .required("Brand is required"),
    stock: yup
      .number()
      .typeError("Stock must be a numeric")
      .min(0, "Stock must be greater than or equal to zero.")
      .required("Stock is required"),
    seller: yup.string().required("Seller name is required"),
    images: yup.mixed().required("Images are required"),
    // .test("fileCount", "Please upload at least 1 images", (value) => {
    //   return value && value.length > 0;
    // }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  let { id } = useParams();

  let navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const warningMsg = (message = "") =>
    toast.warning(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);

      setPrice(product.price);

      setDescription(product.description);

      setCategory(product.category);

      setBrand(product.brand);

      setSeller(product.seller);

      setStock(product.stock);

      setOldImages(product.images);
    }

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (updateError) {
      errMsg(updateError);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/products");

      successMsg("Product updated successfully");

      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, product, id]);

  const submitHandler = (e) => {
    Swal.fire({
      title: "Update Product",
      icon: "info",
      text: "Do you want to update this product?",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // e.preventDefault();
        console.log(errors);
        const formData = new FormData();

        formData.set("name", name);

        formData.set("price", price);

        formData.set("description", description);

        formData.set("category", category);

        formData.set("brand", brand);

        formData.set("stock", stock);

        formData.set("seller", seller);

        images.forEach((image) => {
          formData.append("images", image);
        });

        dispatch(updateProduct(product._id, formData));
      } else {
        warningMsg("Canceled update product");
      }
    });
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);

    setImages([]);

    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);

          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Update Product"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <form
              className=""
              onSubmit={handleSubmit(submitHandler)}
              encType="multipart/form-data"
            >
              <MDBRow>
                <MDBCol class="col-md-4 col-sm-12">
                  <h4>Product Update</h4>
                  {/* <p>
                    We’re constantly trying to express ourselves and actualize
                    our dreams. If you have the opportunity to play.
                  </p> */}
                </MDBCol>
                <MDBCol class="col-md-4 col-sm-12 text-right justify-content-center">
                  {/* <MDBBtn
                      id="login_button"
                      type="submit"
                      class="btn btn-success mb-0 ms-lg-auto me-lg-0 mt-2"
                      disabled={loading ? true : false}
                  >
                    Update
                  </MDBBtn> */}
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="col-md-4 col-sm-12">
                  <div className="shadow-5 rounded-7 p-3">
                    <h5>Upload Images</h5>

                    <div className="mb-3">
                      {oldImages &&
                        oldImages.map((img) => (
                          <img
                            key={img}
                            src={img.url}
                            alt={img.url}
                            className="mt-3 mr-2"
                            width="110px"
                            height="104px"
                          />
                        ))}

                      {imagesPreview.map((img) => (
                        <img
                          src={img}
                          key={img}
                          alt="Images Preview"
                          className="mt-3 mr-2"
                          width="105"
                          height="99"
                        />
                      ))}
                    </div>

                    <div className="custom-file">
                      <input
                        {...register("images")}
                        type="file"
                        name="images"
                        className={`form-control m-0 ${
                          errors.images ? "is-invalid" : ""
                        }`}
                        id="customFile"
                        width="105"
                        height="99"
                        value={images}
                        onChange={onChange}
                        multiple
                      />

                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Images
                      </label>

                      <p className="text-danger mt-2">
                        {errors.images?.message}
                      </p>
                    </div>
                  </div>
                </MDBCol>

                <MDBCol className="col-md-8 col-sm-12">
                  <div className="shadow-5 rounded-7 p-4 mr-3">
                    <h5 className="mb-4">Product Information</h5>

                    <div class="row">
                      <div class="col-12 col-sm-6">
                        <label>Name</label>
                        <input
                          {...register("name")}
                          type="text"
                          id="name_field"
                          className={`form-control m-0 ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <p className="text-danger">{errors.name?.message}</p>
                      </div>
                      <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                        <label>Seller Name</label>

                        <input
                          {...register("seller")}
                          type="text"
                          id="seller_field"
                          className={`form-control m-0 ${
                            errors.seller ? "is-invalid" : ""
                          }`}
                          value={seller}
                          onChange={(e) => setSeller(e.target.value)}
                        />
                        <p className="text-danger">{errors.seller?.message}</p>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-12 col-sm-6">
                        <label>Category</label>
                        <select
                          {...register("category")}
                          className={`form-control m-0 ${
                            errors.category ? "is-invalid" : ""
                          }`}
                          id="category_field"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <p className="text-danger">
                          {errors.category?.message}
                        </p>
                      </div>
                      <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                        <label>Brand</label>

                        <select
                          {...register("brand")}
                          className={`form-control m-0 ${
                            errors.brand ? "is-invalid" : ""
                          }`}
                          id="brand_field"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          {brands.map((brand) => (
                            <option key={brand} value={brand}>
                              {brand}
                            </option>
                          ))}
                        </select>
                        <p className="text-danger">{errors.brand?.message}</p>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-12 col-sm-6">
                        <label>Price</label>
                        <input
                          {...register("price")}
                          type="text"
                          id="price_field"
                          className={`form-control m-0 ${
                            errors.price ? "is-invalid" : ""
                          }`}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <p className="text-danger">{errors.price?.message}</p>
                      </div>
                      <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                        <label>Stock</label>

                        <input
                          {...register("stock")}
                          type="number"
                          id="stock_field"
                          className={`form-control m-0 ${
                            errors.stock ? "is-invalid" : ""
                          }`}
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                        <p className="text-danger">{errors.stock?.message}</p>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col">
                        <label>Description</label>
                        <textarea
                          {...register("description")}
                          className={`form-control m-0 ${
                            errors.description ? "is-invalid" : ""
                          }`}
                          id="description_field"
                          rows="5"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <p className="text-danger">
                          {errors.description?.message}
                        </p>
                      </div>
                    </div>
                    <MDBBtn
                      id="login_button"
                      type="submit"
                      className="btn btn-block py-3 mt-4"
                      disabled={loading ? true : false}
                    >
                      UPDATE
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </form>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
