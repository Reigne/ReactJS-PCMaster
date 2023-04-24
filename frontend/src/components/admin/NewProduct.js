import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Sidebar from "./Sidebar";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import { newProduct, clearErrors } from "../../actions/productActions";

import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

import { NavbarBrand } from "react-bootstrap";

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const NewProduct = () => {
  const [name, setName] = useState("");

  const [price, setPrice] = useState(0);

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [brand, setBrand] = useState("");

  const [stock, setStock] = useState(0);

  const [seller, setSeller] = useState("");

  const [images, setImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Select category...",
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
  ];

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const schema = yup.object({
    name: yup
      .string()
      .max(100, "Product name must be at most 100 characters")
      .required("Name of the product is required"),
    price: yup
      .number()
      .typeError("Price must be a numeric")
      .min(1, "Price must be greater than zero.")
      .required("Price is required"),
    description: yup
      .string()
      .required("Description is required"),
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
    seller: yup
      .string()
      .required("Seller name is required"),
    images: yup
      .mixed()
      .required("Images are required")
      .test("fileCount", "Please upload at least 1 images", (value) => {
        return value && value.length >= 1;
      }),
  });
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");

      message("Product created successfully");

      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    // e.preventDefault();

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

    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);

    setImages([]);

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
      <MetaData title={"New Product"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
              <h1 className="mb-4">Create New Product</h1>
              <MDBRow>
                <MDBCol className="col-12 col-md-4">
                  <div className="p-3 shadow-5 rounded-8">
                    <div className="form-group">
                      <h5>Upload Images</h5>

                      <div className="mb-3">
                        {imagesPreview.map((img) => (
                          <img
                            src={img}
                            key={img}
                            alt="Images Preview"
                            className="mt-3 mr-2"
                            width="110"
                            height="104"
                          />
                        ))}
                      </div>

                      <div className="custom-file">
                        <input
                          {...register("images")}
                          type="file"
                          name="images"
                          className={`form-control-file ${errors.images ? "is-invalid" : ""}`}
                          id="customFile"
                          onChange={onChange}
                          multiple
                        />

                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Choose Images
                        </label>
                        <p className="text-danger mt-2">{errors.images?.message}</p>
                      </div>
                    </div>
                  </div>
                </MDBCol>
                <MDBCol className="col-12 col-md-8">
                  <div className="p-3 shadow-5 rounded-8 mr-3">
                    <h5 className="mb-3">Product Information</h5>

                    <div class="row">
                      <div class="col-12 col-sm-6">
                        <label>
                          Name<label className="text-danger">*</label>
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          id="name_field"
                          className={`form-control m-0 ${errors.name ? "is-invalid" : ""}`}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <p className="text-danger">{errors.name?.message}</p>
                      </div>
                      <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                        <label>
                          Seller Name<label className="text-danger">*</label>
                        </label>

                        <input
                          {...register("seller")}
                          type="text"
                          id="seller_field"
                          className={`form-control m-0 ${errors.seller ? "is-invalid" : ""}`}
                          value={seller}
                          onChange={(e) => setSeller(e.target.value)}
                        />
                        <p className="text-danger">{errors.seller?.message}</p>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-12 col-sm-6">
                        <label>
                          Category<label className="text-danger">*</label>
                        </label>
                        <select
                          {...register("category")}
                          className={`form-control m-0 ${errors.category ? "is-invalid" : ""}`}
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
                        <p className="text-danger">{errors.category?.message}</p>
                      </div>
                      <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                        <label>
                          Brand<label className="text-danger">*</label>
                        </label>

                        <select
                          {...register("brand")}
                          className={`form-control m-0 ${errors.brand ? "is-invalid" : ""}`}
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
                        <label>
                          Price<label className="text-danger">*</label>
                        </label>
                        <input
                          {...register("price")}
                          type="text"
                          id="price_field"
                          className={`form-control m-0 ${errors.price ? "is-invalid" : ""}`}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <p className="text-danger">{errors.price?.message}</p>
                      </div>
                      <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                        <label>
                          Stock<label className="text-danger">*</label>
                        </label>

                        <input
                         {...register("stock")}
                          type="number"
                          id="stock_field"
                          className={`form-control m-0 ${errors.stock ? "is-invalid" : ""}`}
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                        <p className="text-danger">{errors.stock?.message}</p>
                      </div>
                    </div>

                    <div class="row mt-3">
                      <div class="col">
                        <label>
                          Description<label className="text-danger">*</label>
                        </label>
                        <textarea
                          {...register("description")}
                          className={`form-control m-0 ${errors.description ? "is-invalid" : ""}`}
                          id="description_field"
                          rows="5"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <p className="text-danger">{errors.description?.message}</p>
                      </div>
                    </div>

                    <MDBBtn
                      id="login_button"
                      type="submit"
                      className="btn btn-block mt-3"
                      disabled={loading ? true : false}
                    >
                      CREATE
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </form>

            {/* <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">New Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>

                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>

                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>

                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>

                  <select
                    className="form-control"
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
                </div>

                <div className="form-group">
                  <label htmlFor="brand_field">Brand</label>

                  <select
                    className="form-control"
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
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>

                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>

                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />

                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div> */}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
