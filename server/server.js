const express = require('express');
const cors = require('cors');
const { faker, fakerRO } = require('@faker-js/faker');

const app = express();
app.use(cors());

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funzione per selezionare casualmente un elemento dall'array
function getRandomTeam(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function generatePlayers() {
    let players = [];

    for (let i = 0; i < 27; i++) {
        let player = {
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            age: generateRandomNumber(18, 40),
            nationality: faker.location.country(),
            weight: generateRandomNumber(50, 100),
            jerseyNumber: generateRandomNumber(1, 99),
            position: getRandomTeam(["Portiere", "Difensore", "Centrocampista", "Attaccante"]),
            team: getRandomTeam(["Juventus", "Inter", "Milan", "Roma"]) 
        };
        players.push(player);
    }

    return players;
}

app.get('/api/generate-players', (req, res) => {
    const players = generatePlayers(); 
    res.json({ players });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Il server è in ascolto sulla porta ${PORT}`);
});
