import React from "react";
import Table from 'react-bootstrap/Table';

const MatrixBundComp = () => {
  const matrixDataUser = [
  
    {
      id: 1,
      name: "some of the people",
    },
    {
      id: 2,
      name: "of the people",
    },
    {
      id: 3,
      name: "for the people",
    },
    {
      id: 4,
      name: "for the people",
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

  const courseName = [
    "some of the people",
    "by the people",
    "of the people",
    "for the people",
  ];
  return (
    <div className="row">
      <div className="dash-neww " >
          
        <div className="col-12 m-50 p-50" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <table style={{ border: "1px solid #212a50",  }}>
        <tr style={{ border: "1px solid #212a50",  textAlign:'center' }}>
          <th
            style={{
              border: "1px solid #212a50",
              padding: "0 0.5rem",
              color: "#212a50",
             
            }}
          >
           
          </th>
          {courseName.map((item) => (
            <th
              style={{
                border: "1px solid #212a50",
                padding: "0 0.5rem",
                color: "#fff",
                background:'#212a50'
              }}
            >
              {item}
            </th>
          ))}
        </tr>
        {matrixDataCourse.map((item) => {
          return <tr >
            {item.map((course, i) => {
              if (i == 0) {
                return (
                  <>
                    <td
                      style={{
                        border: "1px solid #212a50",
                        padding: "0 0.5rem",
                        color: "white",
                        background:'#212450'
                      }}
                    >
                      {
                        matrixDataUser.find((user) => user.id == course.userId)
                          .name
                      }
                    </td>
                    <td
                      style={{
                        border: "1px solid #212a50",
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
                      border: "1px solid #212a50",
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
          </tr>;
        })}
      </table>
      
      </div>
      
      </div >

      <div className="dash-neww " >
       
      <div className="col-12 p-2 m-2">
        <div className="d-flex justify-content-center my-2 "><h4>
          Course Matrix
          </h4></div>
        
      <Table  bordered  variant="light">
      <thead >
        <tr style={{ textAlign:'center',}}>
          <th  style={{
            
            padding: "0 0.5rem",
            color: "#fff",
            background:'#212a50'
          }} ></th>
         
            <th
              style={{
            
                padding: "0 0.5rem",
                color: "#fff",
                background:'#212a50'
              }}
            >
          Kiran
            </th>

            <th
              style={{
            
                padding: "0 0.5rem",
                color: "#fff",
                background:'#212a50'
              }}
            >
         Alan
            </th>
       
            <th
              style={{
            
                padding: "0 0.5rem",
                color: "#fff",
                background:'#212a50'
              }}
            >
          Rahul
            </th>
            <th
              style={{
            
                padding: "0 0.5rem",
                color: "#fff",
                background:'#212a50'
              }}
            >
          Amal
            </th>
       
       
        </tr>
      </thead>
      <tbody>
      {matrixDataCourse.map((item) => {
          return <tr>
            {item.map((course, i) => {
              if (i == 0) {
                return (
                  <>
                    <td
                      style={{
                      
                        padding: "0 0.5rem",
                        color: "white",
                        background:'#212450',
                        textAlign:'center'
                      }}
                    >
                      {
                        matrixDataUser.find((user) => user.id == course.userId)
                          .name
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
          </tr>;
        })}
      </tbody>
    </Table>
      </div>
    </div>
    </div>
  );
};
export default MatrixBundComp;