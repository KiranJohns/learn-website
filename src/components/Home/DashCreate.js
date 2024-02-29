import React, { useState } from "react";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Backbutton from "./Backbutton";
import { validatePassword } from "../../utils/passwordvalidation";

const DashCreate = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    country: "",
    password: "",
    phone: "",
    user_type: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleOnchange = (e) => {
    e.persist();
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  const mackRequest = fetchData();

  const handleSubmit = (e) => {
    e.persist();

    let url = "";
    if (userData.user_type === "individual") {
      url = "/info/create-manager-individual";
    } else {
      url = "/info/create-manager";
    }

    validatePassword(userData.password).then((res) => {
      if (res.length <= 0) {
          mackRequest("POST", url, {
            ...userData,
            phone: Number(userData.phone),
          })
            .then((res) => {
              if (userData.user_type === "individual") {
                toast.success("Individual Created");
                location.href = "/company/showuser";
              } else {
                toast.success("Manager Created");
                location.href = "/company/managers";
              }
            })
            .catch((err) => {
              console.log(err.data);
              toast.error(err.data.data.response);
            });
      } else {
        for (const iterator of res) {
          toast.warn(iterator);
        }
      }
    });
  };

  return (
    <div style={{position:"relative"}} className="">
      <Backbutton/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="dash-shadow mt-15">
        <h2
          style={{
            padding: "1.5rem",
            color: "#212450",
            display: "flex",
            justifyContent: "center",
            fontSize: 37,
          }}
        >
          Create User
        </h2>
        <div>
          <form className="row g-3  d-flex justify-content-end  ">
            <div className="col-12 d-flex mx-auto">
              <div className="col-6">
                <div className="form-group p-2 mb-4">
                  <label className="text-black" htmlFor="FormControlInput1">
                    First Name
                  </label>
                  <input
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    type="text"
                    className="form-control border border-black"
                    id="first_name"
                    placeholder="First Name"
                    name="first_name"
                    value={userData.first_name}
                  />
                </div>

                <div className="form-group p-2 mb-4">
                  <label className="text-black" htmlFor="FormControlInput1">
                    Email
                  </label>
                  <input
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    type="email"
                    className="form-control border border-black"
                    id="email"
                    placeholder="name@example.com"
                    name="email"
                    value={userData.email}
                    autocomplete="off"
                  />
                </div>

                <div className="form-group p-2 mb-4">
                  <label className="text-black" htmlFor="FormControlInput1">
                    Country
                  </label>
                  <select
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    className="form-control border border-black"
                    id="exampleFormControlSelect1"
                    name="country"
                  >
                    <option>Select</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                <div className="form-group p-2 mb-4">
                  <label className="text-black" htmlFor="FormControlInput1">
                    Type of User
                  </label>
                  <select
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    className="form-control border border-black"
                    id="exampleFormControlSelect1"
                    name="user_type"
                  >
                    <option>Select</option>
                    <option value="individual">Individual</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group p-2 mb-4">
                  <label className="text-black" htmlFor="FormControlInput1">
                    Last Name
                  </label>
                  <input
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    type="text"
                    className="form-control border border-black"
                    id="last_name"
                    name="last_name"
                    placeholder="Second Name"
                    value={userData.last_name}
                  />
                </div>

                <div className="form-group p-2 mb-4">
                  <label className="text-black" htmlFor="FormControlInput1">
                    Phone
                  </label>
                  <input
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    type="number"
                    className="form-control border border-black"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={userData.phone}
                  />
                </div>

                <div className="form-group p-2 mb-4">
                  <label className="text-black" htmlFor="FormControlInput1">
                    City
                  </label>
                  <input
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    type="text"
                    className="form-control border border-black"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={userData.city}
                  />
                </div>

                <div className="form-group p-2 mb-4">
                  <label className="text-black" htmlFor="FormControlInput1">
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      style={{ background: "#f7fbff" }}
                      onChange={handleOnchange}
                      type={showPassword ? "text" : "password"}
                      className="form-control border border-black"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={userData.password}
                      autocomplete="off"
                    />
                    <div
                      id="pasToggle"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <BsEyeSlashFill /> : <BsFillEyeFill />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group d-flex justify-content-center p-2 mb-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashCreate;
