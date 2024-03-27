let currentPlayer = 'blue'; // Joueur actuel (bleu ou rouge)
let gameActive = true; // Etat de la partie, active ou non
let gameState = ["", "", "", "", "", "", "", "", ""]; // Tableau représentant l'état des cases du jeu (vide initialement)

// Conditions de victoire, représentant les indices des cases dans le gameState
const winningConditions = [
    [0, 1, 2], // Lignes horizontales
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Lignes verticales
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonales
    [2, 4, 6]
];

// Initialisation de la grille de jeu au chargement de la fenêtre
window.onload = () => {
    const gameGrid = document.getElementById('gameGrid'); // Récupération de l'élément gameGrid
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div'); // Création d'une nouvelle cellule
        cell.classList.add('cell'); // Ajout de la classe 'cell' pour le style
        cell.dataset.cellIndex = i; // Attribution d'un index à la cellule
        cell.addEventListener('click', handleCellClick, false); // Ajout de l'écouteur d'évènement pour gérer les clics
        gameGrid.appendChild(cell); // Ajout de la cellule à la grille de jeu
    }
    newGame(); // Démarrage d'une nouvelle partie
};

// Gestion des clics sur les cases de la grille
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; // Récupération de la cellule cliquée
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); // Récupération de l'index de la cellule

    // Vérification que la cellule n'est pas déjà prise et que la partie est active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Jouer dans la cellule et vérifier l'état de la partie
    playCell(clickedCell, clickedCellIndex);
    checkForWinner();
}

// Fonction pour jouer dans une cellule
function playCell(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; // Mise à jour de l'état de la cellule
    clickedCell.style.backgroundColor = currentPlayer; // Coloration de la cellule selon le joueur actuel
}

// Vérification de la condition de victoire après chaque coup
function checkForWinner() {
    let roundWon = false; // Indicateur de victoire

    // Parcourir toutes les conditions de victoire possibles
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i]; // Récupérer la condition de victoire courante
        let a = gameState[winCondition[0]]; // Premier élément de la condition de victoire
        let b = gameState[winCondition[1]]; // Deuxième élément
        let c = gameState[winCondition[2]]; // Troisième élément

        // Si l'une des cases de la condition est vide, passer à la suivante
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // Si les trois cases correspondent (victoire), arrêter la boucle
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // Si un joueur a gagné, mettre à jour le score et terminer la partie
    if (roundWon) {
        updateScore(); // Mettre à jour le score du joueur gagnant
        gameActive = false; // Mettre fin à la partie
    } else if (!gameState.includes("")) { // Vérifier si toutes les cellules sont remplies sans gagnant
        gameActive = false; // Mettre fin à la partie
        document.getElementById('statusMessage').textContent = "Match nul : aucun point attribué";
    } else {
        // Changement de joueur si la partie continue
        currentPlayer = currentPlayer === 'blue' ? 'red' : 'blue';
        // Mise à jour du message de statut pour indiquer quel joueur doit jouer
        document.getElementById('statusMessage').textContent = `Joueur ${capitalizeFirstLetter(currentPlayer)}, à toi de jouer !`;
    }
}

// Mise à jour du score du joueur gagnant
function updateScore() {
    const scoreSpan = document.getElementById(currentPlayer + 'Score'); // Récupération de l'élément de score
    let currentScore = parseInt(scoreSpan.textContent); // Conversion du score en nombre
    scoreSpan.textContent = currentScore + 1; // Incrémentation du score

    // Affichage du message de victoire
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = `${capitalizeFirstLetter(currentPlayer)} a gagné : +1 pt`;
}

// Fonction pour capitaliser la première lettre d'une chaîne (pour l'affichage).
// Renvoie "Bleu" pour "Blue" et "Rouge" pour "Red"
function capitalizeFirstLetter(string) {
    if (string === 'blue') {
        return 'Bleu';
    } else if (string === 'red') {
        return 'Rouge';
    }
    // Retourner la chaîne inchangée pour tout autre cas (si nécessaire)
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Initialisation d'une nouvelle partie
function newGame() {
    gameActive = true; // Activation de la partie
    currentPlayer = 'blue'; // Réinitialisation du joueur actuel à 'blue'
    gameState = ["", "", "", "", "", "", "", "", ""]; // Réinitialisation de l'état du jeu

    // Réinitialisation de l'affichage des cellules
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = 'green');

    // Réinitialisation du message de statut
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = 'Cliquez sur la grille pour jouer.';
}
