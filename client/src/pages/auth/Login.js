import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import "./auth.css";
import { clearErrors, login } from "../../actions/userActions";
import ButtonLoader from "../../components/loader/ButtonLoader";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="login">
      <div className="login_container">
        <h3 className="text-center">Login</h3>

        <form onSubmit={submitHandler}>
          <div className="from_group">
            <label htmlFor="email_field">Email</label>
            <input
              className="from_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div className="from_group">
            <label htmlFor="password_field">Password</label>
            <input
              className="from_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className="from_group">
            <button>{loading ? <ButtonLoader /> : "Login"}</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <Link to="/password/forgot" style={{ textDecoration: "none" }}>
            Forgot Password
          </Link>
          <div className="mt-3">
            Dont Have an account ? <Link to="/register">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
