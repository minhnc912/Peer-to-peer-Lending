import React from "react";
import "../footer/footer.css";

const Footer = () => {
    return (
        <div className="container-fluid container_footer">
            <div className="row">
                <div className="col-lg-12 d-flex mt-3 px-5 text-start ">
                    <div className="col-lg-3">
                        <img
                            src="https://res.cloudinary.com/da0i1amaa/image/upload/v1661734475/logodon_ve6p3s.png"
                            width="90px"
                            height="150px"
                            alt=""
                        ></img>
                        <h5 className="footer_text">PEER-TO-PEER LENDING</h5>
                    </div>
                    <div className="col-lg-3">
                        <h3 className="text-white">Quicklinks</h3>
                        <div className="footer_divider"></div>
                        <p className="footer_text">About Us</p>
                        <p className="footer_text">Services</p>
                        <p className="footer_text">Careers</p>
                        <p className="footer_text">Our Team</p>
                    </div>
                    <div className="col-lg-3">
                        <h3 className="text-white">Our Services</h3>
                        <div className="footer_divider"></div>
                        <p className="footer_text">Borrow Basic</p>
                        <p className="footer_text">Borrow Multiple Money</p>
                        <p className="footer_text">Borrow Multiple Investor</p>
                        <p className="footer_text">Investor Services</p>
                    </div>
                    <div className="col-lg-3">
                        <h3 className="text-white">Newsletters</h3>
                        <div className="footer_divider"></div>
                        <p className="footer_text">
                            Subscribe to get a bunch of helpful stuff sent to
                            your inbox directly
                        </p>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control footer_input"
                                placeholder="Your Email"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            ></input>
                            <div className="button_subscribe">Subscribe</div>
                        </div>
                    </div>
                </div>
                <div className="footer_end_divider"></div>
                <div className="text-center footer_text footer_copyright mt-3">
                    <p>Copyright 2022 &copy; P2P</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
