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

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource ] = useState([]);
  const [hasMore, setHasMore] = useState(true);

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

  const fetchMoreData = () => {
    const pageNumber = currentPage + 1;
    
    if(products.length < 200){
      setTimeout(() => {
        dispatch(getProducts(keyword, pageNumber, price, category));
        setDataSource((prevDataSource) =>
          prevDataSource.concat(Array.from({ length: 20 }))
        );
      }, 500);
    } else{
      setHasMore(false);
    }


    // dispatch(getProducts(keyword, pageNumber, price, category)).then((products) => {
    //   if (products.length === 200) {
    //     setHasMore(false);
    //   }
    //   setCurrentPage(pageNumber);
    // });
  };
  useEffect(() => {
    if (error) {
      // return alert.error(error)
      notify(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, error, currentPage, keyword, price, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  let count = productsCount;

  if (keyword) {
    let count = filteredProductsCount;
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

          <section id="products" className="container mt-5">
            {/* <div className="row">
                            {products && products.map(product => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div> */}

            <div className="row">
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

                  <MDBCol className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </MDBCol>
                </Fragment>
              ) : (
                <InfiniteScroll
                  dataLength={products.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<p>Loading...</p>}
                >
                  {products.map((product) => (
                    <Product key={product._id} product={product}/>
                  ))}
                </InfiniteScroll>
              )}
            </div>
          </section>
        
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;