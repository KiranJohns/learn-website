import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import fetchData from "../../axios";

const ManBundMatrix = () => {
  const makeRequest = fetchData();
  const [courseName, setCourseName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [course, setCourse] = useState([]);

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });
  const [individual, setIndividual] = useState(user.id);
  const [individuals, setIndividuals] = useState([]);

  useEffect(() => {
    makeRequest("GET", `/info/get-all-managers-created-by/${individual}`)
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
    makeRequest("POST", "/course/get-single-manager-matrix-bundle", form)
      .then((res) => {
        let temp = {
          color: "gray",
          progress: "",
        };
        // console.log(res.data.response);
        // let users = res.data.response;
        // let course_name = [];
        // let user_name = [];
        // let newUsers = users.map((item) => {
        //   let assigned = item.matrix_assigned.reverse();
        //   let enrolled = item.matrix.reverse();

        //   user_name.push(item.first_name + " " + item.last_name);

        //   let allCourses = [...assigned, ...enrolled];

        //   let CNames = allCourses.map((course) => {
        //     return course.bundle_name;
        //   });

        //   let courses = [];

        //   let newCName = [...removeDuplicates(CNames)];

        //   if (course_name.length < newCName.length) {
        //     course_name = newCName;
        //   } else if (course_name.length <= 0) {
        //     course_name = newCName;
        //   }

        //   allCourses.forEach((course) => {
        //     if (!courses.find((i) => i?.bundle_name == course?.bundle_name)) {
        //       course_name.forEach((item, id) => {
        //         if (item == course?.bundle_name) {
        //           courses[id] = course;
        //         }
        //       });
        //     }
        //   });

        //   return { ...item, course: courses };

        //   // delete item.matrix_assigned;
        //   // delete item.matrix;
        // });

        // let tempCourses = [];
        // course_name.forEach(() => {
        //   tempCourses.push(temp);
        // });

        // // users.forEach((item) => {
        // //   let temp = [...tempCourses];
        // //   let course = item["course"];
        // //   course_name.forEach((name, idx) => {
        // //     course.forEach((c) => {
        // //       if (c.bundle_name === name) {
        // //         temp[idx] = c;
        // //       }
        // //     });
        // //   });
        // //   item["course"] = temp;
        // // });
        // setCourseName(course_name);
        // setUserName(user_name);
        // setCourse(newUsers);
        // console.log("newUsers ", newUsers);
        let users = res.data.response;
        let course_name = [];
        let user_name = [];
        let newUsers = users.map((item) => {
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

          console.log('allCourses ',allCourses);
          allCourses.forEach(item => {
            if(item.progress == 0) {
              item['color'] = "red"
            } 
            if (item.progress > 0) {
              item['color'] = "yellow"
            } 
            if (item.progress === 100) {
              item['color'] = "green"
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
            // console.log("newCName ", newCName);
          });

          // console.log(course_name, newCName);
          newCName = [...removeDuplicates(newCName)];
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
        // console.log("courses ", newUsers);
        setCourseName(course_name);
        setUserName(user_name);
        setCourse(newUsers);
      })
      .catch((err) => {
        console.log("error ", err);
      });
  }, [individual]);
  return (
    <div className="row p-3">
      <div style={{ position: "relative" }} className="dash-neww">
        <span
          style={{
            position: "absolute",
            marginTop: "1.3rem",
            marginLeft: ".8rem",
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
          <div className="d-flex justify-content-center my-2 ">
            <h4>Bundle Matrix</h4>
          </div>

          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              margin: "1rem",
            }}
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
              {individuals.map((item) => (
                <option value={item.id}>
                  {item.first_name + " " + item.last_name}
                </option>
              ))}
            </Form.Select>
          </div>
          <Table bordered variant="light">
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

export default ManBundMatrix;
