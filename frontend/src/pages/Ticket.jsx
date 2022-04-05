import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    receiveTicket,
    reset,
    closeTicket,
} from "../features/tickets/ticketsSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );
    const dispatch = useDispatch();
    const { ticketId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Ticket closed");
            navigate("/tickets");
            return;
        }
        dispatch(receiveTicket(ticketId));
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isSuccess, navigate, ticketId]);

    const onTicketClosed = () => {
        dispatch(closeTicket(ticketId));
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3 style={{ color: "red" }}>{message}</h3>;
    }

    return (
        ticket && (
            <div className="ticket-page">
                <div className="ticket-header">
                    <h3 style={{ display: "inline-block" }}>
                        Ticket ID:&nbsp;
                    </h3>
                    <p style={{ display: "inline-block" }}>{ticket._id}</p>
                    <h3>
                        Ticket status:&nbsp;
                        <span className={`status status-${ticket.status}`}>
                            {ticket.status}
                        </span>
                    </h3>
                    <h3 style={{ display: "inline-block" }}>
                        Date Submitted:&nbsp;
                    </h3>
                    <p style={{ display: "inline-block" }}>
                        {new Date(ticket.createdAt).toLocaleString("ru-RU")}
                    </p>
                    <br />
                    <h3 style={{ display: "inline-block" }}>Product:&nbsp;</h3>
                    <p style={{ display: "inline-block" }}>{ticket.product}</p>
                </div>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue:</h3>
                    <p>{ticket.description}</p>
                </div>
                {ticket.status !== "closed" && (
                    <button
                        onClick={onTicketClosed}
                        className="btn btn-block btn-danger"
                    >
                        Close Ticket
                    </button>
                )}
                <BackButton url="/tickets" />
            </div>
        )
    );
}

export default Ticket;
