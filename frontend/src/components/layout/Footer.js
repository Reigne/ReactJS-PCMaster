import React, { Fragment } from "react";
const Footer = () => {
  return (
    <Fragment>
      <footer class="footer py-2 mt-5">
        <span class="text-muted font-size: 0.8rem; line-height: 1.5;"></span>
        <section class="d-flex justify-content-center justify-content-lg-between gap-4 px-5">
          <div class="me-5 d-none d-lg-block text-black">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="" class="me-4 link-secondary text-black">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="" class="me-4 link-secondary text-black">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="" class="me-4 link-secondary text-black">
              <i class="fab fa-google"></i>
            </a>
            <a href="" class="me-4 link-secondary text-black">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="" class="me-4 link-secondary text-black">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="" class="me-4 link-secondary text-black">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section class="">
          <div class="container text-center text-md-start mt-5 text-black">
            <div class="row mt-3">
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">
                  <i class="fas fa-gem me-3 text-secondary text-black"></i>PC
                  MASTER
                </h6>
                <p>
                  PC Master is a famous computer retailer in the Philippines.
                  Our diverse product range includes desktop systems and
                  components, laptops, and gaming peripherals.
                </p>
              </div>
              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-black">
                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i class="fas fa-home me-3 text-secondary text-black"></i>{" "}
                  Philippines,Taguig City Lower Bicutan
                </p>
                <p>
                  <i class="fas fa-envelope me-3 text-secondary text-black"></i>
                  pc-master@example.com
                </p>
                <p>
                  <i class="fas fa-phone me-3 text-secondary text-black"></i> +
                  01 234 567 88
                </p>
                <p>
                  <i class="fas fa-print me-3 text-secondary text-black"></i> +
                  01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>
        <div class="text-center p-4 text-black">
          © 2021 Copyright:
          <a class="text-reset fw-bold " href="https://mdbootstrap.com/">
            PC-MASTER.com
          </a>
        </div>
      </footer>
    </Fragment>
  );
};
export default Footer;
