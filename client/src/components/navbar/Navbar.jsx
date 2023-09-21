import { useContext } from "react"
import "./navbar.css"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
   
  const {user,dispatch}=useContext(AuthContext);
  const handleLogout=()=>{
    dispatch({type:"LOGOUT"});
  }

  return (
    <div className="navbar">
      <div className="navContainer">
      <NavLink to={"/"} className="active">
      <span className="logo">Booking</span>
      </NavLink>
      {user ? (<div className="navItems">
        <span className="usename">{user.username}</span>
        <button onClick={handleLogout} className="navButton">Logout</button>
      </div>) :(
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar