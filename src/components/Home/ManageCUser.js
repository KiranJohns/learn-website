import React, { useState } from "react";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Backbutton from "./Backbutton";


const ManageCreateU = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    country: "",
    password: "",
    phone: "",
    user_type: "individual",
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
    mackRequest("POST", "/info/create-manager-individual", {
      ...userData,
      phone: Number(userData.phone),
    })
      .then((res) => {
        toast.success("User Created");
        location.href = '/manager/individuals'
      })
      .catch((err) => {
        console.log(err.data);
        toast.error(err.data.data.response);
      });
  };

  return (
    <div className="">
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
      <div style={{position:"relative"}} className="dash-shadow ">
      <Backbutton/>
        <h2
          style={{
            padding: "1rem",
            color: "#212450",
            display: "flex",
            justifyContent: "center",
            fontSize: 36,
            marginTop:"4rem"
          }}
        >
          Create User
        </h2>
        <div>
          <form className="row g-3  d-flex justify-content-end  p-4">
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
                    placeholder="Email"
                    name="email"
                    value={userData.email}
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
                    Password
                  </label>
                  <div style={{position:"relative"}}>
                  <input
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    type={showPassword ? "text" : "password"}
                    className="form-control border border-black"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                  />
                       <div
                          id="pasToggle"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <BsEyeSlashFill />
                          ) : (
                            <BsFillEyeFill />
                          )}
                        </div>
                        </div>
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
                    placeholder="Last Name"
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

export default ManageCreateU;
