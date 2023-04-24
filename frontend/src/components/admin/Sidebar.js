import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      class="p-3 text-white bg-white rounded-9 shadow-5 ml-4 sticky-top"
      // style={{ width: "280px", height: "825px" }}
    >
      <div class="d-flex justify-content-center">
        <img src="/images/pcmaster_logo.png"/>
      </div>

      <hr className="bg-black" />

      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <a
              href="#"
              class="nav-link bg-primary text-white"
              aria-current="page"
            >
              <i
                class="fa-solid fa-chart-pie bg-primary"
                width="16"
                height="16"
              ></i>{" "}
              Dashboard
            </a>
          </Link>
          <a
            href="#productSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            className="nav-link dropdown-toggle bg-primary text-white"
          >
            <i class="fa-solid fa-computer bg-transparent"></i> Products
          </a>

          <ul
            className="collapse list-unstyled flex-column ml-2"
            id="productSubmenu"
          >
            <Link
              to="/admin/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li class="nav-item">
                <a class="nav-link bg-dark text-white" aria-current="page" href="#">
                  <i class="fa-solid fa-clipboard-list bg-transparent text-light"></i> View All Product
                </a>
              </li>
            </Link>

            <Link
              to="/admin/product"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li class="nav-item">
                <a class="nav-link bg-dark text-white" href="#">
                  <i class="fa-solid fa-plus bg-transparent text-light"></i> Create New Product
                </a>
              </li>
            </Link>
          </ul>

          <Link
            to="/admin/orders"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <a
              href="#"
              class="nav-link bg-primary text-white"
              aria-current="page"
            >
              <i class="fa-solid fa-boxes-packing bg-transparent"></i> Manage Orders
            </a>
          </Link>

          <Link
            to="/admin/reviews"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <a
              href="#"
              class="nav-link bg-primary text-white"
              aria-current="page"
            >
              <i class="fa-solid fa-comment bg-transparent"></i> Manage Reviews
            </a>
          </Link>

          <Link
            to="/admin/users"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <a
              href="#"
              class="nav-link bg-primary text-white"
              aria-current="page"
            >
              <i class="fa-solid fa-users bg-transparent"></i> Manage Users
            </a>
          </Link>
        </li>
        <hr className="bg-dark mx-4" />

        <Link
          to="/admin/reviews"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <a
            href="#"
            class="nav-link bg-dark text-light"
            aria-current="page"
          >
            <i class="fa-solid fa-person-running bg-transparent"></i> Logout
          </a>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
