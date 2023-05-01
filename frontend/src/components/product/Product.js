import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBRipple,
  MDBCardHeader,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";

const Product = ({ product }) => {
  return (
    <MDBRow className="col-12 col-lg-3 mr-2 mt-3 bg-transparent">
      <MDBCol>
        <MDBCard className="rounded-7 p-1">
          {/* <MDBCardImage src={product.images[0].url} alt="..." position="top" /> */}

          {/* <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay p-2 rounded-8"
          >
            <MDBCardImage src={product.images[0].url} fluid alt="..." />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple> */}
          <Carousel
            className="bg-image hover-overlay p-2 rounded-8"
            delay={1000}
            pause="hover"
            indicators={false}
            showControls={product.images.length > 1}
          >
            {product.images &&
              product.images.map((image) => (
                <Carousel.Item key={image.public_id}>
                  <MDBCardImage
                    className="rounded-5 d-block w-100"
                    src={image.url}
                    alt={product.title}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
          <MDBCardBody>
            <MDBCardTitle>
              <h6 className="text-success float-end mt-2">${product.price}</h6>
            </MDBCardTitle>
            <MDBCardTitle>{product.name}</MDBCardTitle>
            <MDBCardText>{product.category}</MDBCardText>
            <div className="ratings mb-2 ">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews" className="text-muted"> ({product.numOfReviews} reviews)</span>
            </div>
            <MDBBtn className="me-1" color="success">
              Add to Cart
            </MDBBtn>
            <Link to={`product/${product._id}`}>
              <MDBBtn className="me-1" color="info">
                View
              </MDBBtn>
            </Link>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};
export default Product;
