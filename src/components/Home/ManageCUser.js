import React, { Component } from "react";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ManageCreateU extends Component {
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
        user_type: "individual",
      },
    };

    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mackRequest = fetchData();
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
    this.mackRequest("POST", "/info/create-manager-individual", {
      ...this.state.userData,
      phone: Number(this.state.userData.phone),
    })
      .then((res) => {
        toast.success("user created");
      })
      .catch((err) => {
        console.log(err.data);
        toast.error(err.data);
      });
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
        <div className="dash-shadow mt-20 p-4">
          <h2
            style={{
              padding: "1rem",
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            Create User
          </h2>
          <div >
            <form className="row g-3  d-flex justify-content-end  ">

              <div className="col-12 d-flex mx-auto">
             
             <div className="col-6">
              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  First Name
                </label>
                <input
                 style={{background:"#f7fbff"}}
                  onChange={this.handleOnchange}
                  type="text"
                  className="form-control border border-black"
                  id="first_name"
                  placeholder="First Name"
                  name="first_name"
                  value={this.state.userData.first_name}
                />
              </div>

              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  Last Name
                </label>
                <input
                 style={{background:"#f7fbff"}}
                  onChange={this.handleOnchange}
                  type="text"
                  className="form-control border border-black"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  value={this.state.userData.last_name}
                />
              </div>

              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  Email
                </label>
                <input
                 style={{background:"#f7fbff"}}
                  onChange={this.handleOnchange}
                  type="email"
                  className="form-control border border-black"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.userData.email}
                />
              </div>

              <div class="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  Country
                </label>
                <select
                 style={{background:"#f7fbff"}}
                  onChange={this.handleOnchange}
                  className="form-control border border-black"
                  id="exampleFormControlSelect1"
                  name="country"
                >
                  <option>Select</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
              </div>

               <div className="col-6">
              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  City
                </label>
                <input
                 style={{background:"#f7fbff"}}
                  onChange={this.handleOnchange}
                  type="text"
                  className="form-control border border-black"
                  id="city"
                  name="city"
                  placeholder="City"
                  value={this.state.userData.city}
                />
              </div>
              <div className="form-group p-2 mb-4">
                <label className="text-black" for="FormControlInput1">
                  Password
                </label>
                <input
                 style={{background:"#f7fbff"}}
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
                  Phone
                </label>
                <input
                 style={{background:"#f7fbff"}}
                  onChange={this.handleOnchange}
                  type="number"
                  className="form-control border border-black"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={this.state.userData.phone}
                />
              </div>
              </div>

              </div> 
              <div  className="form-group d-flex justify-content-center p-2 mb-4">
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

export default ManageCreateU;
