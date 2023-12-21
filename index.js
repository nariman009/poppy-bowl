const API_ENDPOINT = "https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players";

const state = {
    players: [],
}

async function fetchPlayers() {
    try {
        const response = await fetch(API_ENDPOINT);
        const json = await response.json();
        state.players = json.data.players;

        renderPlayers();
    } catch (error) {
        console.error("Error fetching players:", error);
    }
}

function renderPlayers() {
    location.hash = '';
    const playersContainer = document.getElementById('players-container');
    playersContainer.innerHTML = state.players.map(player => `
        <div class="player-card" onclick="showPlayerDetail('${player.id}')">
            <h2>${player.name}</h2>
            <p>${player.breed}</p>

        </div>
    `).join('');
}

function showPlayerDetail(playerId) {
    // Change the hash to navigate to the player detail view
    if (location.hash === `#player-${playerId}`) {
        location.hash = ''; // Remove the hash
    } else {
        location.hash = `#player-${playerId}`; // Update the hash
        renderPlayer(playerId);
    }
}

function renderPlayer(playerId) {
    console.log("PlayerID:", playerId);

    const playerContainer = document.getElementById('players-container');

    const selectedPlayer = state.players.find(p => p.id.toString() === playerId);
    console.log("selectedPlayer:", selectedPlayer);
    playerContainer.innerHTML = `
        <div class="player-card">
            <h2>${selectedPlayer.name}</h2>
            <p>${selectedPlayer.breed}</p>
            <img src="${selectedPlayer.imageUrl}" alt="Photo of ${selectedPlayer.name}" />
        </div>
    `;
    document.querySelector('h2').style.display = 'block';

}

// window.addEventListener('hashchange', handleHashChange);

// function handleHashChange() {
//     const hash = location.hash;
//     // If hash matches an player, show its description
//     if (hash.startsWith('#player-')) {
//     renderPlayer();
//     } else {
//         renderPlayers();
//     }
// }
fetchPlayers();