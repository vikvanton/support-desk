import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import Modal from "react-modal";
import {
    receiveTicket,
    reset,
    closeTicket,
} from "../features/tickets/ticketsSlice";
import {
    getNotes,
    createNote,
    reset as notesReset,
} from "../features/notes/notesSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";

const customStyles = {
    content: {
        width: "600px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        position: "relative",
    },
};

Modal.setAppElement("#root");

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );
    const { notes, isLoading: notesIsLoading } = useSelector(
        (state) => state.notes
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
        dispatch(getNotes(ticketId));
        return () => {
            dispatch(reset());
            dispatch(notesReset());
        };
    }, [dispatch, isSuccess, navigate, ticketId]);

    const onTicketClosed = () => {
        dispatch(closeTicket(ticketId));
    };

    const selectModal = () => setModalIsOpen(!modalIsOpen);

    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({ noteText, ticketId }));
        selectModal();
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3 style={{ color: "red" }}>{message}</h3>;
    }

    return (
        ticket && (
            <>
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
                        <h3 style={{ display: "inline-block" }}>
                            Product:&nbsp;
                        </h3>
                        <p style={{ display: "inline-block" }}>
                            {ticket.product}
                        </p>
                    </div>
                    <hr />
                    <div className="ticket-desc">
                        <h3>Description of Issue:</h3>
                        <p>{ticket.description}</p>
                    </div>
                    <h2>Notes:</h2>
                    {!notesIsLoading ? (
                        notes.length > 0 ? (
                            notes.map((note) => (
                                <NoteItem key={note._id} note={note} />
                            ))
                        ) : (
                            <p style={{ textAlign: "center" }}>No notes</p>
                        )
                    ) : (
                        <p style={{ textAlign: "center" }}>Checking...</p>
                    )}
                    {ticket.status !== "closed" && (
                        <button className="btn btn-block" onClick={selectModal}>
                            <FaPlus /> Add Note
                        </button>
                    )}
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
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={selectModal}
                    style={customStyles}
                    contentLabel="Add Note"
                    shouldCloseOnOverlayClick={false}
                >
                    <h2>Add Note</h2>
                    <button className="btn-close" onClick={selectModal}>
                        X
                    </button>
                    <form onSubmit={onNoteSubmit}>
                        <div className="form-group">
                            <textarea
                                name="noteText"
                                id="noteText"
                                className="form-control"
                                placeholder="Note text"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>
            </>
        )
    );
}

export default Ticket;
