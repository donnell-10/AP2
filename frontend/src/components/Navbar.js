import React , {Fragment}from "react";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const Navbar = ({logout, isAuthenticated}) => {
  const guestLinks = () => (
      <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
      </Fragment>
  );

  const authLinks = () => (
    <Fragment>      
      <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
      </li>

    </Fragment>
  );
  


  return(
    <nav className="navbar navbar-expand-lg"  >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">AccuPlaylist</Link>
        <button className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link " aria-current="page" to="/">Home</Link>
            </li>
            {isAuthenticated ? authLinks(): guestLinks() }
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout}) (Navbar);