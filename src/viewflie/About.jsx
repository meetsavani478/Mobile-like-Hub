import React from "react";
import "../viewflie/Cssfail/About.css";
import Header from "./Header";
import Footer from "./footer";
const About = () => {
  return (
    <>
      <Header />
      <div className="about-container">
        <div className="about-content">
          <h1>About Mobile Hub</h1>
          <p>
            Welcome to Mobile Hub, your go-to destination for the latest and
            greatest in mobile technology. We are dedicated to providing you
            with a seamless shopping experience, offering a wide range of mobile
            phones, accessories, and gadgets to suit every need and budget.
          </p>
          <p>
            At Mobile Hub, we believe that staying connected is essential in
            today's fast-paced world. That's why we are committed to bringing
            you the most advanced mobile devices, equipped with cutting-edge
            technology and innovative features.
          </p>
          <p>
            Whether you're looking for a high-performance smartphone, the latest
            accessories, or expert advice, Mobile Hub is here to help. Our
            knowledgeable team is passionate about technology and ready to
            assist you in finding the perfect product to enhance your digital
            life.
          </p>
          <p>
          Thank you for choosing Mobile Hub. We look forward to serving you and being your trusted partner
          in all things mobile.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
