import React from "react";
import Table from "react-bootstrap/Table";
import fetchData from "../../axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ManCoursMatrix = () => {
  const makeRequest = fetchData();
  const [courseName, setCourseName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [course, setCourse] = useState([]);
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
    console.clear();
    makeRequest("POST", "/course/get-manager-matrix-course")
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

          let CNames = [];
          user_name.push(item.first_name + " " + item.last_name);

          let allCourses = [...assigned, ...enrolled];

          // console.log("allCourses ", allCourses);
          allCourses.forEach((course) => {
            let flag = false;
            CNames.forEach((item) => {
              if (item.name == course.course_name) {
                item.count += 1;
                flag = true;
              }
            });
            if (!flag) {
              CNames.push({ name: course.course_name, count: 1 });
            }
          });

          let newCName = [];
          CNames.forEach((item) => {
            let dupCount = countSpecificDuplicate(course_name, item.name);
            // console.log(course_name);
            // console.log(count, item.name);
            let count = 0
            if(item.count > dupCount) {
              count = item.count - dupCount
            } else if (dupCount > item.count) {
              count = dupCount - item.count
            } else {
              count = 1
            }
            newCName = newCName.concat(Array(count).fill(item.name));
          });

          newCName = removeDuplicates(newCName);

          if (course_name.length < newCName.length) {
            course_name = newCName;
          }
          console.log("course_name ", course_name);

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
  }, []);
  return (
    <div className="row p-3">
      <div style={{ position: "relative" }} className="dash-neww ">
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
            <h4>Course Matrix</h4>
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
