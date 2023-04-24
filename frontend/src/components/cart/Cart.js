import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  let navigate = useNavigate();

  return (
    <Fragment>
      <MetaData title={"Your Cart"} />

      {cartItems.length === 0 ? (
        <MDBContainer>
          <div className="shadow-5 rounded-9 p-5">
            <div className="row justify-content-center">
              <div className="col-9 text-center">
                <img
                  className="my-5 img-fluid d-block mx-auto"
                  src="/images/empty.png"
                  alt="Cart Empty"
                  width="200"
                  height="200"
                />

                <h2 className="text-danger">Your Cart is Empty!</h2>
                <p className="text-muted">
                   It seems that you haven't added any products to your shopping cart yet.
                </p>
                <Link to="/">Go to Shop</Link>
              </div>
            </div>
          </div>
        </MDBContainer>
      ) : (
        <Fragment>
          {/* <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2> */}

          <MDBContainer>
            <MDBRow>
              <MDBCol
                className="bg-white rounded-9 shadow-5 p-4 col-12 col-lg-9 my-4"
                style={{ overflowX: "auto" }}
                size="9"
              >
                <h4 className="mt-4">
                  Total Items in Cart: <b>{cartItems.length}</b>
                </h4>

                {cartItems.map((item) => (
                  <Fragment key={item.product}>
                    <hr />

                    <div className="cart-item mb-4">
                      <div className="row">
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt="Laptop"
                            height="90"
                            width="115"
                            className="shadow-2 rounded"
                          />
                        </div>

                        <div className="col-5 col-lg-3">
                          <div>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                            <p>{item.category}</p>
                          </div>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="hstack gap-3">
                            <div>
                              <input
                                className="form-control text-center "
                                type="number"
                                style={{ width: "140px" }}
                                value={item.quantity}
                                readOnly
                              />
                              <span
                                className="text-danger ml-4"
                                style={{ fontSize: "0.8em" }}
                              >
                                {item.stock} Items left
                              </span>
                            </div>

                            <span
                              className="btn btn-primary plus mb-4"
                              onClick={() =>
                                increaseQty(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                            >
                              +
                            </span>
                            <span
                              className="btn btn-danger minus mb-4"
                              onClick={() =>
                                decreaseQty(item.product, item.quantity)
                              }
                            >
                              -
                            </span>
                            <div className="vr mb-4"></div>
                            <button
                              type="button"
                              id="delete_cart_item"
                              className="fa fa-trash btn btn-outline-danger mb-4"
                              onClick={() =>
                                removeCartItemHandler(item.product)
                              }
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </MDBCol>

              <MDBCol className="col-12 col-lg-3 my-4">
                <div
                  className="shadow-5 p-4 rounded-9"
                  style={{ position: "sticky", top: "0" }}
                >
                  <div className="mt-3" id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    {/* <p>
                  Subtotal: <span className='order-summary-values'></span>
                </p> */}
                    <p>
                      <strong>Subtotal: </strong>
                      <span className="order-summary-values float-end mr-3">
                        {cartItems.reduce(
                          (acc, item) => acc + Number(item.quantity),
                          0
                        )}{" "}
                        (Items)
                      </span>
                    </p>
                    {/* <p>
                  Est. total: <span className='order-summary-values'></span>
                </p> */}
                    <p>
                      <strong>Est. total: </strong>
                      <span className="order-summary-values text-danger float-end mr-3">
                        $
                        {cartItems
                          .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </p>
                    <hr />
                    <button
                      id="checkout_btn"
                      className="btn btn-primary btn-block"
                      onClick={checkoutHandler}
                    >
                      Check out
                    </button>
                    {/* <button id='checkout_btn' className='btn btn-primary btn-block'>
                  Check out
                </button> */}
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
