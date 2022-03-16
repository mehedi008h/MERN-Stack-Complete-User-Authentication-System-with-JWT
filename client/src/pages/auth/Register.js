import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, register } from "../../actions/userActions";
import ButtonLoader from "../../components/loader/ButtonLoader";
import "./auth.css";

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { name, email, phone, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/mehedi08h/image/upload/v1647280872/react-final/auth/logo_wyrs86.png"
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  return (
    <div className="login">
      <div className="login_container">
        <h4 className="text-center">Register User</h4>

        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="from_group">
            <label htmlFor="email_field">Name</label>
            <input
              className="from_input"
              name="name"
              value={name}
              onChange={onChange}
              type="text"
            />
          </div>
          <div className="from_group">
            <label htmlFor="email_field">Email</label>
            <input
              className="from_input"
              name="email"
              value={email}
              onChange={onChange}
              type="email"
            />
          </div>
          <div className="from_group">
            <label htmlFor="email_field">Phone</label>
            <input
              className="from_input"
              name="phone"
              value={phone}
              onChange={onChange}
              type="number"
            />
          </div>
          <div className="from_group">
            <label htmlFor="password_field">Password</label>
            <input
              className="from_input"
              name="password"
              value={password}
              onChange={onChange}
              type="password"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div className="mt-3">
                <figure className="avatar mr-3 item-rtl">
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                    src={avatarPreview}
                    alt="Avatar Preview"
                  />
                </figure>
              </div>
              <div className="image_file ms-2">
                <input
                  type="file"
                  name="avatar"
                  id="customFile"
                  accept="iamges/*"
                  onChange={onChange}
                />
                <AiOutlineCloudUpload size={20} />
              </div>
            </div>
          </div>
          <div className="from_group">
            <button>{loading ? <ButtonLoader /> : "Register"}</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
