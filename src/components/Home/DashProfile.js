import React, {Component} from "react";

  

class DashProfile extends Component{
    render(){
        return(
            <div className=''>
            <div className='row g-3  min-vh-100  d-flex justify-content-end align-items-center '>  
            <h3 style={{padding:"1.5rem", color: "#142A89"}}>My Profile</h3> 
            <form className="col-sm-10 col-md-8 d-block mx-auto">
  <div className="form-group p-2 mb-4">
    <label className="text-black" for="FormControlInput1">Name</label>
    <input type="email" className="form-control border border-black" id="name" placeholder="name" value=""/>
  </div>

  <div className="form-group p-2 mb-4">
    <label className="text-black" for="FormControlInput1">Email</label>
    <input type="email" className="form-control border border-black" id="email" placeholder="name@example.com" value=""/>
  </div>

  <div className="form-group p-2 mb-4">
    <label className="text-black" for="FormControlInput1">Country</label>
    <input type="email" className="form-control border border-black" id="city" placeholder="Country" value=""/>
  </div>

  <div className="form-group p-2 mb-4">
    <label className="text-black" for="FormControlInput1">City</label>
    <input type="email" className="form-control border border-black" id="country" placeholder="City" value=""/>
  </div>
  <div className="form-group p-2 mb-4">
  <button type="button" class="btn " style={{backgroundColor:'#142A89', color:'white'}}>Save Changes</button>
  </div>
  </form>
             </div>
            </div>
           
        )
    }
}

export default DashProfile