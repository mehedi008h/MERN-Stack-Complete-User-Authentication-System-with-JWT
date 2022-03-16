import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { Table } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { BsEmojiSmile, BsPhone } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../../actions/userActions";
import Sidebar from "../../../components/sidebar/Sidebar";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import "./EditUser.css";

const EditUser = ({ history, match }) => {
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated } = useSelector((state) => state.user);
  const { userDetails } = useSelector((state) => state.userDetails);

  const alert = useAlert();
  const dispatch = useDispatch();

  const userId = match.params.id;

  // update order status
  const handleUpdateRole = (id, role) => {
    console.log("Status", role);
    dispatch(updateUser(id, role));
  };

  useEffect(() => {
    if (userDetails && userDetails._id !== userId) {
      dispatch(getUserDetails(userId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");

      history.push("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, userDetails, history, isUpdated, userId]);

  return (
    <div className="profile">
      <div className="container mt-5">
        <div className="row g-3">
          <div className="col-md-3">
            <Sidebar user={user} />
          </div>
          <div className="col-md-9">
            <div className="profile_container">
              <h4 className="text-center mb-4">User Details</h4>
              <div className="d-flex align-items-center justify-content-between">
                <div className="mx-auto">
                  <div>
                    <img
                      src={userDetails?.avatar?.url}
                      style={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  </div>
                  <div className="d-flex justify-content-center flex-column align-items-center mt-3">
                    <label htmlFor="role_field">Change User Role</label>

                    <select
                      className="role_input  mt-3"
                      aria-label="Default select example"
                      onChange={(e) =>
                        handleUpdateRole(userDetails._id, e.target.value)
                      }
                    >
                      <option defaultValue={userDetails.role}>
                        {userDetails.role}
                      </option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
                <div className="divider" />
                <div className="mx-auto">
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td>
                          <BsEmojiSmile size={25} />
                        </td>
                        <td className="fw-bold">Name</td>
                        <td>{userDetails?.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <AiOutlineMail size={25} />
                        </td>
                        <td className="fw-bold">Email</td>
                        <td>{userDetails?.email}</td>
                      </tr>
                      <tr>
                        <td>
                          <BsPhone size={25} />
                        </td>
                        <td className="fw-bold">Phone</td>
                        <td>{userDetails?.phone}</td>
                      </tr>
                      <tr>
                        <td>
                          <GrLocation size={25} />
                        </td>
                        <td className="fw-bold">Address</td>
                        <td>{userDetails?.address}</td>
                      </tr>
                      <tr>
                        <td>
                          <BsEmojiSmile size={25} />
                        </td>
                        <td className="fw-bold">Role</td>
                        <td>{userDetails?.role}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
