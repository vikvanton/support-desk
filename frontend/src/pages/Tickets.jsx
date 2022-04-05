import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from "../features/tickets/ticketsSlice";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import BackButton from "../components/BackButton";

function Tickets() {
    const { tickets, isLoading, isError, message } = useSelector(
        (state) => state.tickets
    );
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if (!tickets) {
            dispatch(getTickets());
        }
        return () => {
            dispatch(reset());
        };
    }, [dispatch, tickets]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3 style={{ color: "red" }}>{message}</h3>;
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
