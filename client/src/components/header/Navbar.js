import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img
          src="https://res.cloudinary.com/mehedi08h/image/upload/v1647280872/react-final/auth/logo_wyrs86.png"
          alt="app__logo"
        />
      </div>
      <div className="app__navbar-login">
        {/* <img className="me-2" src={user?.avatar.url} alt="" /> */}

        <div />
        {user ? (
          <>
            <button onClick={() => setDropdown(true)} className="profile_btn">
              {user?.name}
            </button>
            {dropdown && (
              <ul className="sub_menu">
                <Link
                  to="/me"
                  onClick={() => setDropdown(false)}
                  className="p__opensans"
                >
                  My Profile
                </Link>
                <Link
                  to="/me"
                  onClick={() => setDropdown(false)}
                  className="p__opensans"
                >
                  Logout
                </Link>
              </ul>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="p__opensans">
              Log In / Registration
            </Link>
          </>
        )}
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li>
                <a href="#home" onClick={() => setToggleMenu(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setToggleMenu(false)}>
                  About
                </a>
              </li>
              <li>
                <a href="#menu" onClick={() => setToggleMenu(false)}>
                  Menu
                </a>
              </li>
              <li>
                <a href="#awards" onClick={() => setToggleMenu(false)}>
                  Awards
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setToggleMenu(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
