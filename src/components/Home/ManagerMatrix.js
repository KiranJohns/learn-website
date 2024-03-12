import React from "react";
import Table from "react-bootstrap/Table";
import fetchData from "../../axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Form from "react-bootstrap/Form";

const ManCoursMatrix = () => {
  const makeRequest = fetchData();
  const [courseName, setCourseName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [course, setCourse] = useState([]);
  const [individuals, setIndividuals] = useState([]);

  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });
  const [individual, setIndividual] = useState(0);
  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  function countSpecificDuplicate(arr, target) {
    let count = 0;
    const counts = {};
    arr.forEach((element) => {
      counts[element] = (counts[element] || 0) + 1;
      if (element === target && counts[element] === 2) {
        count++;
      }
    });
    return count;
  }
  useEffect(() => {
    makeRequest("GET", `/info/get-all-managers-created-by/${user.id}`)
      .then((res) => {
        console.log("individual ", res.data.response);
        setIndividuals(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.clear();
    const form = new FormData();
    form.append("manager_id", individual);
    makeRequest("POST", "/course/get-single-manager-matrix-course", form)
      .then((res) => {
        let temp = {
          color: "gray",
          progress: "",
        };
        // console.log(res.data.response);
        let users = res.data.response;
        let course_name = [];
        let user_name = [];

        // console.log("users ", users);

        let newUsers = users.map((item) => {
          let assigned = item.matrix_assigned.reverse();
          let enrolled = item.matrix.reverse();

          // let CNames = [];
          user_name.push(item.first_name + " " + item.last_name);

          let allCourses = [...assigned, ...enrolled];

          allCourses.forEach((item) => {
            if(Number(item.progress) > 0) {
              console.log('yellow');
              item["color"] = "yellow";
            }
            if (Number(item.progress) >= 80) {
              console.log('green');
              item["color"] = "green";
            } 
            if(Number(item.progress) <= 0) {
              console.log('red');
              item["color"] = "red";
            }
          });

          let CNames = allCourses.map((course) => {
            return course.course_name;
          });

          let courses = [];

          let newCName = [...removeDuplicates(CNames)];

          if (course_name.length < newCName.length) {
            course_name = newCName;
          } else if (course_name.length <= 0) {
            course_name = newCName;
          }

          allCourses.forEach((course) => {
            if (!courses.find((i) => i?.course_name == course?.course_name)) {
              course_name.forEach((item, id) => {
                if (item == course?.course_name) {
                  courses[id] = course;
                }
              });
            }
          });

          console.log("course_name ", course_name);

          return { ...item, course: allCourses };
        });

        let tempCourses = [];
        course_name.forEach(() => {
          tempCourses.push(temp);
        });

        newUsers.forEach((item) => {
          let temp = [...tempCourses];
          let course = item["course"];
          course_name.forEach((name, idx) => {
            course.forEach((c) => {
              if (c.course_name === name) {
                temp[idx] = c;
              }
            });
          });
          item["course"] = temp;
        });
        setCourseName(course_name);
        setUserName(user_name);
        setCourse(newUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [individual]);
  return (
    <div className="row p-3">
      <div style={{ position: "relative" }} className="dash-neww bg-white">
        <span
          style={{
            position: "absolute",
            marginTop: ".2rem",
           
            zIndex: "99",
          }}
          className="matrix-man-back"
        >
          <button
            style={{ background: "white", borderRadius: ".7rem" }}
            onClick={() => history.back()}
          >
            {" "}
            <FaArrowAltCircleLeft
              className="back-fontsize"
              style={{ color: "#212a50" }}
            />
          </button>
        </span>
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
        <div style={{ position: "relative" }}>
            <div className="matrix-head my-2 ">
              <h4 style={{ fontSize: "1.5rem" }}>Course Matrix</h4>
            </div>
          </div>
          <div
            style={{ position: "absolute", top: "0", right: "0", margin: "1rem" }}
            className="col-4 p-1 m-"
          >
            <Form.Select
              onChange={(e) => {
                console.log(e.target.value);
                setIndividual(e.target.value);
              }}
              size=""
              style={{ border: ".1px solid #212a50" }}
              aria-label="Default select example"
            >
              <option>Select Individual</option>
              {individuals.map((item) => (
                <option value={item.id}>
                  {item.first_name + " " + item.last_name}
                </option>
              ))}
            </Form.Select>
          </div>
          <Table responsive bordered variant="light">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th
                  style={{ background: "#212a50", color: "white" }}
                  colSpan={1}
                ></th>
                <th
                  style={{ background: "#212a50", color: "white" }}
                  colSpan={70}
                >
                  Course Name
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
                                background: "#fff",
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
                              {(course?.color == "red" && "Not Started") ||
                                (course?.color == "yellow" && "In Progress") ||
                                (course?.color == "green" && "Completed") ||
                                (course?.color == "gray" && "No Course")}
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
                            {(course?.color == "red" && "Not Started") ||
                              (course?.color == "yellow" && "In Progress") ||
                              (course?.color == "green" && "Completed") ||
                              (course?.color == "gray" && "No Course")}
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

export default ManCoursMatrix;
