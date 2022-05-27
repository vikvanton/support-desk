import React, { useState } from "react";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";

const customStyles = {
    content: {
        width: "90%",
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

function NoteModal({ addNote }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState("");

    const selectModal = () => {
        setNoteText("");
        setModalIsOpen(!modalIsOpen);
    };

    const onNoteSubmit = (e) => {
        e.preventDefault();
        addNote(noteText);
        selectModal();
    };

    return (
        <>
            <button className="btn btn-block" onClick={selectModal}>
                <FaPlus /> Add Note
            </button>
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
    );
}

export default NoteModal;
