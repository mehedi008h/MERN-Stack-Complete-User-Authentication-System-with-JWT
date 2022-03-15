import React, { useState } from "react";
// import { useAlert } from "react-alert";

import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
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
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
