import { 
    logout, 
    checkAuth,
    getGames,
    createGame,
} from '../fetch-utils.js';
import { renderGame } from '../render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

checkAuth();

let name1 = '';
let name2 = '';
let score1 = 0;
let score2 = 0;

nameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(nameForm);
    name1 = data.get('team-one');
    name2 = data.get('team-two');

    nameForm.reset();
    displayCurrentGameEl();
});


teamOneAddButton.addEventListener('click', () => {
    score1++;
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    score2++;
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    score1--;
    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    score2--;
    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', async() => {
    const game = {
        name1,
        name2,
        score1,
        score2,
    };
    
    pastGamesEl.textContent = '';

    await createGame(game);

    displayAllGames();
    
    name1 = '';
    name2 = '';
    score1 = 0;
    score2 = 0;

    displayCurrentGameEl();
});

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    await displayAllGames();
});


function displayCurrentGameEl() {
    const game = {
        name1,
        name2,
        score1,
        score2,
    };

    currentGameEl.textContent = '';
    teamOneLabel.textContent = name1;
    teamTwoLabel.textContent = name2;

    const currentGame = renderGame(game);
    currentGameEl.append(currentGame);
}


async function displayAllGames() {

    const pastGames = await getGames();

    for (let game of pastGames) {
        const games = renderGame(game);
        pastGamesEl.append(games);
    }
}

displayCurrentGameEl();
