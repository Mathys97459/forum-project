"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Sender() {
    const [pseudonyme, setPseudonyme] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!pseudonyme || !content) {
            setError("Tous les champs sont requis !");
            return;
        }

        try {
            await axios.post("http://localhost:3000/messages", {
                pseudonyme,
                content
            });

            router.push("/");
        } catch (err) {
            setError("Erreur lors de l'envoi du message !");
            console.error(err);
        }
    };

    return (
        <main className="container">
            <h1>Ajouter un message</h1>
            <form onSubmit={handleSubmit} className="form">
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Pseudonyme"
                    value={pseudonyme}
                    onChange={(e) => setPseudonyme(e.target.value)}
                />
                <textarea
                    placeholder="Votre message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="submit">Envoyer</button>
            </form>
        </main>
    );
}
