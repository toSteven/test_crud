import { Link, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "./Config";

function Navbar({ auth, logout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Navbar
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="about" className="nav-link">
                About
              </NavLink>
            </li>
            {/* if login show */}

            {auth ? null : (
              <li className="nav-item">
                <NavLink to="register" className="nav-link">
                  Register
                </NavLink>
              </li>
            )}
            {/* if login show */}
            {auth ? null : (
              <li className="nav-item">
                <NavLink to="login" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}

            {/* if logout show */}
            {auth ? (
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    logout();
                  }}
                >
                  Signout
                </NavLink>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
