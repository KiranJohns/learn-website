import React, { Component, useState } from "react";

function BundleCare({name}) {
  const [fakeCount, setFakeCount] = useState(0);
  function handleClick() {}
  return (
    <div className="container mt-100">
      <div className="row">
        <div className="col-xxl-6  col-xl-6 col-lg-12 col-md-6 col-sm-6 text-center">
          <h1 style={{marginBottom: "1rem"}} >{name}</h1>
          <h1></h1>
          <p>
            The Care Certificate is delivered through our simple to use, online
            Learning Management System (LMS) that records and evidences the
            information needed for every of the fifteen standards. In addition,
            we've created workbooks which offer guidance on what aspects of
            every Care Certificate standard ought to be determined within the
            workplace. This is far and away the foremost efficient and value
            effective methodology to deliver the Care Certificate in your
            organisation.
          </p>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="course__more d-flex justify-content-around" style={{width: '15rem'}}>
              <div
                className="course__status d-flex align-items-center">
                <span className="sky-blue mb-3" style={{ marginBottom: "1px" }}>
                  £12
                </span>
              </div>
              <span style={{ marginTop: "2px" }}>
                <div className="d-flex ml-1">
                  <button
                    className="cart-minus "
                    onClick={() =>
                      setFakeCount((prev) => {
                        if (prev <= 0) {
                          return 0;
                        }
                        return prev - 1;
                      })
                    }
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <p className="p-1">{fakeCount}</p>
                  <button
                    className="cart-plus"
                    onClick={() => setFakeCount((prev) => prev + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </span>
              <span style={{ marginBottom: ".1rem" }}>
                <button
                  className="btn btn-primary btn-sm mb-2 d-flex justify-content-between align-items-center"
                  type="button"
                  // class=""
                  style={{ outline: "none", border: "none" }}
                  onClick={() => handleClick()}
                >
                  Add
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xxl-6  col-xl-6 col-md-6 col-sm-6 ">
          <div className="d-flex justify-content-center p-2">
            <img
              src="/assets/img/course/bundle/certificate1.png"
              height={450}
              alt="image "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BundleCare;
