import React from "react";

const DashMatrix = () => {
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
          color: "red",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "of the people",
          color: "green",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "by the people",
          color: "yellow",
          progress: "75%",
        },
      },
      {
        id: 1,
        userId: 1,
        course: {
          name: "for the people",
          color: "orange",
          progress: "30%",
        },
      },
    ],
    [
      {
        id: 1,
        userId: 2,
        course: {
          name: "by the people",
          color: "yellow",
          progress: "75%",
        },
      },
      {
        id: 2,
        userId: 2,
        course: {
          name: "some of the people",
          color: "red",
          progress: "0%",
        },
      },
      {
        id: 3,
        userId: 2,
        course: {
          name: "of the people",
          color: "green",
          progress: "100%",
        },
      },
      {
        id: 4,
        userId: 2,
        course: {
          name: "for the people",
          color: "orange",
          progress: "30%",
        },
      },
    ],
    [
      {
        id: 1,
        userId: 3,
        course: {
          name: "some of the people",
          color: "red",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "for the people",
          color: "orange",
          progress: "30%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "of the people",
          color: "green",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 3,
        course: {
          name: "by the people",
          color: "yellow",
          progress: "75%",
        },
      },
    ],
    [
      {
        id: 1,
        userId: 4,
        course: {
          name: "by the people",
          color: "yellow",
          progress: "75%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "some of the people",
          color: "red",
          progress: "0%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "of the people",
          color: "green",
          progress: "100%",
        },
      },
      {
        id: 1,
        userId: 4,
        course: {
          name: "for the people",
          color: "orange",
          progress: "30%",
        },
      },
    ],
  ];

  const courseName = [
    "some of the people",
    "by the people",
    "of the people",
    "for the people",
  ];
  return (
    <div>
      <table style={{ border: "2px solid black" }}>
        <tr style={{ border: "2px solid black" }}>
          <th
            style={{
              border: "2px solid black",
              padding: "0 0.5rem",
              color: "black",
            }}
          >
            User
          </th>
          {courseName.map((item) => (
            <th
              style={{
                border: "2px solid black",
                padding: "0 0.5rem",
                color: "black",
              }}
            >
              {item}
            </th>
          ))}
        </tr>
        {matrixDataCourse.map((item) => {
          return <tr>
            {item.map((course, i) => {
              if (i == 0) {
                return (
                  <>
                    <td
                      style={{
                        border: "2px solid black",
                        padding: "0 0.5rem",
                        color: "black",
                      }}
                    >
                      {
                        matrixDataUser.find((user) => user.id == course.userId)
                          .name
                      }
                    </td>
                    <td
                      style={{
                        border: "2px solid black",
                        padding: "0 0.5rem",
                        color: "black",
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
                      border: "2px solid black",
                      padding: "0 0.5rem",
                      color: "black",
                      backgroundColor: item[i].course.color,
                      textAlign: "center",
                    }}
                  >
                    {item[i].course.progress}
                  </td>
                );
              }
            })}
          </tr>;
        })}
      </table>
    </div>
  );
};

export default DashMatrix;
