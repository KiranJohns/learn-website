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
  const [allBundles, setAllBundles] = useState([]);
  const [myBundles, setMyBundles] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState(0);

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
    makeRequest("GET", "/bundle/get-all-bundles")
      .then((res) => {
        setAllBundles(res.data.response);
        setSelectedBundle(res.data.response[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    makeRequest("GET", `/info/get-all-managers-created-by/${manager}`)
      .then((res) => {
        // console.log('individual ',res.data.response);
        setIndividuals(res.data.response);
        setIndividual(res.data.response[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [manager]);
  useEffect(() => {
    const form = new FormData();
    form.append("manager_id", individual);
    makeRequest("POST", "/course/get-single-manager-matrix-bundle", form)
      .then(async (res) => {
        let response = res.data.response[0];

        let assigned = response.matrix_assigned.reverse();
        let enrolled = response.matrix.reverse();
        let allCourses = [...assigned, ...enrolled];
        if (
          response.id == user.id ||
          response.type_of_account != "individual"
        ) {
          allCourses = [...enrolled];
          assigned.forEach((assignItem) => {
            if (assignItem.count >= 1 && assignItem.owner == response.id) {
              allCourses.push({
                ...assignItem,
                all_courses: "[]",
                finished_course: "[]",
                on_going_course: "[]",
                unfinished_course: "[]",
                from_assigned: true,
              });
            }
          });
        }

        let c = [];
        allBundles.map((item) => {
          return allCourses.map((x) => {
            if ((x.course_id || x.bundle_id) == item.id) {
              c.push({
                ...item,
                all_courses: x.all_courses,
                finished_course: x.finished_course,
                on_going_course: x.on_going_course,
                unfinished_course: x.unfinished_course,
                unfinished_course: x.from_assigned ? JSON.parse(item.courses || "[]") : x.unfinished_course,
              });
            }
          });
        });

        let courses = await Promise.all(
          c.map(async (item) => {
            let res = await makeRequest(
              "GET",
              `/bundle/get-bundle-courses/${item.id}`
            );
            item["crs"] = res.data.response.allCourses;
            return item;
          })
        );

        setMyBundles(courses);
        setUserName(response.first_name + " " + response.last_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [individual]);

  useEffect(() => {
    let bundle = myBundles.find((item) => item.id == selectedBundle);
    let courses = bundle?.crs || [];
    let on_going_course = JSON.parse(bundle?.on_going_course || "[]");
    let finished_course = JSON.parse(bundle?.finished_course || "[]");
    let unfinished_course = JSON.parse(bundle?.unfinished_course || "[]");

    // console.log('all_courses ',JSON.parse(bundle?.all_courses || "[]"));
    console.log("on_going_course ", on_going_course);
    console.log("finished_course ", finished_course);
    console.log("unfinished_course ", unfinished_course);

    setCourse(() => {
      let course = [];
      let courseName = [];
      on_going_course.forEach((item) => {
        course.push({ color: "yellow" });
        courses.find((course) => {
          if (course.id == item) {
            courseName.push(course.name);
          }
        });
      });
      finished_course.forEach((item) => {
        course.push({ color: "green" });
        courses.find((course) => {
          if (course.id == item) {
            courseName.push(course.name);
          }
        });
      });
      unfinished_course.forEach((item) => {
        course.push({ color: "red" });
        courses.find((course) => {
          if (course.id == item) {
            courseName.push(course.name);
          }
        });
      });
      setCourseName(courseName);
      return course;
    });
  }, [selectedBundle]);

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
                <option>Select Company</option>
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
                  setIndividual(e.target.value);
                }}
                size=""
                style={{ border: ".1px solid #212a50", marginTop: "1rem" }}
                aria-label="Default select example"
              >
                <option>Select Manager</option>
                {individuals.map((item) => (
                  <option value={item.id}>
                    {item.first_name + " " + item.last_name}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                onChange={(e) => {
                  console.log(e.target.value);
                  setSelectedBundle(e.target.value);
                }}
                size=""
                defaultChecked={selectedBundle?.name}
                style={{ border: ".1px solid #212a50", marginTop: "1rem" }}
                aria-label="Default select example"
              >
                <option>Select Bundle</option>
                {myBundles.map((item) => {
                  return <option value={item.id}>{item?.name}</option>;
                })}
              </Form.Select>
            </div>
          </div>

          <Table
            style={{ marginTop: "8rem" }}
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
                  User
                </th>
                {courseName?.map((item) => (
                  <th
                    style={{
                      padding: "0 0.5rem",
                      color: "#fff",
                      background: "#212a50",
                      textWrap:"nowrap"
                    }}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {course.map((item, i) => {
                  if (i === 0) {
                    return (
                      <React.Fragment key={i}>
                        <td
                          style={{
                            padding: "0 0.5rem",
                            color: "#fff",
                            background: "#212a50",
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {userName}
                        </td>
                        <td
                          style={{
                            padding: "0 0.5rem",
                            color: "#3a3b3c",
                            backgroundColor: item?.color,
                            textAlign: "center",
                          }}
                        >
                          {(item?.color === "red" && "Not Started") ||
                            (item?.color === "yellow" && "In Progress") ||
                            (item?.color === "green" && "Finished") ||
                            (item?.color === "gray" && "No Bundle")}
                        </td>
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <td
                        style={{
                          padding: "0 0.5rem",
                          color: "#3a3b3c",
                          backgroundColor: item?.color,
                          textAlign: "center",
                        }}
                      >
                        {(item?.color === "red" && "Not Started") ||
                          (item?.color === "yellow" && "In Progress") ||
                          (item?.color === "green" && "Finished") ||
                          (item?.color === "gray" && "No Bundle")}
                      </td>
                    );
                  }
                })}
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MatrixBundComp;
