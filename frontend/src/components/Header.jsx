import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../features/auth/authSlice";
import { clearTickets } from "../features/tickets/ticketsSlice";
import { clearUserNotes } from "../features/notes/notesSlice";
import { closeSocket } from "../app/socket";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        closeSocket(user._id);
        dispatch(signOut());
        dispatch(clearTickets());
        dispatch(clearUserNotes());
        navigate("/");
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Support Desk</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className="btn" onClick={onLogout}>
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;
