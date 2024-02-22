import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import fetchData from "../../axios";
import { jwtDecode } from "jwt-decode";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const MatrixBundComp = () => {
  const makeRequest = fetchData();
  const [courseName, setCourseName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [course, setCourse] = useState([]);
  const [managers, setManagers] = useState([]);
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });
  const [manager, setManager] = useState(user.id);

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  useEffect(() => {
    makeRequest("GET", "/info/get-all-managers")
      .then((res) => {
        setManagers(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const form = new FormData();
    form.append("manager_id", manager);
    makeRequest("POST", "/course/get-manager-matrix-bundle", form)
      .then((res) => {
        let temp = {
          color: "gray",
          progress: "",
        };
        // console.log('matrix ',res.data.response);
        let users = res.data.response;
        let course_name = [];
        let user_name = [];
        let newUsers = users.map((item) => {
          let assigned = item.matrix_assigned.reverse();
          let enrolled = item.matrix.reverse();
          // console.log(assigned, enrolled);

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
            if (!courses.find((i) => i?.course_name == course?.bundle_name)) {
              course_name.forEach((item, id) => {
                if (item == course?.bundle_name) {
                  courses[id] = course;
                }
              });
            }
          });

          // console.log('courses ',courses);
          return { ...item, course: courses };
        });

        let tempCourses = [];
        course_name.forEach(() => {
          tempCourses.push(temp);
        });
        
        // newUsers.forEach((item) => {
        //   console.log('item ',item);
        //   let temp = [...tempCourses];
        //   let course = item["course"];
        //   console.log();
        //   course_name.forEach((name, idx) => {
        //     course.forEach((c) => {
        //       if (c.course_name === name) {
        //         temp[idx] = c;
        //       }
        //     });
        //   });
        //   item["course"] = temp;
        // });
        console.log("users ", newUsers);
        setCourseName(course_name);
        setUserName(user_name);
        setCourse(newUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [manager]);
  return (
    <div className="row p-3">
      <div style={{ position: "relative" }} className="dash-neww bg-white">
        <span
          style={{ position: "absolute", marginTop: ".2rem", zIndex: "99" }}
          className="matrix-back-hidden"
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
        <div style={{ position: "absolute" }} className="matrix-hidden">
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
              <h4 style={{ fontSize: "1.5rem" }}>Bundle Matrix</h4>
            </div>

            <div
              style={{ position: "absolute", top: "0", right: "0" }}
              className="col-4 p-1 m-"
            >
              <Form.Select
                onChange={(e) => {
                  console.log(e.target.value);
                  setManager(e.target.value);
                }}
                size=""
                style={{ border: ".1px solid #212a50" }}
                aria-label="Default select example"
              >
                <option value={user?.id}>
                  {user?.first_name + " " + user?.last_name}
                </option>
                {managers.map((item) => (
                  <option value={item.id}>
                    {item.first_name + " " + item.last_name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          <Table
            style={{ marginTop: ".5rem" }}
            responsive
            bordered
            variant="light"
          >
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th
                  style={{ background: "#212a50", color: "white" }}
                  colSpan={1}
                ></th>
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
                {courseName?.map((item) => (
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
                                color: "#fff",
                                background: "#212a50",
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
                              {(course?.color == "red" && "not started") ||
                                (course?.color == "yellow" && "in progress") ||
                                (course?.color == "green" && "finished") ||
                                (course?.color == "gray" && "no bundle")}
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
                            {(course?.color == "red" && "not started") ||
                              (course?.color == "yellow" && "in progress") ||
                              (course?.color == "green" && "finished") ||
                              (course?.color == "gray" && "no bundle")}
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

export default MatrixBundComp;
