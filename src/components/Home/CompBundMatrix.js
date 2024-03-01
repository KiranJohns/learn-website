import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { jwtDecode } from "jwt-decode";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import fetchData from "../../axios";

const MatrixBundComp = () => {
  const makeRequest = fetchData();
  const [courseName, setCourseName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [course, setCourse] = useState([]);
  const [managers, setManagers] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });
  const [individual, setIndividual] = useState(user.id);
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
    makeRequest("GET", `/info/get-all-managers-created-by/${manager}`)
      .then((res) => {
        console.log('individual ',res.data.response);
        setIndividuals(res.data.response);
        setIndividual(res.data.response[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  },[manager])
  useEffect(() => {
    const form = new FormData();
    form.append("manager_id", individual);
    makeRequest("POST", "/course/get-single-manager-matrix-bundle", form)
      .then((res) => {
        let temp = {
          color: "gray",
          progress: "",
        };
        let users = res.data.response;
        let course_name = [];
        let user_name = [];
        let newUsers = users.map((item) => {
          console.log(item);
          let assigned = item.matrix_assigned.reverse();
          let enrolled = item.matrix.reverse();
          let allCourses = [...assigned, ...enrolled];
          if (user.id == item.id) {
            allCourses = [...enrolled];
            assigned.forEach((assignItem) => {
              if (assignItem.count >= 1) {
                allCourses.push(assignItem);
              }
            });
          } else if (item.type_of_account != "individual") {
            allCourses = [...enrolled];
            assigned.forEach((assignItem) => {
              if (assignItem.count >= 1 && assignItem.owner == item.id) {
                allCourses.push(assignItem);
              }
            });
          }

          allCourses.map(item => {
            if(item.progress == 0) {
              item['color'] = 'red'
            }
            if(item.progress > 0) {
              item['color'] = 'yellow'
            }
            if(item.progress == 100) {
              item['color'] = 'green'
            }
          })

          let CNames = [];
          user_name.push(item.first_name + " " + item.last_name);

          allCourses.forEach((course) => {
            let flag = false;
            CNames.forEach((item) => {
              if (item.name == course.bundle_name) {
                item.count += 1;
                flag = true;
              }
            });
            if (!flag) {
              CNames.push({ name: course.bundle_name, count: 1 });
            }
          });

          let newCName = [];
          CNames.forEach((item) => {
            newCName = newCName.concat(Array(item.count).fill(item.name));
          });

          if (course_name.length < newCName.length) {
            course_name = newCName;
          }

          return { ...item, course: allCourses };
        });

        let courses = [];
        course_name.forEach(() => {
          courses.push(temp);
        });

        newUsers.forEach((item) => {
          let tempCourses = [...courses];
          let course = [...item.course];
          course_name.forEach((name, idx) => {
            let flag = false;
            course.forEach((c) => {
              if (name == c.bundle_name) {
                tempCourses[idx] = c;
                flag = true;
                return;
              }
            });
            if (flag) {
              course.shift();
            }
          });
          item.course = tempCourses;
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
              <Form.Select
                onChange={(e) => {
                  console.log(e.target.value);
                  setIndividual(e.target.value);
                }}
                size=""
                style={{ border: ".1px solid #212a50", marginTop: "1rem" }}
                aria-label="Default select example"
              >
                {individuals.map((item) => (
                  <option value={item.id}>
                    {item.first_name + " " + item.last_name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          <Table
            style={{ marginTop: "4rem" }}
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
                    {item.course.map((course, idx) => {
                      if (idx == 0) {
                        return (
                          <>
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
                                (course?.color == "green" && "Finished") ||
                                (course?.color == "gray" && "No Bundle")}
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
                              (course?.color == "green" && "Finished") ||
                              (course?.color == "gray" && "No Bundle")}
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
