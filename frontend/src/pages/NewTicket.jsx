import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketsSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
    const { user } = useSelector((state) => state.auth);
    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );
    const [ticketData, setTicketData] = useState({
        name: user.name,
        email: user.email,
        product: "PC",
        description: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success("Ticket created");
            navigate("/");
        }
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, isSuccess, message, navigate]);

    const onSubmit = (e) => {
        e.preventDefault();
        const ticketSetData = {
            user: user._id,
            product: ticketData.product,
            description: ticketData.description,
            status: "new",
        };
        dispatch(createTicket(ticketSetData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>Cteate New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={ticketData.name}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={ticketData.email}
                        disabled
                    />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            id="product"
                            value={ticketData.product}
                            onChange={(e) =>
                                setTicketData({
                                    ...ticketData,
                                    product: e.target.value,
                                })
                            }
                        >
                            <option value="PC">PC</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Smartphone">Smartphone</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">
                            Description of the issue
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            className="form-control"
                            placeholder="Describe your problem"
                            value={ticketData.description}
                            onChange={(e) =>
                                setTicketData({
                                    ...ticketData,
                                    description: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                    <div className="form-group">
                        <BackButton url="/" />
                    </div>
                </form>
            </section>
        </>
    );
}

export default NewTicket;
