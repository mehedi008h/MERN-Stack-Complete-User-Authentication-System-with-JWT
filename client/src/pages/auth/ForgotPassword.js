import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userActions";
import ButtonLoader from "../../components/loader/ButtonLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };
  return (
    <div className="login">
      <div className="login_container">
        <h4 className="text-center">Forgot Password</h4>

        <form className="mt-3" onSubmit={submitHandler}>
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
            <button>{loading ? <ButtonLoader /> : "Send"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
