import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cssfail/Updateprofile.css";
import loadingImage from "../node/uploads/Animation - 1720176291108.gif";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./Header";
import { TextField } from "@mui/material";

const Update_profile = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Data, SetData] = useState({ Name: "", Email: "" });
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    Axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const fetchUserData = async () => {
      try {
        if (id) {
          const response = await Axios.get(
            `http://localhost:4000/Profile/${id}`
          );
          if (response.data) {
            SetData(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const data = (event) => {
    const { name, value } = event.target;
    SetData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { Name, Email } = Data;

    try {
      const response = await Axios.post(
        `http://localhost:4000/Profile/${id}`,
        {
          Name,
          Email,
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
        navigate(`/Project/${id}`);
      } else {
        navigate("/Login");
        window.alert(`${apiData}`);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      navigate(`/Project/${id}`);
      localStorage.removeItem("token");
      window.alert("Error: Unable to update profile. Please try again.");
    } finally {
      setLoading(false);
      SetData({ Name: "", Email: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading1(true);
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading1(false);
      return;
    }

    try {
      const response = await Axios.post(
        `http://localhost:4000/change-password/${id}`,
        {
          password,
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
        alert("Your password has been changed!");
        setShowModal(false);
        navigate("/Login");
      } else {
        alert(apiData.error);
        navigate(`/Update_profile/${id}`);
      }
    } catch (error) {
      alert(
        "There was an error changing your password. Please try again later."
      );
      navigate("/Login");
    } finally {
      setLoading1(false);
      setFormData({ password: "", confirmPassword: "" });
    }
  };

  return (
    <div className='main-pass'>
      <form onSubmit={Submit} method="post" className="Update_form">
        <Header />
        <div className="Update_main">
          <h2>Update User_Id</h2>
          <div className="Update_main_1">
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="Update_input"
              type="text"
              placeholder="User-Name"
              name="Name"
              required
              onChange={data}
              value={Data.Name || ""}
            />
          </div>
          <br />
          <div className="Update_main_1">
            <TextField
              className="Update_input"
              type="email"
              name="Email"
              required
              placeholder="Email"
              id="s2"
              onChange={data}
              value={Data.Email || ""}
              style={{ marginTop: "-3vh" }}
            />
          </div>
          <br />
          {loading ? (
            <div className="Loading_image">
              <img src={loadingImage} alt="Loading..." />
            </div>
          ) : (
            <>
              <div className="change_password">
                <div
                  className="change_text"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Change_password
                </div>
                
              </div>
              <div style={{justifyContent:"center", display:"flex"}}>
              <button id="fun1" type="submit">
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </form>
      {showModal && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          id="changePassModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="changePassModalLabel"
          aria-hidden="true"
          style={{ display: showModal ? "block" : "none", marginTop: "27vh" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Change Password</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading1}
                  >
                    Change Password
                  </button>
                  {loading1 && (
                    <div
                      className="spinner-border text-primary ml-3"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update_profile;
