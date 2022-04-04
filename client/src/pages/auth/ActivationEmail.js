import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { activeEmail, clearErrors } from "../../actions/userActions";

const ActivationEmail = ({ history }) => {
    const { activation_token } = useParams();

    const { isAuthenticated, error, success } = useSelector(
        (state) => state.auth
    );

    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }

        if (success) {
            alert.success("Email Active Successfuly");
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, history, isAuthenticated, success]);

    const activeHandler = () => {
        if (activation_token) {
            dispatch(activeEmail(activation_token));
        }
    };

    return (
        <div className="mt-5">
            <div className="container">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h3>
                        If you want to active your account. Please hit the
                        active button.
                    </h3>
                    <button
                        className="btn btn-success mt-5"
                        onClick={activeHandler}
                    >
                        Active
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivationEmail;
