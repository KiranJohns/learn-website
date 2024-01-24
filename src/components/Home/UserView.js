import React, { useEffect, useState } from "react";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useRouter } from "next/router";

const ViewUser = () => {
  const [password, setPassword] = useState("");
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
  const route = useRouter();
  let { id, from } = route?.query;

  useEffect(() => {
    // let info = route?.query;
    console.log(id, from);
    mackRequest("GET", `/info/get-user-by-id/${id}`)
      .then((res) => {
        console.log(res.data.response);
        setUserData(res.data.response);
        setPassword(res.data.response.password);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function changePassword() {
    let url = '/auth/forgot-password'
    mackRequest("POST",url,{
      email: userData.email
    }).then(res => {
      toast.success(`Password reset link sent to the user's email`)
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

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
    if (password == userData.password) return;

    let url = "/info/updated-user";
    console.log(userData);

    mackRequest("POST", url, {
      ...userData,
      user_type: userData.type_of_account,
      phone: Number(userData.phone),
    })
      .then((res) => {
        toast.success("Successfully updated");
        if (from === "company-manager") {
          location.href = "/company/managers";
        } else if (from === "company-individual") {
          location.href = "/company/showuser";
        } else {
          location.href = "/manager/individuals";
        }
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
      <div className="dash-shadow mt-20">
        <h2
          style={{
            padding: "1.5rem",
            color: "#212450",
            display: "flex",
            justifyContent: "center",
            fontSize: 38,
          }}
        >
          Update User
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
                    disabled
                    type="email"
                    className="form-control border border-black"
                    id="email"
                    placeholder="name@example.com"
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
                    <option value={userData.country}>{userData.country}</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                <div className="form-group p-2 mb-4">
                  <label className="text-black" htmlFor="FormControlInput1">
                    Type of User
                  </label>
                  <select
                    style={{ background: "#f7fbff", textTransform: 'capitalize' }}
                    onChange={handleOnchange}
                    className="form-control border border-black"
                    id="exampleFormControlSelect1"
                    name="type_of_account"
                  >
                    <option value={userData.type_of_account}>
                      {userData.type_of_account}
                    </option>
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
                    {/* <input
                      style={{ background: "#f7fbff" }}
                      onChange={handleOnchange}
                      type={showPassword ? "text" : "password"}
                      className="form-control border border-black"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={"***************"}
                    /> */}
                    {/* <button>hi</button> */}
                    <div className="input-group-append">
                      <button class="btn" style={{color: '#fff', backgroundColor: '#212A50'}} onClick={changePassword} type="button">
                        Change Password
                      </button>
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

export default ViewUser;
