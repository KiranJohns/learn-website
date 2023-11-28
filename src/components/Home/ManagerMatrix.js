import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import fetchData from "../../axios";

const ManCoursMatrix = () => {
  const matrixDataUser = [
    {
      id: 1,
      name: "Rahul",
    },
    {
      id: 2,
      name: "Kiran",
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
          color: "#e04c4c",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "of the people",
          color: "#5a9676",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "by the people",
          color: "#f2a024",
          progress: "50%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "for the people",
          color: "#5a9676",
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
          color: "#f2a024",
          progress: "50%",
        },
      },
      {
        id: 2,
        userId: 2,
        course: {
          name: "some of the people",
          color: "#e04c4c",
          progress: "0%",
        },
      },
      {
        id: 3,
        userId: 2,
        course: {
          name: "of the people",
          color: "#5a9676",
          progress: "100%",
        },
      },
      {
        id: 4,
        userId: 2,
        course: {
          name: "for the people",
          color: "#f2a024",
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
          color: "#e04c4c",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "for the people",
          color: "#f2a024",
          progress: "50%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "of the people",
          color: "#5a9676",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "by the people",
          color: "#5a9676",
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
          color: "#f2a024",
          progress: "50%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "some of the people",
          color: "#e04c4c",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "of the people",
          color: "#5a9676",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "for the people",
          color: "#5a9676",
          progress: "100%",
        },
      },
    ],
  ];

  const sampleCourseName = [
    "some of the people",
    "by the people",
    "of the people",
    "for the people",
  ];

  const makeRequest = fetchData()
  const [matrixData, setMatrixData] = useState([])
  const [courseNames, setCourseNames] = useState([])
  const [userName, setUserName] = useState([])

  useEffect(() => {
    makeRequest("GET","/course/get-manager-matrix").then(res => {
      console.log(res.data.response);
    }).catch(err => {
      console.log(err);
    })
  },[])
  return (
    <div className="row">
      <div>
        <div className="dash-neww">
          <div className="col-12 p-2 m-2">
            <div className="d-flex justify-content-center my-2 ">
              <h4>Course Matrix</h4>
            </div>
            <div
              style={{ marginRight: "1rem" }}
              className="d-flex justify-content-center my-2 "
            >
              <Table bordered variant="light">
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th
                      style={{
                        padding: "0 0.5rem",
                        color: "#fff",
                        background: "#212a50",
                      }}
                    ></th>
                    {sampleCourseName.map((item) => (
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
                  {matrixDataCourse.map((item) => {
                    return (
                      <tr>
                        {item.map((course, i) => {
                          if (i == 0) {
                            return (
                              <>
                                <td
                                  style={{
                                    padding: "0 0.5rem",
                                    color: "white",
                                    background: "#212450",
                                    textAlign: "center",
                                  }}
                                >
                                  {
                                    matrixDataUser.find(
                                      (user) => user.id == course.userId
                                    ).name
                                  }
                                </td>
                                <td
                                  style={{
                                    padding: "0 0.5rem",
                                    color: "#3a3b3c",
                                    backgroundColor: item[i].course.color,
                                    textAlign: "center",
                                  }}
                                >
                                  {course.course.progress}
                                </td>
                              </>
                            );
                          } else {
                            return (
                              <td
                                style={{
                                  padding: "0 0.5rem",
                                  color: "#3a3b3c",
                                  backgroundColor: item[i].course.color,
                                  textAlign: "center",
                                }}
                              >
                                {item[i].course.progress}
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
      </div>
    </div>
  );
};

export default ManCoursMatrix;
