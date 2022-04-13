const connectDB = require("./db");
const { ticketsUpdate, noteInsert } = require("./configSocket");

const configDb = () => {
    connectDB().then((connection) => {
        const ticketsCollection =
            connection.connection.db.collection("tickets");
        const updateTicketStream = ticketsCollection.watch([], {
            fullDocument: "updateLookup",
        });
        updateTicketStream.on("change", (next) => {
            if (next.operationType === "update") {
                ticketsUpdate(
                    next.fullDocument._id,
                    next.fullDocument.user,
                    next.fullDocument.status
                );
            }
        });
        const notesCollection = connection.connection.db.collection("notes");
        const insertNoteStream = notesCollection.watch();
        insertNoteStream.on("change", (next) => {
            if (
                next.operationType === "insert" &&
                next.fullDocument.isStaff === true
            ) {
                noteInsert(next.fullDocument);
            }
        });
    });
};

module.exports = configDb;
