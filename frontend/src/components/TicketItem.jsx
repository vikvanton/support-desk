import React from "react";
import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
    return (
        <Link to={`/tickets/${ticket._id}`}>
            <div className="ticket">
                <div>{new Date(ticket.createdAt).toLocaleString("ru-RU")}</div>
                <div>{ticket.product}</div>
                <div className={`status status-${ticket.status}`}>
                    {ticket.status}
                </div>
            </div>
        </Link>
    );
}

export default TicketItem;
