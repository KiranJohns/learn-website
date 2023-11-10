import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardBar from '../Sidebar/DashboardBar';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import fetchData from '../../axios';
import DataTable from 'react-data-table-component';

const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#212450',
      color: 'white',
    },
  },
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: '600',
      textTransform: 'uppercase',
      justifyContent: 'center',
    },
  },
  cells: {
    style: {
      fontSize: '15px',
      justifyContent: 'center',
    },
  },
};

function DashIndividual() {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const getData = () => {
    try {
      const makeRequest = fetchData();
      makeRequest('GET', '/course/get-bought-course')
        .then((res) => {
          console.log(res);
          setRecords(res.data.response);
          setFilterRecords(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: 'No',
      selector: (row, idx) => idx + 1,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: 'description',
      selector: (row) => row.description.slice(0, 25),
    },
    {
      name: 'category',
      selector: (row) => row.category,
    },
    {
      name: 'validity',
      selector: (row) => {
        let date = row.validity.split('/');
        let newDate = `${date[1]}/${date[0]}/${date[2]}`;
        return newDate;
      },
    },
    {
      name: '',
      cell: () => (
        <a href={'#'} className="btn btn-success">
          Start
        </a>
      ),
    },
  ];

  return (
    <div className="container" style={{ padding: '10px' }}>
      {/* Your JSX content here */}
      <div className="ag-format-container">
        <h2
          style={{
            padding: '1.5rem',
            color: '#212450',
            display: 'flex',
            justifyContent: 'flex-start',
            justifyContent: 'center',
            marginTop: '20px',
            fontSize: 46,
          }}
        >
          Dashboard
        </h2>
        <div className="ag-courses_box dash-neww">

<div className="ag-courses_item" style={{marginLeft:'.5rem'}}>
  <a href="/company/myprofile" className="ag-courses-item_link">
    <div className="ag-courses-item_bg"></div>
    <div className="bi bi-person-circle ag-courses-item_date-box" style={{fontSize:'2rem'}}>

</div>
    <div className="ag-courses-item_title" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>My Profile</div>

   
  </a>
</div>

<div className="ag-courses_item">
  <a href="/company/mycourses" className="ag-courses-item_link">
    <div className="ag-courses-item_bg"></div>
    <div className="bi bi-book ag-courses-item_date-box" style={{fontSize:'2rem'}}>

      </div>
    <div className="ag-courses-item_title" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>My Course</div>

  
  </a>
</div>

<div className="ag-courses_item">
  <a href="/company/certificates" className="ag-courses-item_link">
    <div className="ag-courses-item_bg"></div>
    <div className="bi bi-patch-check-fill ag-courses-item_date-box" style={{fontSize:'2rem'}}>
    <div className="ag-courses-item_title" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Certificates</div>

 
      {/* Start:
<span className="ag-courses-item_date">
04.11.202
</span> */}
    </div>
  </a>
</div>

<div className="ag-courses_item" style={{marginRight:'.5rem'}}>
  <a href="#" className="ag-courses-item_link">
    <div className="ag-courses-item_bg"></div>
    <div className="bi bi-envelope ag-courses-item_date-box" style={{fontSize:'2rem'}}>
    <div className="ag-courses-item_title" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Contact Us</div>

   
      {/* Start:
<span className="ag-courses-item_date">
04.11.202
</span> */}
    </div>
  </a>
</div>
</div>
        {/* <div className="ag-courses_box dash-shadow">
          <div className="ag-courses_item">
            <a href="/individual/myprofile" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">My Profile</div>

              <div className="bi bi-person-circle ag-courses-item_date-box">
               
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/individual/mycourses" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">My Course</div>

              <div className="bi bi-archive ag-courses-item_date-box">
              
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/individual/certificates" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                My Certificate
              </div>
              <div className="bi bi-patch-check-fill ag-courses-item_date-box">
              
              </div>
            </a>
          </div>
          
        </div> */}
        <div className="dash-shadow">
          <h4
            style={{
              padding: '1rem',
              color: '#212450',
              display: 'flex',
              justifyContent: 'flex-start',
              justifyContent: 'center',
              marginTop: '2.5rem',
              fontSize: 35,
            }}
          >
            Courses to do
          </h4>
          <div className=" row g-3  min-vh-100  d-flex justify-content-center ">
            <div style={{ padding: '', backgroundColor: '' }}>
              <div
                className="pb-2 smth"
                style={{ display: 'flex', justifyContent: 'right' }}
              >
                <input
                  type="text"
                  className=""
                  placeholder="Search course..."
                  onChange={handleFilter}
                  style={{
                    padding: '6px 10px',
                    borderColor: 'gray',
                    overflow: 'hidden',
                    marginRight: '.2rem',
                  }}
                />
              </div>
              <div style={{ padding: '.2rem' }}>
                <DataTable
                  columns={columns}
                  data={records}
                  customStyles={customStyles}
                  pagination
                  selectableRows
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashIndividual;