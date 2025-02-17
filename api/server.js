require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Message = require('./models/message');

const app = express();
app.use(cors());
app.use(express.json());

// Test de connexion à la BDD
sequelize.authenticate()
    .then(() => console.log('🟢 Connexion à PostgreSQL réussie'))
    .catch(err => console.error('🔴 Erreur de connexion à PostgreSQL', err));

// Routes
app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.findAll({ order: [['created_at', 'DESC']] });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/messages', async (req, res) => {
    try {
        const { pseudonyme, content } = req.body;
        if (!pseudonyme || !content) {
            return res.status(400).json({ error: 'Pseudonyme et contenu requis' });
        }
        const newMessage = await Message.create({ pseudonyme, content });
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);

    // Synchroniser Sequelize avec la BDD (force:false pour ne pas écraser les données)
    await sequelize.sync({ force: false });
});
