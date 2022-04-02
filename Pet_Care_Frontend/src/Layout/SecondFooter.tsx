import React from "react";
import { Link } from "react-router-dom";
import "./SecondFooter.css";

function Footer() {
  return (
    <footer>
      <div className="container-fluid mt-5">
        <div className="lcard mx-5">
          <div className="row mb-4 ">
            <div className="col-md-4 col-sm-11 col-xs-11">
              <div className="footer-text pull-left">
                <div className="d-flex">
                  <h1>SportShopApi</h1>
                </div>
                <div className="social mt-2 mb-3">
                  {" "}
                  <i className="fa fa-facebook-official fa-lg"></i>{" "}
                  <i className="fa fa-instagram fa-lg"></i>{" "}
                  <i className="fa fa-twitter fa-lg"></i>{" "}
                  <i className="fa fa-linkedin-square fa-lg"></i>{" "}
                  <i className="fa fa-facebook"></i>{" "}
                </div>
              </div>
            </div>
            <div className="col-md-2 col-sm-1 col-xs-1 mb-2"></div>
            <div className="col-md-2 col-sm-4 col-xs-4">
              <h5 className="heading">Services</h5>
              <ul>
                <li>IT Consulting -</li>
                <li>Development</li>
                <li>Cloud</li>
                <li>DevOps & Support</li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-4 col-xs-4">
              <h5 className="heading">Social</h5>
              <ul className="card-text">
                <li>LinkedIn</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Github</li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-4 col-xs-4">
              <h5 className="heading">Company</h5>
              <ul className="card-text">
                <li>About Us</li>
                <li>Blog</li>
                <li>Contact</li>
                <li>Join Us</li>
              </ul>
            </div>
          </div>
          <div className="divider mb-4"> </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-6">
              <div className="pull-left">
                <p>
                  <i className="fa fa-copyright"></i> 2021 SportShopApi
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-6">
              <div className="pull-right mr-4 d-flex policy">
                <div>Terms of Use</div>
                <div>Privacy Policy</div>
                <div>Cookie Policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
