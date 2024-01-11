console.log('JS OK');

// Recupero elementi dalla pagina

const play = document.getElementById('play');
const grid = document.getElementById('grid');
const form = document.getElementById('form');
const level = document.getElementById('level');
const scoreElement = document.getElementById('score');
const messageField = document.getElementById('message');
const boxScore = document.getElementById('score-box');



//*-----------------------------------------
//* FUNZIONI
//*-----------------------------------------

/**
 * Funzione per creare una cella
 * @param {number} cellNumber Numero che verrà inserito come testo nella cella che corrisponde al numero progressivo del contatore
 * @param {number} size Valore che rappresenta la grandezza della griglia scelta dall'utente e di conseguenza determina il numero totale e la dimensione delle celle
 * @returns newCell Nuova cella creata
 */
const createCell = (cellNumber, size) => {
    const newCell = document.createElement('div');
    newCell.innerText = cellNumber;
    newCell.classList.add('cell');
    if (size === 1) {
        newCell.classList.add('big');
    } else if (size === 2) {
        newCell.classList.add('mid');
    } else if (size === 3) {
        newCell.classList.add('small');
    }
    return newCell;
};



/**
 * Funzione per creare TOT bombe che hanno numeri casuali da 1 a TOT (tutti diversi tra loro)
 * @param {number} max Numero che rappresenta la quantità totale di celle e di conseguenza il numero massimo per la randomizzazione numeri per le bombe
 * @param {number} numOfBombs Il numero di bombe da generare
 * @returns {Array} Restituisce un array con TOT numeri per le bombe
 */
const createBombs = (max, numOfBombs) => {
    let bombs = [];

    while (bombs.length < numOfBombs) {
        let randomNumber = Math.floor(Math.random() * max) + 1;
        if (!bombs.includes(randomNumber)) {
            bombs.push(randomNumber);
        }
    }
    return bombs;
}



/**
 * Funizone per terminare il gioco e mostrare in pagina il messaggio
 * @param {boolean} hasWon Valore che indica se l'utente ha vinto oppure no(true se ha vinto, false se ha perso)
 * @param {number} score Rappresenta il punteggio raggiunto dall'utente
 * @returns {string} message Restituisce il messaggio corrispondente
 */
const endGame = (hasWon, score) => {
    const message = hasWon
        ? `Complimenti! Hai vinto! Hai totalizzato ${score} punti.`
        : `Hai perso! Hai totalizzato ${score} punti.`;
    scoreElement.innerText = '';
    return messageField.innerText = message;
}



/**
 * Funzione per colorare tutte le celle e le bombe istantaneamente
 * @param {Array} bombs Array contenente le bombe
 */
const revealAllCell = (bombs) => {
    const cells = document.querySelectorAll('.cell');

    for (let cell of cells) {
        cell.classList.add('clicked');
        if (bombs.includes(parseInt(cell.innerText))) {
            cell.classList.add('bomb');
        }
    }
}



//*-----------------------------------------
//* SVOLGIMENTO
//*-----------------------------------------

// All'invio del form sul viene creata la griglia con un numero di celle variabile in base alla scelta dell'utente
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //! Svuoto griglia e messaggio 
    grid.innerText = '';
    messageField.innerText = '';
    boxScore.classList.remove('d-none')
    play.innerText = 'Ricomincia';

    // Dati di partenza
    const selectedLevel = parseInt(level.value);
    let rows;
    let cols;
    let numOfBombs = 16;
    let score = 0;
    scoreElement.innerText = score;

    // Selezione del livello
    if (selectedLevel === 1) {
        rows = 10;
        cols = 10;
    } else if (selectedLevel === 2) {
        rows = 9;
        cols = 9;
    } else if (selectedLevel === 3) {
        rows = 7;
        cols = 7;
    }

    const totalCells = rows * cols;
    let maxPoints = totalCells - numOfBombs


    // Viene invocata la funzione per generare le bombe e stamparle in console
    const bombs = createBombs(totalCells, numOfBombs);
    console.log("Numeri casuali generati:", bombs);

    //Viene invocata la funzione per creare le celle attraverso un ciclo
    for (let i = 1; i <= totalCells; i++) {
        const cell = createCell(i, selectedLevel);
        grid.appendChild(cell);

        // Al click, la cella si colora d'azzurro, stampiamo il numero corrispondente in console e aumentiamo il punteggio totale
        cell.addEventListener('click', () => {
            if (cell.classList.contains('clicked')) return;
            cell.classList.add('clicked');
            console.log('Il numero della cella è:', i);

            // Se viene cliccata una bomba la cella si colora di rosso e il gioco termina
            const hasHitBomb = bombs.includes(i);

            if (hasHitBomb) {
                cell.classList.add('bomb');
                hasWon = false;
                endGame(hasWon, score);
                revealAllCell(bombs);
            } else {
                scoreElement.innerText = ++score;
            }

            // Verifico se l'utente ha vinto
            if (score === maxPoints) {
                endGame(true, score);
                revealAllCell(bombs);
            }
        });
    }
});