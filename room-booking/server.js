const express = require('express');
const app = express();
const path = require('path');

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Route spécifique pour la page base64
app.get('/base64', (req, res) => {
    console.log('Route /base64 appelée');
    res.sendFile(path.join(__dirname, 'download-base64.html'));
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
    console.log('Route / appelée');
    res.sendFile(path.join(__dirname, 'download.html'));
});

// Route pour le téléchargement
app.get('/download', (req, res) => {
    console.log('Route /download appelée');
    const file = path.join(__dirname, 'room-booking.zip');
    res.download(file, 'room-booking.zip');
});

// Servir les fichiers statiques après les routes spécifiques
app.use(express.static(path.join(__dirname)));

app.listen(8000, () => {
    console.log('Serveur démarré sur http://localhost:8000');
});
