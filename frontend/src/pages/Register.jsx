import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { signInOrUp, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            navigate("/");
        }
        dispatch(reset());
    }, [dispatch, isError, isSuccess, message, navigate]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            };
            dispatch(signInOrUp(userData));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            placeholder="Enter your name"
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="Enter your email"
                            autoComplete="user-email"
                            required
                        />
                    </div>
                    <div className="form-group passwordInputDiv">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            required
                        />
                        {formData.password && (
                            <span
                                className="showPassword"
                                title={`${
                                    showPassword ? "Hide" : "Show"
                                } Password`}
                                onClick={() =>
                                    setShowPassword((prevState) => !prevState)
                                }
                            >
                                <FaEye size={20} />
                            </span>
                        )}
                    </div>
                    <div className="form-group passwordInputDiv">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={onChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            required
                        />
                        {formData.confirmPassword && (
                            <span
                                className="showPassword"
                                title={`${
                                    showConfirmPassword ? "Hide" : "Show"
                                } Password`}
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (prevState) => !prevState
                                    )
                                }
                            >
                                <FaEye size={20} />
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
