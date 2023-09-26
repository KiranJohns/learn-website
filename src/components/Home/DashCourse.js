

import React, { Component } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Link from 'next/link';

const customStyles = {
  headRow:{
    style:{
      backgroundColor : '#004b55',
      color:'white'
    }
  },
  headCells:{
    style:{
      fontSize:'16px',
      fontWeight:'600',
      textTransform:'uppercase'
    }
  },
  cells:{
    style:{
      fontSize: "15px",
    }
  }
}



class DashCourse extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
    };
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
    row.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
    this.setState({ records: newData });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) =>
        this.setState({ records: res.data, filterRecords: res.data })
      )
      .catch((err) => console.log(err));
  };
 


  render() {
    const columns = [
      {
        name: 'ID',
        selector: (row) => row.id,
        sortable:true
      },
      {
        name: 'Courses',
        selector: (row) => row.name,
        sortable:true
      },
      {
        name: 'Email',
        selector: (row) => row.email,
      },
      {
        name: 'City',
        selector: (row) => row.address.city,
      },
      
    ];

    return (
      <div className=''>
        <h3 style={{padding:"1.5rem", color: "#004b55"}}>My Courses</h3>
        <div className=' row g-3  min-vh-100  d-flex justify-content-center align-items-center '>
          <div style={{padding:"50px 10%", backgroundColor: ""}}>
            <div className='pb-2 smth'  style={{display:'flex', justifyContent:'left' }}>
              <input type="text" className='' placeholder='Search course...' onChange={this.handleFilter} style={{padding:'6px 10px', borderColor:'transparent', overflow:'hidden' }}/>
              </div>
          <DataTable 
          columns={columns} 
          data={this.state.records} 
          customStyles={customStyles}
          pagination
          selectableRows
          />
          </div>
        </div>
      </div>
    );
  }
}

export default DashCourse;




// import React from 'react'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import DataTable from 'react-data-table-component'

// const DashCourse = () => {
//   const column=[
//     {
//       name:"ID",
//       selector: row => row.id
//     },{
//       name:"Name",
//       selector: row => row.name
//     },{
//       name:'Email',
//     },{
//       name:"City"
//     }
// ]

//    useEffect(()=>{
//     const fetData =async ()=>{
//       axios.get('https://jsonplaceholder.typicode.com/users')
//       .then(res=>setRecords(res.data)
// setFilterRecords(res.data))
//       .catch(err=>console.log(err));
//     }
//     fetData();
//    })
//     const[records, setRecords]=useState([])
//     const [filterRecords, setRecords] = useState([])
//  const handleFilter = (event) => {
//   const newData = filterRecords.filter(
//     (row) => row.name.toLowerCase().includes(event.target.value.toLowerCase())
//   );
//   setRecords(newData);
// }
//   return (
//     <div className=''>           
//     <div className=' row g-3  min-vh-100  d-flex justify-content-center align-items-center '>

// <input type="text"  placeholder='Search course...' onChange={this.handleFilter} style={{padding:'6px 10px', borderColor:'transparent'}}/></div>
// <DataTable
//  columns={columns} 
//  data={this.state.records} 
//  customStyles={customStyles}
//  pagination
//  selectableRows
//  >
//      </div>
//     </div>
//   )
// }

// export default DashCourse