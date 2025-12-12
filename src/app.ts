// ============================================================================
// Jeu de Labyrinthe - Application principale
//
// !!! NE PAS MODIFIER CE FICHIER !!!
// ============================================================================

// Import des fonctions depuis le code étudiant
import type { Direction, PlateauDeJeu, Position } from "./index.js";

import {
  creerPlateau,
  positionVersIndice,
  deplacerPersonnage,
  calculerScore,
} from "./index.js";

// ============================================================================
// État du jeu
// ============================================================================

let plateau: PlateauDeJeu;
let positionPersonnage: Position;
let startTime: number;
let moveCount = 0;
let timerInterval: number;
let isGameWon = false;

// ============================================================================
// Configuration du plateau par défaut
// ============================================================================

const CONFIG = {
  largeur: 8,
  hauteur: 6,
  depart: { x: 0, y: 0 },
  cible: { x: 7, y: 5 },
  obstacles: [
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 5, y: 2 },
    { x: 5, y: 3 },
    { x: 5, y: 4 },
    { x: 3, y: 4 },
    { x: 4, y: 4 },
  ],
};

// ============================================================================
// Emojis pour le thème Escape Room
// ============================================================================

const EMOJIS = {
  libre: "⬜",
  bloque: "🧱",
  personnage: "🚶",
  cible: "🚪",
};

// ============================================================================
// Initialisation du jeu
// ============================================================================

function initGame() {
  try {
    plateau = creerPlateau(CONFIG.largeur, CONFIG.hauteur);

    // Placer les obstacles
    CONFIG.obstacles.forEach((pos) => {
      const indice = positionVersIndice(pos, plateau);
      plateau.cases[indice] = "bloqué";
    });

    positionPersonnage = { ...CONFIG.depart };
    moveCount = 0;
    isGameWon = false;
    startTime = Date.now();

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    renderBoard();
    updateStats();
    showMessage("");
  } catch (error: any) {
    showMessage(`Erreur lors de l'initialisation : ${error.message}`, "error");
    console.error("Erreur initialisation:", error);
  }
}

// ============================================================================
// Rendu du plateau
// ============================================================================

function renderBoard() {
  const boardEl = document.getElementById("game-board");
  if (!plateau) {
    boardEl!.innerHTML =
      '<p class="error">Plateau non initialisé. Vérifiez votre fonction creerPlateau().</p>';
    return;
  }

  boardEl!.style.gridTemplateColumns = `repeat(${plateau.largeur}, 50px)`;
  boardEl!.style.gridTemplateRows = `repeat(${plateau.hauteur}, 50px)`;

  boardEl!.innerHTML = "";

  for (let y = 0; y < plateau.hauteur; y++) {
    for (let x = 0; x < plateau.largeur; x++) {
      const pos = { x, y };
      const indice = positionVersIndice(pos, plateau);
      const etatCase = plateau.cases[indice];

      const cell = document.createElement("div");
      cell.className = `cell ${etatCase}`;

      // Déterminer le contenu de la cellule
      if (
        positionPersonnage &&
        pos.x === positionPersonnage.x &&
        pos.y === positionPersonnage.y
      ) {
        cell.classList.add("personnage");
        cell.textContent = EMOJIS.personnage;
      } else if (pos.x === CONFIG.cible.x && pos.y === CONFIG.cible.y) {
        cell.classList.add("cible");
        cell.textContent = EMOJIS.cible;
      } else if (etatCase === "bloqué") {
        cell.textContent = EMOJIS.bloque;
      } else {
        cell.textContent = EMOJIS.libre;
      }

      boardEl!.appendChild(cell);
    }
  }
}

// ============================================================================
// Déplacement du personnage
// ============================================================================

function movePlayer(direction: Direction) {
  if (isGameWon || !plateau) return;

  try {
    const copiePosition = { ...positionPersonnage };
    const newPosition = deplacerPersonnage(copiePosition, direction, plateau);

    moveCount++;
    updateStats();

    if (newPosition) {
      positionPersonnage = newPosition;
      renderBoard();

      // Vérifier victoire
      if (
        positionPersonnage.x === CONFIG.cible.x &&
        positionPersonnage.y === CONFIG.cible.y
      ) {
        winGame();
      }
    } else {
      showMessage("Déplacement impossible !", "error");
      setTimeout(() => showMessage(""), 1500);
    }
  } catch (error: any) {
    showMessage(`Erreur : ${error.message}`, "error");
    console.error("Erreur déplacement:", error);
  }
}

// ============================================================================
// Victoire
// ============================================================================

function winGame() {
  isGameWon = true;
  clearInterval(timerInterval);

  const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
  const finalScore = calculerScore(moveCount, timeElapsed);

  showMessage(
    `🎉 Victoire ! Score : ${finalScore} (${moveCount} mouvements, ${timeElapsed}s)`,
    "success",
  );
}

// ============================================================================
// Mise à jour des statistiques
// ============================================================================

function updateStats() {
  document.getElementById("move-count")!.textContent = `${moveCount}`;
  updateScore();
}

function updateTimer() {
  if (isGameWon || !startTime) return;

  const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("time-display")!.textContent = `${timeElapsed}s`;
  updateScore();
}

function updateScore() {
  if (!startTime) return;

  const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
  try {
    const score = calculerScore(moveCount, timeElapsed);
    document.getElementById("score-display")!.textContent = `${score}`;
  } catch (error) {
    document.getElementById("score-display")!.textContent = "?";
  }
}

// ============================================================================
// Messages
// ============================================================================

function showMessage(text: string, type = "") {
  const messageEl = document.getElementById("game-message");
  messageEl!.textContent = text;
  messageEl!.className = `message ${type}`;
}

// ============================================================================
// Génération aléatoire d'obstacles
// ============================================================================

function generateRandomMaze() {
  const largeur = CONFIG.largeur;
  const hauteur = CONFIG.hauteur;
  const obstacles: Position[] = [];

  // Générer des obstacles aléatoires (environ 20% du plateau)
  const targetObstacles = Math.floor(largeur * hauteur * 0.2);

  for (let i = 0; i < targetObstacles; i++) {
    const x = Math.floor(Math.random() * largeur);
    const y = Math.floor(Math.random() * hauteur);

    // Ne pas bloquer départ ni cible
    if (
      (x === CONFIG.depart.x && y === CONFIG.depart.y) ||
      (x === CONFIG.cible.x && y === CONFIG.cible.y)
    ) {
      continue;
    }

    // Éviter les doublons
    if (!obstacles.some((obs) => obs.x === x && obs.y === y)) {
      obstacles.push({ x, y });
    }
  }

  CONFIG.obstacles = obstacles;
  initGame();
}

// ============================================================================
// Gestion des événements
// ============================================================================

document
  .getElementById("btn-up")
  ?.addEventListener("click", () => movePlayer("haut"));
document
  .getElementById("btn-down")
  ?.addEventListener("click", () => movePlayer("bas"));
document
  .getElementById("btn-left")
  ?.addEventListener("click", () => movePlayer("gauche"));
document
  .getElementById("btn-right")
  ?.addEventListener("click", () => movePlayer("droite"));
document.getElementById("btn-reset")?.addEventListener("click", initGame);
document
  .getElementById("btn-generate")
  ?.addEventListener("click", generateRandomMaze);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      movePlayer("haut");
      break;
    case "ArrowDown":
      e.preventDefault();
      movePlayer("bas");
      break;
    case "ArrowLeft":
      e.preventDefault();
      movePlayer("gauche");
      break;
    case "ArrowRight":
      e.preventDefault();
      movePlayer("droite");
      break;
  }
});

// ============================================================================
// Polling des résultats de tests (JSON Vitest)
// ============================================================================

async function loadTestResults() {
  try {
    const response = await fetch("/test-results.json");
    if (!response.ok) return;

    const data = await response.json();
    if (!data.testResults) return;

    // Calculer le nombre de tests
    let totalTests = 0;
    let passedTests = 0;

    data.testResults.forEach((suite: any) => {
      suite.assertionResults.forEach((test: any) => {
        totalTests++;
        if (test.status === "passed") passedTests++;
      });
    });

    // Mettre à jour l'affichage
    document.getElementById("tests-total")!.textContent = `${totalTests}`;
    document.getElementById("tests-passed")!.textContent = `${passedTests}`;

    const percentage = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
    const progressBar = document.getElementById("progress-bar");
    progressBar!.style.width = `${percentage}%`;
    progressBar!.textContent = `${Math.round(percentage)}%`;
  } catch (error) {
    // Silence - le fichier peut ne pas exister encore
  }
}

// Polling toutes les 2 secondes
setInterval(loadTestResults, 2000);
loadTestResults(); // Chargement initial

// ============================================================================
// Démarrage du jeu
// ============================================================================

initGame();
