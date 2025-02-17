"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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
      <div style={{display: 'flex'}}>
      <Link href="/sender">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
          </svg>
          Ajouter un message
        </button>
      </Link>
      </div>
    </main>
  );
}
