import React, { Component } from "react";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class DashCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        country: "",
        password: "",
        phone: "",
      },
    };

    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.mackRequest = fetchData()
  }

  handleOnchange = (e) => {
    e.persist();
    this.setState({
      ...this.state,
      userData: {
        ...this.state.userData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit(e) {
    e.persist();
    console.log(this.state.userData);
    this.mackRequest("POST","/info/create-sub-user",{...this.state.userData,phone: Number(this.state.userData.phone)}).then(res => {
      toast.success("user created")
    }).catch(err => {
      // console.log(err.data);
      toast.error(err.data.data.response)
    })
  }

  render() {
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
              fontSize: 42,
            }}
          >
            Create User
          </h2>
          <div className="row g-3  d-flex justify-content-end  ">
            <form className="col-sm-10 col-md-8 d-block mx-auto">
              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  First Name
                </label>
                <input
                  onChange={this.handleOnchange}
                  type="text"
                  className="form-control border border-black"
                  id="first_name"
                  placeholder="first_name"
                  name="first_name"
                  value={this.state.userData.first_name}
                />
              </div>
              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  Last Name
                </label>
                <input
                  onChange={this.handleOnchange}
                  type="text"
                  className="form-control border border-black"
                  id="last_name"
                  name="last_name"
                  placeholder="last_name"
                  value={this.state.userData.last_name}
                />
              </div>

              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  Email
                </label>
                <input
                  onChange={this.handleOnchange}
                  type="email"
                  className="form-control border border-black"
                  id="email"
                  placeholder="name@example.com"
                  name="email"
                  value={this.state.userData.email}
                />
              </div>

              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  Country
                </label>
                <input
                  onChange={this.handleOnchange}
                  type="text"
                  className="form-control border border-black"
                  id="Country"
                  name="country"
                  placeholder="Country"
                  value={this.state.userData.country}
                />
              </div>

              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  City
                </label>
                <input
                  onChange={this.handleOnchange}
                  type="text"
                  className="form-control border border-black"
                  id="city"
                  name="city"
                  placeholder="city"
                  value={this.state.userData.city}
                />
              </div>
              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  password
                </label>
                <input
                  onChange={this.handleOnchange}
                  type="password"
                  className="form-control border border-black"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={this.state.userData.password}
                />
              </div>
              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  phone
                </label>
                <input
                  onChange={this.handleOnchange}
                  type="number"
                  className="form-control border border-black"
                  id="phone"
                  name="phone"
                  placeholder="phone"
                  value={this.state.userData.phone}
                />
              </div>

              <div class="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  Type of user
                </label>
                <select
                  onChange={this.handleOnchange}
                  className="form-control border border-black"
                  id="exampleFormControlSelect1"
                >
                  <option>Select</option>
                  <option value="individual">individual</option>
                  <option value="manager">manager</option>
                </select>
              </div>

              <div className="form-group p-2 mb-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DashCreate;
