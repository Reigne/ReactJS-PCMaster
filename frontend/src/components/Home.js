import React, { Fragment, useEffect, useState } from "react";

import MetaData from "./layout/MetaData";

import { useParams } from "react-router-dom";

import Pagination from "react-js-pagination";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Slider, { Range, createSliderWithTooltip } from "rc-slider";

import "rc-slider/assets/index.css";

import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../actions/productActions";

import Product from "./product/Product";

import Loader from "./layout/Loader";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";

import { Carousel } from "react-bootstrap";

const Home = () => {
  const [hasMore, sethasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setpage] = useState(2);
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");

  let { keyword } = useParams();

  const categories = [
    "Central Processing Unit",
    "Graphics Processing Unit",
    "Gaming Peripherals",
    "Headphones",
    "Headset",
    "KeyBoard",
    "Memory",
    "Microphone",
    "Motherboard",
    "Mouse",
    "Power Supply Unit",
    "Storage",
  ];

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  useEffect(() => {
    const getProduts = async () => {
      const res = await fetch(
        // For json server use url below
        `${process.env.REACT_APP_API}/api/v1/products?_page=1&_limit=20`
        // `http://localhost:3004/comments?_page=1&_limit=20`
      );
      const data = await res.json();
      setItems(data);
    };

    if (error) {
      // return alert.error(error)
      notify(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, error, currentPage, keyword, price]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  let count = productsCount;

  if (keyword) {
    let count = productsCount;
  }
  console.log(keyword, count, filteredProductsCount, resPerPage);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          {/* <h1 id="products_heading">Latest Products</h1> */}

          <section id="products" className="container mt-2">
            <MDBContainer>
              <div className="justify-content-center mr-4">
                {/* <img
                  className="img-fluid d-block mx-auto"
                  src="/images/header2.png"
                  alt="Order Success"
                  width="125
                  0"
                /> */}

                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/images/header.png"
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/images/header4.png"
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/images/header5.png"
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
              <div className="row mt-4">
                {keyword ? (
                  <Fragment>
                    <MDBCol className="col-6 col-md-3">
                      <div className="shadow-5 rounded-8 pl-0 p-5 mb-3">
                        <h4 className="mb-2">Price Range</h4>
                        <Range
                          marks={{
                            1: `$1`,
                            1000: `$1000`,
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1, 1000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: "bottom",
                            visible: true,
                          }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />
                      </div>

                      <div className="shadow-5 rounded-8 p-4  ">
                        <h4 className="mb-2">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </MDBCol>

                    <MDBCol className="col-12 col-lg-9">
                      <div className="row">
                        {products.map((product) => (
                          <Product key={product._id} product={product} />
                        ))}
                      </div>
                    </MDBCol>
                  </Fragment>
                ) : (
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
              </div>
            </MDBContainer>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
