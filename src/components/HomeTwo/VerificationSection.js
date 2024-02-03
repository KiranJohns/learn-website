import React, { useState } from "react";
import fetchData from "../../axios";
const VerificationSection = () => {
  const [userData, setUserData] = useState({
    id: "",
    user_name: "",
  });
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false)
  const makeRequest = fetchData();

  const handleOnchange = (e) => {
    e.persist();
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.persist();
    console.log(userData);
    makeRequest("POST", "/certificate/validate-certificates", userData)
      .then((res) => {
        console.log(res);
        if (res.data.response.length >= 1) {
          setFlag(true)
          setMessage(
            `"${userData.user_name}" Certificate Number "${userData.id}" valid`
            );
          } else {
          setFlag(false)
          setMessage(
            `"${userData.user_name}" Certificate Number "${userData.id}" not valid`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="about__area pt-90 pb-45">
      <div className="container">
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* <h1 style={{color:"#212a50"}}>Certificate Verification</h1> */}
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              padding: "2rem",
              borderRadius: ".5rem",
            }}
          >
            <form className="row g-3  d-flex justify-content-end  ">
              <div className="col-12">
                <h5 style={{color: flag ? 'green' : 'red'}}>{message && message}</h5>
                <div className="form-group p-2 mb-4">
                  <label
                    style={{
                      color: "#212a50",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                    className=""
                    htmlFor="FormControlInput1"
                  >
                    Enter Full Name
                  </label>
                  <input
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    type="text"
                    className="form-control border border-black"
                    id="user_name"
                    placeholder="Full Name"
                    name="user_name"
                    value={userData.user_name}
                  />
                </div>

                <div className="form-group p-2 ">
                  <label
                    style={{
                      color: "#212a50",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                    htmlFor="FormControlInput1"
                  >
                    Enter Certificate Number
                  </label>
                  <input
                    style={{ background: "#f7fbff" }}
                    onChange={handleOnchange}
                    type="id"
                    className="form-control border border-black"
                    id="id"
                    placeholder="LFCXXX"
                    name="id"
                    value={userData.id}
                  />
                </div>
              </div>

              <div className="form-group d-flex justify-content-center mb-4">
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
    </section>
  );
};

export default VerificationSection;
