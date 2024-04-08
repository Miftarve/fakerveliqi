document.addEventListener("DOMContentLoaded", function () {
    let leagueSelect = document.getElementById('league');
    let teamSelect = document.getElementById('team');
    let generateBtn = document.getElementById('generate');
    let playersContainer = document.getElementById('players-container');

    leagueSelect.addEventListener('change', function () {
        let selectedLeague = leagueSelect.value;
        let teams = teamsByLeague[selectedLeague];

        teamSelect.innerHTML = '';

        teams.forEach(function (team) {
            let option = document.createElement('option');
            option.textContent = team;
            option.value = team;
            teamSelect.appendChild(option);
        });

        teamSelect.disabled = false;
    });

    generateBtn.addEventListener('click', function () {
        generatePlayers();
    });

    function generatePlayers() {
        fetch('http://localhost:3000/api/generate-players') 
            .then(response => response.json())
            .then(data => {
                updateUI(data);
            })
            .catch(error => {
                console.error('Errore durante la richiesta:', error);
            });
    }
    
    function updateUI(data) {
        playersContainer.innerHTML = ''; // Svuota il contenitore dei giocatori prima di aggiungere nuove card
    
        data.players.forEach(player => {
            let playerCard = document.createElement('div');
            playerCard.classList.add('card', 'm-2');
    
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
    
            let playerName = document.createElement('h5');
            playerName.classList.add('card-title');
            playerName.textContent = `${player.name} ${player.surname}`;
    
            let playerAge = document.createElement('p');
            playerAge.classList.add('card-text');
            playerAge.textContent = `Età: ${player.age}`;
    
            let playerNationality = document.createElement('p');
            playerNationality.classList.add('card-text');
            playerNationality.textContent = `Nazionalità: ${player.nationality}`;
    
            let playerPosition = document.createElement('p');
            playerPosition.classList.add('card-text');
            playerPosition.textContent = `Posizione: ${player.position}`;
    
            let playerTeam = document.createElement('p');
            playerTeam.classList.add('card-text');
            playerTeam.textContent = `Squadra: ${player.team}`;
    
            let playerWeight = document.createElement('p');
            playerWeight.classList.add('card-text');
            playerWeight.textContent = `Peso: ${player.weight}`;
    
            cardBody.appendChild(playerName);
            cardBody.appendChild(playerAge);
            cardBody.appendChild(playerNationality);
            cardBody.appendChild(playerPosition);
            cardBody.appendChild(playerTeam);
            cardBody.appendChild(playerWeight);
    
            playerCard.appendChild(cardBody);
    
            playersContainer.appendChild(playerCard);
        });
    }
    
    
    let teamsByLeague = {
        "SERIE A": ["Juventus", "Inter", "Milan", "Roma", "Napoli", "Atalanta", "Lazio", "Fiorentina", "Sassuolo", "Sampdoria", "Udinese", "Torino", "Bologna", "Verona", "Genoa", "Spezia", "Cagliari", "Empoli", "Venezia", "Salernitana"],
        "PREMIER LEAGUE": ["Manchester City", "Liverpool", "Chelsea", "Manchester United", "Leicester City", "West Ham United", "Tottenham Hotspur", "Arsenal", "Aston Villa", "Leeds United", "Everton", "Wolverhampton Wanderers", "Crystal Palace", "Newcastle United", "Southampton", "Brighton & Hove Albion", "Burnley", "Watford", "Brentford", "Norwich City"],
        "LIGUE 1": ["Paris Saint-Germain", "Lille", "Monaco", "Lyon", "Marseille", "Rennes", "Montpellier", "Nice", "Lens", "Metz", "Strasbourg", "Bordeaux", "Brest", "Reims", "Angers", "Lorient", "Saint-Étienne", "Troyes", "Clermont Foot", "Nantes"],
        "LALIGA": ["Real Madrid", "Barcelona", "Atlético Madrid", "Sevilla", "Real Sociedad", "Real Betis", "Villarreal", "Celta Vigo", "Athletic Bilbao", "Valencia", "Osasuna", "Espanyol", "Getafe", "Alavés", "Elche", "Levante", "Mallorca", "Granada", "Cadiz", "Rayo Vallecano"]
    };
});
