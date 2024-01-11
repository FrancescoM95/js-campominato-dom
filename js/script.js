console.log('JS OK');

// Recupero elementi dalla pagina

const play = document.getElementById('play');
const grid = document.getElementById('grid');
const form = document.getElementById('form');
const level = document.getElementById('level');
const scoreElement = document.getElementById('score');


//* FUNZIONI

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


// Funzione per creare 16 bombe 
const createBombs = max => {
    let bombs = [];

    while (bombs.length < 16) {
        let randomNumber = Math.floor(Math.random() * max) + 1;
        if (!bombs.includes(randomNumber)) {
            bombs.push(randomNumber);
        }
    }

    return bombs;
}

// Funizone per terminare il gioco

const endGame = (hasWon, score) => {
    const message = hasWon
        ? 'Complimenti! Hai vinto!'
        : `Hai perso! Hai totalizzato ${score} punti.`;
    return console.log(message);
}

// Funzione per scoprire tutte le celle

const revealAllCell = (bombs) => {
    const cells = document.querySelectorAll('.cell');

    for (let cell of cells) {
        cell.classList.add('clicked');
        if (bombs.includes(parseInt(cell.innerText))) {
            cell.classList.add('bomb');
        }
    }
}


// All'invio del form sul viene creata la griglia con un numero di celle variabile in base alla scelta dell'utente
form.addEventListener('submit', (e) => {
    e.preventDefault();

    grid.innerText = '';
    play.innerText = 'Ricomincia';

    // Dati di partenza
    const selectedLevel = parseInt(level.value);
    let rows;
    let cols;
    let score = 0;
    scoreElement.innerText = score;

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

    // Viene invocata la funzione per generare le bombe e i risultati vengono stampati in console
    const bombs = createBombs(totalCells);
    console.log("Numeri casuali generati:", bombs);


    for (let i = 1; i <= totalCells; i++) {
        const cell = createCell(i, selectedLevel);
        grid.appendChild(cell);

        // Al click, la cella si colora d'azzurro e stampiamo il numero corrispondente in console e mostriamo il punteggio in pagina
        cell.addEventListener('click', () => {
            if (cell.classList.contains('clicked')) return;
            cell.classList.add('clicked');
            console.log('Il numero della cella è:', i);

            // Verifico se è stata cliccata una bomba
            const hasHitBomb = bombs.includes(i);

            if (hasHitBomb) {
                cell.classList.add('bomb');
                hasWon = false;
                endGame(hasWon, score);
                revealAllCell(bombs);
            } else {
                scoreElement.innerText = ++score;
            }
        });
    }
});