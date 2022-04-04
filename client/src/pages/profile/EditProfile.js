import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Profile.css";
import {
    clearErrors,
    loadUser,
    updateProfile,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import ButtonLoader from "../../components/loader/ButtonLoader";

const EditProfile = ({ history }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "https://res.cloudinary.com/mehedi08h/image/upload/v1647280872/react-final/auth/logo_wyrs86.png"
    );

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { error, isUpdated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAddress(user.address);
            setPhone(user.phone);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("User updated successfully");
            dispatch(loadUser());

            history.push("/me");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, alert, error, history, isUpdated, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("address", address);
        formData.set("phone", phone);
        formData.set("avatar", avatar);
        console.log(formData);
        dispatch(updateProfile(formData));
    };

    const onChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };
    return (
        <div className="profile">
            <div className="container mt-5 mb-5">
                <div className="row g-3">
                    <div className="col-md-3">
                        <Sidebar user={user} />
                    </div>
                    <div className="col-md-9">
                        <div className="profile_container">
                            <h5 className="text-center">Edit Profile</h5>
                            <div className="mx-auto form">
                                <form
                                    onSubmit={submitHandler}
                                    encType="multipart/form-data"
                                >
                                    <div className="from_group">
                                        <label htmlFor="email_field">
                                            Name
                                        </label>
                                        <input
                                            className="from_input"
                                            name="name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            type="text"
                                        />
                                    </div>
                                    <div className="from_group">
                                        <label htmlFor="email_field">
                                            Address
                                        </label>
                                        <input
                                            className="from_input"
                                            name="address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            type="text"
                                        />
                                    </div>
                                    <div className="from_group">
                                        <label htmlFor="email_field">
                                            Phone
                                        </label>
                                        <input
                                            className="from_input"
                                            name="phone"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            type="number"
                                        />
                                    </div>

                                    <div className="form-group mt-3">
                                        <label htmlFor="avatar_upload">
                                            Avatar
                                        </label>
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
                                                <AiOutlineCloudUpload
                                                    size={20}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="from_group w-50 mx-auto">
                                        <button>
                                            {loading ? (
                                                <ButtonLoader />
                                            ) : (
                                                "Update"
                                            )}
                                        </button>
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

export default EditProfile;
