import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import fetchData from "../../axios";
import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ManBundMatrix = () => {
  const makeRequest = fetchData();
  const [courseName, setCourseName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [course, setCourse] = useState([]);


  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  useEffect(() => {
    console.clear();
    makeRequest("GET", "/course/get-manager-matrix-bundle")
      .then((res) => {
        let temp = {
          color: "gray",
          progress: "",
        };
        // console.log(res.data.response);
        let users = res.data.response;
        let course_name = [];
        let user_name = [];
        users.forEach((item) => {
          let assigned = item.matrix_assigned.reverse();
          let enrolled = item.matrix.reverse();

          user_name.push(item.first_name + " " + item.last_name);

          let allCourses = [...assigned, ...enrolled];

          let CNames = allCourses.map((course) => {
            return course.bundle_name;
          });

          let courses = [];

          let newCName = [...removeDuplicates(CNames)];

          if (course_name.length < newCName.length) {
            course_name = newCName;
          } else if (course_name.length <= 0) {
            course_name = newCName;
          }

          allCourses.forEach((course) => {
            if (!courses.find((i) => i?.bundle_name == course?.bundle_name)) {
              course_name.forEach((item, id) => {
                if (item == course?.bundle_name) {
                  courses[id] = course;
                }
              });
            }
          });

          item["course"] = courses;

          // delete item.matrix_assigned;
          // delete item.matrix;
        });

        let tempCourses = [];
        course_name.forEach(() => {
          tempCourses.push(temp);
        });
        console.log(users);

        users.forEach((item) => {
          let temp = [...tempCourses];
          let course = item["course"];
          course_name.forEach((name, idx) => {
            course.forEach((c) => {
              if (c.bundle_name === name) {
                temp[idx] = c;
              }
            });
          });
          item["course"] = temp;
        });
        setCourseName(course_name);
        setUserName(user_name);
        setCourse(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="row p-3">
      <div style={{ position: "relative" }} className="dash-neww">
      <span style={{position:'absolute',  marginTop:"1.3rem",marginLeft:".8rem" , zIndex:"99"}} className="matrix-man-back"><button style={{background:"white",borderRadius:".7rem"}} onClick={() => history.back()}> <FaArrowAltCircleLeft className="back-fontsize"  style={{color:"#212a50", }}/></button></span >
      <div style={{ position: "absolute" }} className="manager-matrix">
          <span className="m-3" style={{ display: "flex" }}>
            <div
              style={{
                height: "1.5rem",
                width: "6rem",
                background: "#ae0000",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
             Not Started
            </div>
            <div
              style={{
                height: "1.5rem",
                width: "6rem",
                background: "#f7b500",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              In Progress
            </div>
            <div
              style={{
                height: "1.5rem",
                width: "6rem",
                background: "#549C30",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              Completed
            </div>
          </span>
        </div>
        <div className="col-12 p-2 m-2">
          <div className="d-flex justify-content-center my-2 ">
            <h4>Bundle Matrix</h4>
          </div>

          <Table bordered variant="light">
            <thead>
              <tr style={{ textAlign: "center" }}>
              <th
                  style={{ background: "#212a50", color: "white" }}
                  colSpan={1}
                >
                 
                </th>
                <th
                  style={{ background: "#212a50", color: "white" }}
                  colSpan={60}
                >
                  Bundle Name
                </th>
              </tr>
            </thead>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th
                  style={{
                    padding: "0 0.5rem",
                    color: "#fff",
                    background: "#212a50",
                  }}
                >
                  Individual
                </th>
                {courseName.map((item) => (
                  <th
                    style={{
                      padding: "0 0.5rem",
                      color: "#fff",
                      background: "#212a50",
                    }}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {course.map((item, i) => {
                return (
                  <tr>
                    {item.course.map((course, idx) => {
                      if (idx == 0) {
                        return (
                          <>
                            <td
                              style={{
                                padding: "0 0.5rem",
                                color: "#212450",
                                background: "white",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              {userName[i]}
                            </td>
                            <td
                              style={{
                                padding: "0 0.5rem",
                                color: "#3a3b3c",
                                backgroundColor: course?.color,
                                textAlign: "center",
                              }}
                            >
                              {course?.color == "red" && "not started" || course?.color == "yellow" && "in progress" || course?.color == "green" && "finished" || course?.color == "gray" && "" }
                            </td>
                          </>
                        );
                      } else {
                        return (
                          <td
                            style={{
                              padding: "0 0.5rem",
                              color: "#3a3b3c",
                              backgroundColor: course.color,
                              textAlign: "center",
                            }}
                          >
                            {course?.color == "red" && "not started" || course?.color == "yellow" && "in progress" || course?.color == "green" && "finished" || course?.color == "gray" && "" }
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManBundMatrix;
