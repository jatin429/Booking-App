import "./navbar.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
      <NavLink to={"/"} className="active">
      <span className="logo">Booking</span>
      </NavLink>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar