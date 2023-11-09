import React, {Component} from "react";

  

class DashCreate extends Component{
    render(){
        return(
            <div className=''>
            
              
              <div className="dash-shadow mt-20">
              <h2 style={{padding:"1.5rem", color: "#212450",display:"flex", justifyContent:"center",fontSize: 46}}>Create User</h2> 
            <div className='row g-3  d-flex justify-content-end  '>  
            
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

  <div class="form-group p-2 mb-4">
    <label className="text-black" for="FormControlInput1">Type of user</label>
    <select className="form-control border border-black" id="exampleFormControlSelect1">
      <option>Select</option>
      <option>Individual</option>
      <option>Manager</option>
    </select>
  </div>
  
  <div className="form-group p-2 mb-4">
  <button  type="button" className="btn btn-primary" style={{}}>Submit</button>
  </div>
  </form>
             </div></div>
            </div>
           
        )
    }
}

export default DashCreate