"use client"

import { useState } from 'react';

const AddMessage = () => {
  const [pseudonyme, setPseudonyme] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pseudonyme || !content) {
      setMessage('Pseudonyme et contenu sont obligatoires.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudonyme,
          content,
        }),
      });

      if (response.ok) {
        setMessage('Message ajouté avec succès !');
        setPseudonyme('');
        setContent('');
        router.push("http://localhost:8080");
      } else {
        setMessage('Erreur lors de l\'ajout du message.');
      }
    } catch (error) {
      setMessage('Erreur de connexion.');
      console.error(error);
    }
  };

  return (
    <main className="container">
      <h1>Ajouter un message</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pseudonyme">Pseudonyme</label>
          <input
            type="text"
            id="pseudonyme"
            value={pseudonyme}
            onChange={(e) => setPseudonyme(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Message</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </main>
  );
};

export default AddMessage;
