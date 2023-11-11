import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample({user}) {
  function handleBlock() {
    
  }
  return (
    <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic" style={{background:"#212450"}}>
        Action 
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">View</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Update</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;