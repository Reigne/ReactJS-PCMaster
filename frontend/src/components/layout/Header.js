import React, { Fragment } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from 'react-alert'
import { logout } from "../../actions/userActions";
import {
  MDBBadge,
  MDBBtn,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  // const { cartItems } = useSelector(state => state.cart)
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };

  return (
    <Fragment>
      <body>
        <header>
          <div className="logo mb-3">
            <Link to="/">
              <img
                className="logo"
                src="/images/pcmaster_logo.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Search />
          </div>
          <nav>
            {user ? (
              <ul className="nav__links">
                <li>
                  <Link to="/">
                    <a to="/">Shop</a>
                  </Link>
                </li>
                <li>
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                    <a>My Cart </a>
                  </Link>
                  {cartItems.length > 0 && (
                    <MDBBadge
                      color="success"
                      className="position-absolute translate-middle ml-2 bg-success border border-light rounded-circle"
                    >
                      {cartItems.length}
                    </MDBBadge>
                  )}
                </li>
                <li>
                  <MDBDropdown>
                    <MDBDropdownToggle tag="a">
                      <img
                        className="rounded-circle shadow-4"
                        src={user.avatar && user.avatar.url}
                        alt={user && user.name}
                        style={{ width: "30px", height: "30px" }}
                      />
                      &nbsp;{user && user.name}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      {user && user.role === "admin" ? (
                        <Link to="/dashboard">
                          <MDBDropdownItem link>Dashboard</MDBDropdownItem>
                        </Link>
                      ) : (
                        <MDBDropdownItem hidden>Dashboard</MDBDropdownItem>
                      )}

                      {/* {user &&
                        (user.role === "admin") &&
                        (
                          <Link to="/dashboard">
                            <MDBDropdownItem link>Dashboard</MDBDropdownItem>
                          </Link>
                        )} */}

                      <Link to="/orders/me">
                        <MDBDropdownItem link>My Orders</MDBDropdownItem>
                      </Link>
                      <Link to="/me">
                        <MDBDropdownItem link>Profile</MDBDropdownItem>
                      </Link>
                      <Link to="/" onClick={logoutHandler}>
                        <MDBDropdownItem link>Logout</MDBDropdownItem>
                      </Link>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </li>
              </ul>
            ) : (
              !loading && (
                <ul className="nav__links">
                  <li>
                    <Link to="/">
                      <a to="/">Shop</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" style={{ textDecoration: "none" }}>
                      <a>My Cart </a>
                    </Link>
                    <MDBBadge
                      color="success"
                      className="position-absolute  translate-middle ml-2 bg-success border border-light rounded-circle"
                    >
                      {cartItems.length}
                    </MDBBadge>
                  </li>
                  {/* <li>
                <a>About</a>
              </li> */}
                  <li>
                    <Link to="/register">
                      <a>Register</a>
                    </Link>
                  </li>
                </ul>
              )
            )}
          </nav>

          {user ? (
            <a className="cta"></a>
          ) : (
            !loading && (
              <a className="cta">
                <Link to="/login">
                  <button className="button__nav">Login</button>
                </Link>
              </a>
            )
          )}
        </header>
      </body>
    </Fragment>
  );
};

export default Header;
