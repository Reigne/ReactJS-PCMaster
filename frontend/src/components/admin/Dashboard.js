import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { getAdminProducts } from "../../actions/productActions";

import { allOrders } from "../../actions/orderActions";

import { allUsers } from "../../actions/userActions";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { users } = useSelector((state) => state.allUsers);

  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );

  let outOfStock = 0;

  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <Fragment>
      <MDBRow className="mr-2">
        <MDBCol className="col-12 col-md-2">
          <Sidebar />
        </MDBCol>
        <MDBCol className="col-12 col-md-10">
          
          <h1 className="my-4">
          <i class="fa-solid fa-chart-pie"></i> <b>Dashboard</b>
          </h1>

          {false ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Admin Dashboard"} />

              <MDBRow>
                <div class="col-xl-6 col-sm-6 mb-xl-0 mb-4">
                  <div class="card shadow-5">
                    <div class="card-body p-3 rounded-8" >
                      <div class="row">
                        <div class="col-8">
                          <div class="numbers">
                            <p class="text-sm mb-0 text-capitalize font-weight-bold">
                              Total Earnings
                            </p>
                            <h5 class="font-weight-bolder mb-0">
                            <b>${totalAmount && totalAmount.toFixed(2)}</b>
                              {/* <span class="text-success text-sm font-weight-bolder">
                                +55%
                              </span> */}
                            </h5>
                          </div>
                        </div>
                        <div class="col-4 text-end">
                          <div class="mt-3 mr-3">
                          <i class="fa-solid fa-coins fa-2xl text-dark"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-dark" style={{ height: "10px", padding: "5px" }}>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-6 mb-xl-0 mb-4">
                  <div class="card shadow-5">
                    <div class="card-body p-3 rounded-8" >
                      <div class="row">
                        <div class="col-8">
                          <div class="numbers">
                            <p class="text-sm mb-0 text-capitalize font-weight-bold">
                              Total Out of Stock
                            </p>
                            <h5 class="font-weight-bolder mb-0">
                            <b>{outOfStock}</b>
                              {/* <span class="text-success text-sm font-weight-bolder">
                                +55%
                              </span> */}
                            </h5>
                          </div>
                        </div>
                        <div class="col-4 text-end">
                          <div class="mt-3 mr-3">
                          <i class="fa-solid fa-box-open fa-2xl text-danger"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-danger" style={{ height: "10px", padding: "5px" }}>
                    </div>
                  </div>
                </div>
              </MDBRow>
              <MDBRow className="mt-3">
                <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                  <div class="card shadow-5">
                    <div class="card-body p-3 rounded-8" >
                      <div class="row">
                        <div class="col-8">
                          <div class="numbers">
                            <p class="text-sm mb-0 text-capitalize font-weight-bold">
                              Total Products
                            </p>
                            <h5 class="font-weight-bolder mb-0">
                            <b>{products && products.length}</b> (Items)
                              {/* <span class="text-success text-sm font-weight-bolder">
                                +55%
                              </span> */}
                            </h5>
                          </div>
                        </div>
                        <div class="col-4 text-end">
                          <div class="mt-3 mr-3">
                          <i class="fa-solid fa-computer fa-2xl text-primary"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="card-footer clearfix small z-1 bg-primary"
                      to="/admin/products"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <span className="float-left small bg-transparent text-white">View Details</span>
                    </Link>
                  </div>
                </div>
                <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                  <div class="card shadow-5">
                    <div class="card-body p-3 rounded-8" >
                      <div class="row">
                        <div class="col-8">
                          <div class="numbers">
                            <p class="text-sm mb-0 text-capitalize font-weight-bold">
                              Total Orders
                            </p>
                            <h5 class="font-weight-bolder mb-0">
                            <b>{orders && orders.length}</b>
                              {/* <span class="text-success text-sm font-weight-bolder">
                                +55%
                              </span> */}
                            </h5>
                          </div>
                        </div>
                        <div class="col-4 text-end">
                          <div class="mt-3 mr-3">
                          <i class="fa-solid fa-boxes-stacked fa-2xl text-warning"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="card-footer clearfix small z-1 bg-warning"
                      to="/admin/orders"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <span className="float-left small bg-transparent text-white" >View Details</span>
                    </Link>
                  </div>
                </div>
                <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                  <div class="card shadow-5">
                    <div class="card-body p-3 rounded-8" >
                      <div class="row">
                        <div class="col-8">
                          <div class="numbers">
                            <p class="text-sm mb-0 text-capitalize font-weight-bold">
                              Total Users
                            </p>
                            <h5 class="font-weight-bolder mb-0">
                            <b>{users && users.length}</b>
                              {/* <span class="text-success text-sm font-weight-bolder">
                                +55%
                              </span> */}
                            </h5>
                          </div>
                        </div>
                        <div class="col-4 text-end">
                          <div class="mt-3 mr-3">
                          <i class="fa-solid fa-people-group fa-2xl text-info"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="card-footer clearfix small z-1 bg-info"
                      to="/admin/users"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <span className="float-left small bg-transparent text-white" >View Details</span>
                    </Link>
                  </div>
                </div>
              </MDBRow>
            </Fragment>
          )}
        </MDBCol>
      </MDBRow>
    </Fragment>
  );
};

export default Dashboard;
