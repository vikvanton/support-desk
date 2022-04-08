import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTickets, reset } from "../features/tickets/ticketsSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import BackButton from "../components/BackButton";

function Tickets() {
    const { tickets, isLoading, isError, message } = useSelector(
        (state) => state.tickets
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
            navigate("/");
        } else if (!tickets) {
            dispatch(getTickets());
        }
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message, navigate, tickets]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                </div>
                {tickets &&
                    tickets.map((ticket) => (
                        <TicketItem key={ticket._id} ticket={ticket} />
                    ))}
            </div>
            <BackButton url="/" />
        </>
    );
}

export default Tickets;
