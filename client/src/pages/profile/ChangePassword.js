import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userActions";
import ButtonLoader from "../../components/loader/ButtonLoader";
import Sidebar from "../../components/sidebar/Sidebar";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import "./Profile.css";

const ChangePassword = ({ history }) => {
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated successfully");

      history.push("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };
  return (
    <div className="profile">
      <div className="container mt-5">
        <div className="row g-3">
          <div className="col-md-3">
            <Sidebar user={user} />
          </div>
          <div className="col-md-9">
            <div className="profile_container">
              <h5 className="text-center mt-4">Update Password</h5>
              <div style={{ width: "350px" }} className="mx-auto">
                <form
                  onSubmit={submitHandler}
                  encType="multipart/form-data"
                  className="mt-3"
                >
                  <div className="from_group">
                    <label htmlFor="password_field">Old Password</label>
                    <input
                      className="from_input"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter your old password ..."
                    />
                  </div>
                  <div className="from_group">
                    <label htmlFor="password_field">New Password</label>
                    <input
                      className="from_input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Enter your new password ..."
                    />
                  </div>

                  <div className="from_group w-50 mx-auto">
                    <button>{loading ? <ButtonLoader /> : "Update"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
