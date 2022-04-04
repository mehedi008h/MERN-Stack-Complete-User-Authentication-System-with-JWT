import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdList } from "react-icons/io";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ButtonLoader from "../loader/ButtonLoader";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
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
                <Link to="/" className="p__opensans">
                    Home
                </Link>

                <div />
                {loading ? (
                    <>
                        <ButtonLoader />
                    </>
                ) : (
                    <>
                        {user ? (
                            <>
                                <img
                                    className="me-2"
                                    src={user?.avatar?.url}
                                    style={{
                                        height: "50px",
                                        width: "50px",
                                        borderRadius: "50%",
                                        marginLeft: "10px",
                                    }}
                                    alt=""
                                />
                                <Link to="/me" className="profile_btn">
                                    {user?.name}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="p__opensans">
                                    Log In / Registration
                                </Link>
                            </>
                        )}
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
                        <IoMdList
                            fontSize={27}
                            className="overlay__close"
                            onClick={() => setToggleMenu(false)}
                        />
                        <ul className="app__navbar-smallscreen_links">
                            <li>
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to="/"
                                    onClick={() => setToggleMenu(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                {user ? (
                                    <>
                                        <Link
                                            to="/me"
                                            onClick={() => setToggleMenu(false)}
                                            className="profile_btn"
                                            style={{ textDecoration: "none" }}
                                        >
                                            {user?.name}
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setToggleMenu(false)}
                                            className="p__opensans"
                                            style={{ textDecoration: "none" }}
                                        >
                                            Log In / Registration
                                        </Link>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
