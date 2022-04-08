import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBan } from "react-icons/fa";
import {
    receiveTicket,
    reset,
    closeTicket,
} from "../features/tickets/ticketsSlice";
import {
    getNotes,
    createNote,
    resetNotes,
    clearNotesError,
} from "../features/notes/notesSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import NoteModal from "../components/NoteModal";

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );
    const {
        ticketNotes,
        isLoading: notesIsLoading,
        isError: notesIsError,
        message: notesMessage,
    } = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const { ticketId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Ticket closed");
            navigate("/tickets");
        } else if (isError) {
            toast.error(message);
            navigate("/tickets");
        } else {
            dispatch(receiveTicket(ticketId));
            dispatch(getNotes(ticketId));
        }
        return () => {
            dispatch(reset());
            dispatch(resetNotes());
        };
    }, [dispatch, isError, isSuccess, message, navigate, ticketId]);

    const onTicketClosed = () => {
        dispatch(closeTicket(ticketId));
    };

    const addNote = (noteText) => {
        dispatch(createNote({ noteText, ticketId }));
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (notesIsError) {
        toast.error(notesMessage);
        dispatch(clearNotesError());
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
                <h2>Notes:</h2>
                {!notesIsLoading ? (
                    ticketNotes.length > 0 ? (
                        ticketNotes.map((note) => (
                            <NoteItem key={note._id} note={note} />
                        ))
                    ) : (
                        <p style={{ textAlign: "center" }}>No notes</p>
                    )
                ) : (
                    <p style={{ textAlign: "center" }}>Checking...</p>
                )}
                {ticket.status !== "closed" && <NoteModal addNote={addNote} />}
                {ticket.status !== "closed" && (
                    <button
                        onClick={onTicketClosed}
                        className="btn btn-block btn-danger"
                    >
                        <FaBan /> Close Ticket
                    </button>
                )}
                <BackButton url="/tickets" />
            </div>
        )
    );
}

export default Ticket;
