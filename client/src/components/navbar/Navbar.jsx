import { useContext } from "react"
import "./navbar.css"
import { Link, NavLink, Navigate } from "react-router-dom"
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
        <Link to="http://localhost:3001"><button className="navButton">To Admin</button> </Link>
      </div>) :(
        <div className="navItems">
          <Link to="/register"><button className="navButton">Register</button></Link>
          <Link to="/login"><button className="navButton">Login</button></Link>
          <Link to="http://localhost:3001"><button className="navButton">To Admin</button> </Link>
        </div>)}
        
      </div>
    </div>
  )
}

export default Navbar