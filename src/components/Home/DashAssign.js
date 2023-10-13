
import React, { Component } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BasicExample from '../About/button1';

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



class DashAssign extends Component {
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
        name: 'Actions',
        cell:() =>  <BasicExample/>,
      },
      
    ];

    return (
      <div className=''>
        <h2 style={{padding:"1.5rem", color: "#004b55"}}>Assign Course</h2>
        
        <div className=' row g-3  min-vh-100  d-flex justify-content-center align-items-center '>
          <div style={{padding:"", backgroundColor: ""}}>
            <div className='pb-2' style={{display:'flex', justifyContent:'left' }}>
              <input type="text"  placeholder='Search course...' onChange={this.handleFilter} style={{padding:'6px 10px', borderColor:'transparent', overflow:'hidden'}}/></div>
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

export default DashAssign;
