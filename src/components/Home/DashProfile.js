import React, {Component} from "react";

  

class DashProfile extends Component{
    render(){
        return(
            <div className=''>
            <div className='row g-3  min-vh-100  d-flex justify-content-end align-items-center '>  
            <h3 className="d-flex justify-content-center">My Profile</h3> 
            <form className="col-5 d-block mx-auto">
  <div className="form-group p-2 mb-4">
    <label className="text-black" for="FormControlInput1">Name</label>
    <input type="email" className="form-control border border-black" id="name" placeholder="name" value=""/>
  </div>

  <div className="form-group p-2 mb-4">
    <label className="text-black" for="FormControlInput1">Email</label>
    <input type="email" className="form-control border border-black" id="email" placeholder="name@example.com" value=""/>
  </div>

  <div className="form-group p-2 mb-4">
    <label className="text-black" for="FormControlInput1">City</label>
    <input type="email" className="form-control border border-black" id="city" placeholder="City" value=""/>
  </div>

  <div className="form-group p-2 mb-4">
    <label className="text-black" for="FormControlInput1">Country</label>
    <input type="email" className="form-control border border-black" id="country" placeholder="Country" value=""/>
  </div>
  <div className="form-group p-2 mb-4">
  <button type="button" class="btn btn-primary">Save Changes</button>
  </div>
  </form>
             </div>
            </div>
           
        )
    }
}

export default DashProfile