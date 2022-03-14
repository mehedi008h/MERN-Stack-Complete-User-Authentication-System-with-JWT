import React from "react";
import "./auth.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login_container">
        <h3 className="text-center">Login</h3>

        <div className="from_group">
          <label>Email</label>
          <input className="from_input" type="text" />
        </div>
        <div className="from_group">
          <label>Password</label>
          <input className="from_input" type="password" />
        </div>
        <div className="from_group">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
