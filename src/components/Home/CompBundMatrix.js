import React from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const MatrixBundComp = () => {
  const matrixDataUser = [
  
    // {
    //   id: 1,
    //   name: "Rahul",
    // },
    // {
    //   id: 2,
    //   name: "Kiran",
    // },
    // {
    //   id: 3,
    //   name: "Aloshy",
    // },
    // {
    //   id: 4,
    //   name: "Alba",
    // },
  ];

  const matrixDataCourse = [
    [
    //   {
    //     id: 1,
    //     userId: 1,
    //     course: {
    //       name: "some of the people",
    //       color: "#ae0000",
    //       progress: "0%",
    //     },
    //   },
    //   {
    //     id: 1,
    //     userId: 1,
    //     course: {
    //       name: "of the people",
    //       color: "#549C30",
    //       progress: "100%",
    //     },
    //   },
    //   {
    //     id: 1,
    //     userId: 1,
    //     course: {
    //       name: "by the people",
    //       color: "#f7b500",
    //       progress: "50%",
    //     },
    //   },
    //   {
    //     id: 1,
    //     userId: 1,
    //     course: {
    //       name: "for the people",
    //       color: "#549C30",
    //       progress: "100%",
    //     },
    //   },
    // ],
    // [
    //   {
    //     id: 1,
    //     userId: 2,
    //     course: {
    //       name: "by the people",
    //       color: "#f7b500",
    //       progress: "50%",
    //     },
    //   },
    //   {
    //     id: 2,
    //     userId: 2,
    //     course: {
    //       name: "some of the people",
    //       color: "#ae0000",
    //       progress: "0%",
    //     },
    //   },
    //   {
    //     id: 3,
    //     userId: 2,
    //     course: {
    //       name: "of the people",
    //       color: "#549C30",
    //       progress: "100%",
    //     },
    //   },
    //   {
    //     id: 4,
    //     userId: 2,
    //     course: {
    //       name: "for the people",
    //       color: "#f7b500",
    //       progress: "50%",
    //     },
    //   },
    // ],
    // [
    //   {
    //     id: 1,
    //     userId: 3,
    //     course: {
    //       name: "some of the people",
    //       color: "#ae0000",
    //       progress: "0%",
    //     },
    //   },
    //   {
    //     id: 1,
    //     userId: 3,
    //     course: {
    //       name: "for the people",
    //       color: "#f7b500",
    //       progress: "50%",
    //     },
    //   },
    //   {
    //     id: 1,
    //     userId: 3,
    //     course: {
    //       name: "of the people",
    //       color: "#549C30",
    //       progress: "100%",
    //     },
    //   },
    //   {
    //     id: 1,
    //     userId: 3,
    //     course: {
    //       name: "by the people",
    //       color: "#549C30",
    //       progress: "100%",
    //     },
    //   },
    // ],
    // [
    //   {
    //     id: 1,
    //     userId: 4,
    //     course: {
    //       name: "by the people",
    //       color: "#f7b500",
    //       progress: "50%",
    //     },
    //   },
    //   {
    //     id: 1,
    //     userId: 4,
    //     course: {
    //       name: "some of the people",
    //       color: "#ae0000",
    //       progress: "0%",
    //     },
    //   },
    //   {
    //     id: 1,
    //     userId: 4,
    //     course: {
    //       name: "of the people",
    //       color: "#549C30",
    //       progress: "100%",
    //     },
    //   },
    //   {
    //     id: 1,
    //     userId: 4,
    //     course: {
    //       name: "for the people",
    //       color: "#549C30",
    //       progress: "100%",
    //     },
    //   },
    ],
  ];

  const courseName = [
    "ADHD Awareness",
    "Standard 1 Understand your role",
    "Diabetes Care",
    "First Aid Awareness",
  ];
  return (
    <div className="row p-3">
  
   
  
      <div style={{position:'relative'}} className="dash-neww " >
      <div style={{position:'absolute'}} className="">

       <span className="m-1" style={{display:'flex'}}>   
        <div style={{height:'1.5rem', width:"3rem", background:"#ae0000", color:'white', textAlign:'center'}} className="redd">
           0%
          </div>
          <div style={{height:'1.5rem', width:"3rem", background:"#f7b500", color:'white', textAlign:'center'}} className="redd">
           50%
          </div>
          <div style={{height:'1.5rem', width:"3rem", background:"#549C30", color:'white', textAlign:'center'}} className="redd">
           100%
          </div>
          </span>

       </div>
      <div className="col-12 p-2 m-2">
      <div style={{position:'relative'}}>
          <div className="d-flex justify-content-center my-2 ">
            <h4 >Bundle Matrix</h4>
          </div>

          
          <div style={{position:'absolute', top:"0", right:"0"}}  className="col-4 p-1 m-">
            <Form.Select size="" style={{ border: ".1px solid #212a50" }} aria-label="Default select example">
            <option>Select Manager</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          </div>
          </div>
        
      <Table style={{marginTop:".5rem"}} responsive  bordered  variant="light">
    <thead>
      <tr style={{ textAlign:'center'}}>
        <th style={{background:'#212a50', color:'white'}} colSpan={5}>Bundle Name</th>
      </tr>
    </thead>
      <thead >
        <tr style={{ textAlign:'center'}}>
          <th  style={{
            
            padding: "0 0.5rem",
            color: "#fff",
            background:'#212a50'
          }} >Individual</th>
          {courseName.map((item) => (
            <th
              style={{
            
                padding: "0 0.5rem",
                color: "#fff",
                background:'#212a50'
              }}
            >
              {item}
            </th>
          ))}
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
                        textAlign:'center',
                        fontWeight:'bold'
                      }}
                    > 
                      {
                        matrixDataUser.find((user) => user.id == course.userId)
                          ?.name
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