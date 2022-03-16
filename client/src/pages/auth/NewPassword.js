import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password updated successfully");
      history.push("/login");
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  };
  return (
    <div className="login">
      <div className="login_container">
        <h4 className="text-center">New Password</h4>

        <form className="mt-3" onSubmit={submitHandler}>
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
            <label htmlFor="password_field">Confirm Password</label>
            <input
              className="from_input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
            />
          </div>

          <div className="from_group">
            <button>Change</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
