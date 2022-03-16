import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { Spinner, Table } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allUsers,
  clearErrors,
  deleteUser,
} from "../../../actions/userActions";
import Sidebar from "../../../components/sidebar/Sidebar";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import "./AllUser.css";

const AllUser = ({ history }) => {
  const { user } = useSelector((state) => state.auth);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User deleted successfully");
      history.push("/admin/alluser");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, history]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
              <h3 className="text-center">All User</h3>
              <div className="mt-3">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <>
                        <div className="mx-auto">
                          <Spinner animation="border" />
                        </div>
                      </>
                    ) : (
                      <>
                        {users &&
                          users.map((user) => (
                            <tr>
                              <td>{user?._id}</td>
                              <td>{user?.name}</td>
                              <td>{user?.email}</td>
                              <td>{user?.role}</td>
                              <td>
                                <Link
                                  className="admin_link"
                                  to={`/admin/user/${user._id}`}
                                >
                                  <GrFormView size={25} />
                                </Link>

                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => deleteUserHandler(user._id)}
                                >
                                  <AiOutlineDelete size={20} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
