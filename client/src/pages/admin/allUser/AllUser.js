import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { Spinner, Table } from "react-bootstrap";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFundView,
} from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allUsers, clearErrors } from "../../../actions/userActions";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./AllUser.css";

const AllUser = ({ history }) => {
  const { user } = useSelector((state) => state.auth);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  console.log(users);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, history]);
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
                                <Link className="admin_link" to="/">
                                  <GrFormView size={25} />
                                </Link>
                                <Link className="admin_link" to="/">
                                  <AiOutlineEdit size={25} />
                                </Link>
                                <Link className="admin_link" to="/">
                                  <AiOutlineDelete size={25} />
                                </Link>
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
