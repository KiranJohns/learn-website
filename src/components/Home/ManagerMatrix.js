import React from "react";
import Table from "react-bootstrap/Table";
import fetchData from "../../axios";
import { useEffect } from "react";
import { useState } from "react";

const ManCoursMatrix = () => {
  const matrixDataUser = [
    {
      id: 1,
      name: "Stark",
    },
    {
      id: 2,
      name: "Miles",
    },
    {
      id: 3,
      name: "Aloshy",
    },
    {
      id: 4,
      name: "Alba",
    },
  ];

  const matrixDataCourse = [
    [
      {
        id: 1,
        userId: 1,
        course: {
          name: "some of the people",
          color: "#ae0000",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "of the people",
          color: "#549C30",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "by the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "for the people",
          color: "#549C30",
          progress: "100%",
        },
      },
    ],
    [
      {
        id: 1,
        userId: 2,
        course: {
          name: "by the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
      {
        id: 2,
        userId: 2,
        course: {
          name: "some of the people",
          color: "#ae0000",
          progress: "0%",
        },
      },
      {
        id: 3,
        userId: 2,
        course: {
          name: "of the people",
          color: "#549C30",
          progress: "100%",
        },
      },
      {
        id: 4,
        userId: 2,
        course: {
          name: "for the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
    ],
    [
      {
        id: 1,
        userId: 3,
        course: {
          name: "some of the people",
          color: "#ae0000",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "for the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "of the people",
          color: "#549C30",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "by the people",
          color: "#549C30",
          progress: "100%",
        },
      },
    ],
    [
      {
        id: 1,
        userId: 4,
        course: {
          name: "by the people",
          color: "#f7b500",
          progress: "50%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "some of the people",
          color: "#ae0000",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "of the people",
          color: "#549C30",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "for the people",
          color: "#549C30",
          progress: "100%",
        },
      },
    ],
  ];

  // const courseName = [
  //   "some of the people",
  //   "by the people",
  //   "of the people",
  //   "for the people",
  // ];

  const makeRequest = fetchData();
  const [courseName, setCourseName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [course, setCourse] = useState([]);
  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  useEffect(() => {
    console.clear();
    makeRequest("GET", "/course/get-manager-matrix-course")
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
          
          item["course"] = courses;

          // delete item.matrix_assigned;
          // delete item.matrix;
        });
        
        let tempCourses = []
        course_name.forEach(() => {
          tempCourses.push(temp);
        });
        console.log(users);
        
        users.forEach((item => {
          let temp = [...tempCourses]
          let course = item['course']
          course_name.forEach((name,idx) => {
            course.forEach(c => {
              if (c.course_name === name) {
                temp[idx] = c
              }
            })
          });
          item['course'] = temp
        }))
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
      <div style={{ position: "relative" }} className="dash-neww ">
        <div style={{ position: "absolute" }} className="">
          <span className="m-1" style={{ display: "flex" }}>
            <div
              style={{
                height: "1.5rem",
                width: "3rem",
                background: "#ae0000",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              0%
            </div>
            <div
              style={{
                height: "1.5rem",
                width: "3rem",
                background: "#f7b500",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              50%
            </div>
            <div
              style={{
                height: "1.5rem",
                width: "3rem",
                background: "#549C30",
                color: "white",
                textAlign: "center",
              }}
              className="redd"
            >
              100%
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
                  colSpan={5}
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
                                color: "white",
                                background: "#212450",
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
                              {course.progress ? course.progress + "%" : "0%"}
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
                            {course.progress ? course.progress + "%" : "0%"}
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
