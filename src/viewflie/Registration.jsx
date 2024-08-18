import React, { useState } from "react";
import "./Cssfail/Registration.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingImage from "../node/uploads/Animation - 1720176291108.gif";
import Header from "./Header";
import { TextField } from "@mui/material";

const Registration = () => {
  const [data, setData] = useState({
    Name: "",
    Email: "",
    Password: "",
    PasswordC: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const AllData = (event) => {
    const { name, value } = event.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();
    const { Name, Email, Password, PasswordC } = data;
    setLoading(true);
    try {
      const response = await Axios.post(
        "http://localhost:4000/Registration",
        {
          Name,
          Email,
          Password,
          PasswordC,
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
        navigate("/Login");
      } else {
        window.alert(apiData.error);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      window.alert(error.response.data.error);
    }

    setLoading(false);
    setData({
      Name: "",
      Email: "",
      Password: "",
      PasswordC: "",
    });
  };

  return (
    <>
      <Header />
      <form
        onSubmit={Submit}
        method="post"
        className="Registration"
        style={{ height: "90vh" }}
      >
        <div className="main_2">
          <h2>Sign-In</h2>
          <div className="main_1">
            <TextField
              onChange={AllData}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              type="text"
              name="Name"
              required
              className="form-control"
              value={data.Name}
            />
          </div>
          <br />
          <div className="main_1">
            <TextField
              onChange={AllData}
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              className="form-control"
              type="email"
              name="Email"
              required
              value={data.Email}
              style={{ marginTop: "-3vh" }}
            />
          </div>
          <br />
          <div className="main_1">
            <TextField
              id="outlined-password-input"
              label="New-Password"
              variant="outlined"
              type="password" // Ensure this is set to "password"
              name="Password"
              required
              className="form-control"
              onChange={AllData}
              value={data.Password}
              style={{ marginTop: "-3vh" }} // Adjust this as necessary
            />
          </div>
          <br />
          <div className="main_1">
            <TextField
              id="outlined-password-input"
              label="Confrm-Password"
              variant="outlined"
              type="password" // Ensure this is set to "password"
              name="PasswordC"
              required
              className="form-control"
              onChange={AllData}
              value={data.PasswordC}
              style={{ marginTop: "-3vh" }} // Adjust this as necessary
            />
          </div>
          <br />
          {loading ? (
            <div className="Loading_image">
              <img src={loadingImage} alt="Loading..." />
            </div>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </>
  );
};

export default Registration;
