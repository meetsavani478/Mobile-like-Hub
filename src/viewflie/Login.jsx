import React, { useState } from "react";
import "./Cssfail/Login.css";
import Axios from "axios";
import { TextField } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import loadingImage from "../node/uploads/Animation - 1720176291108.gif";
import Header from "./Header";

const Login = () => {
  const [data, setData] = useState({
    Name: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const button = async (e) => {
    e.preventDefault();
    setLoading(true);
    var id = "";
    const { Name, Password } = data;
    try {
      const response = await Axios.post(
        "http://localhost:4000/Login_Data",
        {
          Name,
          Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const apiData = response.data;
      if (apiData.token) {
        const id = apiData.id;
        localStorage.setItem("userId", id);
        localStorage.setItem("token", apiData.token);
        navigate(`/Project/${id}`);
        console.log(apiData.token);
      } else {
        localStorage.setItem("userId", id);
        window.alert(apiData.error);
      }
    } catch (error) {
      console.log("Error fetching data:", error?.response?.data?.error);
      window.alert(error?.response?.data?.error);
    }

    setLoading(false);
    setData({
      Name: "",
      Password: "",
    });
  };

  return (
    <>
      <form method="post" onSubmit={button}>
        <Header />
        <div className="main">
          <h2>LOGIN</h2>
          <div className="main_1">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              type="text"
              name="Name"
              required
              className="form-control"
              //  placeholder="Username"
              onChange={handleChange}
              value={data.Name}
            />
          </div>
          <br />
          <div className="main_1">
            {/* <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="text"
              name="Password"
              required
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              style={{marginTop:"-3vh"}}
            /> */}
            <TextField
              id="outlined-password-input"
              label="Password"
              variant="outlined"
              type="password" // Ensure this is set to "password"
              name="Password"
              required
              className="form-control"
              onChange={handleChange}
              value={data.Password}
              style={{ marginTop: "-3vh" }} // Adjust this as necessary
            />
          </div>
          <br />
          <div className="pass">
            <a href="/Email" style={{ color: "black" }}>
              Forgot Password
            </a>
            <NavLink to="/Registration" style={{ color: "black" }}>
              Registration Page
            </NavLink>
          </div>
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

export default Login;
