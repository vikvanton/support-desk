import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { signInOrUp, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, isSuccess, message } = useSelector(
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
        const userData = {
            email: formData.email,
            password: formData.password,
        };
        dispatch(signInOrUp(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Sign In to get support</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
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
                            autoComplete="current-password"
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
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
