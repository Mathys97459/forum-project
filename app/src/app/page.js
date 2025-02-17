"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/messages")
            .then(response => setMessages(response.data))
            .catch(error => console.error("Erreur lors du chargement des messages :", error));
    }, []);

    return (
        <main className="container">
            <h1>Forum</h1>
            <div className="messages">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg.id} className="message">
                            <strong>{msg.pseudonyme}</strong>: {msg.content}
                        </div>
                    ))
                ) : (
                    <p>Aucun message pour le moment...</p>
                )}
            </div>
        </main>
    );
}
