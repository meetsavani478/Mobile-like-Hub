import React, { useEffect, useRef, useState } from "react";
import "./Cssfail/footer.css";
import image_url from "../node/uploads/Mesa_de_trabajo_1-100-removebg-preview.png";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";

const Footer = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const id = localStorage.getItem("userId");
  const data = ["Iphone", "Samsung", "OnePlus", "Motorola", "Vivo", "IQoo"];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/user/${id}`);
          const apiData = await response.json();
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, [id]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const contactModalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, subject, message } = formData;
      const response = await Axios.post(
        "https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/mycontact",
        {
          name,
          email,
          subject,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const apiData = response.data;
      if (apiData) {
        alert("Your message has been sent!");
        if (contactModalRef.current) {
          const modal = new window.bootstrap.Modal(contactModalRef.current);
          modal.hide();
        }
        navigate(`/`);
      } else {
        alert(apiData.error);
      }
    } catch (error) {
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <>
      <footer className="custom-footer">
        <div className="custom-footer-content">
          <div className="custom-footer-section about">
            <img src={image_url} className="custom-footer-image" alt="Logo" />
            <p className="custom-footer-prgh">
              The year 2024 has brought an array of exciting new mobile phones
              to the market. From stunning design changes to cutting-edge
              technology, here's a roundup of the latest releases that you
              should know about. Explore top models from leading brands that
              push the boundaries of smartphone innovation.
            </p>
            <ul className="custom-footer-social-links">
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" style={{fontSize:"3.7vh"}}></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook" style={{fontSize:"3.7vh"}}></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.snapchat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-snapchat" style={{fontSize:"3.7vh"}}></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter" style={{fontSize:"3.7vh"}}></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&parameters"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-location-dot" style={{fontSize:"3.7vh"}}></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="custom-footer-section links">
            <h2 style={{ marginTop: "-9vh" }}>Product Categories</h2>
            <ul className="custom-footer-nav">
              <li>
                <div className="custom-footer-nav-item">
                  {data.length > 0 &&
                    data.map((product, index) => (
                      <NavLink
                        key={index}
                        to={`/Phone_Details/${product}/${index}`}
                      >
                        {product}
                      </NavLink>
                    ))}
                </div>
              </li>
            </ul>
          </div>
          <div className="custom-footer-section contact">
            <h2>Contact Us</h2>
            <p>
              <i className="fa-solid fa-user"></i> MR: Meet Savani
            </p>
            <p>
              <i className="fa-solid fa-envelope"></i> mobilelickhub@gmail.com
            </p>
            <p>
              <i className="fa-solid fa-phone"></i> +(91) 9328123567
            </p>
            <ul className="custom-footer-nav">
              <li>
                <div className="custom-footer-nav">
                  <div
                    className="custom-footer-Contact"
                    data-bs-toggle="modal"
                    data-bs-target="#contactModal"
                  >
                    <h5 style={{ color: "white", marginTop: "0.6vh" }}>
                      Contact
                    </h5>
                  </div>
                </div>
              </li>
              {!isLoggedIn && (
                <li className="custom-footer-logged-in">
                  <NavLink to="/Login">Login</NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <div className="custom-footer-Contact">
                    <NavLink to={`/Login`}>
                      <h5 style={{ color: "white"}}>
                        Logout
                      </h5>
                    </NavLink>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="custom-footer-bottom">
          <p>&copy; 2024 Mobile-Like-Hub. All rights reserved.</p>
        </div>
      </footer>
      <div
        className="modal fade"
        id="contactModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
        ref={contactModalRef}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="contactModalLabel">
                Send us a message
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  Send
                </button>
                {loading && (
                  <div
                    className="spinner-border text-primary ml-3"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
