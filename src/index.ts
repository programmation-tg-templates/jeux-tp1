// Écrivez votre code dans ce fichier.

// ============================================================================
// Types pour le jeu Labyrinthe
// ============================================================================

export type Position = { x: number; y: number };
export type Direction = "haut" | "bas" | "gauche" | "droite";
export type EtatCase = "libre" | "bloqué";
export type PlateauDeJeu = {
  largeur: number;
  hauteur: number;
  cases: EtatCase[];
  depart: Position;
  cible: Position;
};

// ============================================================================
// Niveau 1 : Création et conversion (30-40 min)
// ============================================================================

/**
 * Crée un plateau de jeu avec un tableau 1D de cases libres.
 * @param largeur - Largeur du plateau
 * @param hauteur - Hauteur du plateau
 * @param depart - Position de départ du personnage
 * @param cible - Position cible à atteindre
 * @returns PlateauDeJeu initialisé avec toutes les cases libres
 * @example creerPlateau(5, 5, {x: 0, y: 0}, {x: 4, y: 4})
 */
export function creerPlateau(
  largeur: number,
  hauteur: number,
  depart: Position,
  cible: Position,
): PlateauDeJeu {
  const nombreCases = largeur * hauteur;
  const cases: EtatCase[] = new Array(nombreCases).fill("libre");
  return {
    largeur,
    hauteur,
    cases,
    depart,
    cible,
  };
}

/**
 * Convertit une position (x, y) en indice dans le tableau 1D.
 * Formule : indice = y * largeur + x
 * @param position - Position à convertir
 * @param largeur - Largeur du plateau
 * @returns Indice correspondant dans le tableau 1D
 * @example positionVersIndice({x: 2, y: 3}, 5) // retourne 17
 */
export function positionVersIndice(
  position: Position,
  largeur: number,
): number {
  return position.y * largeur + position.x;
}

/**
 * Convertit un indice du tableau 1D en position (x, y).
 * Formules : x = indice % largeur, y = Math.floor(indice / largeur)
 * @param indice - Indice dans le tableau 1D
 * @param largeur - Largeur du plateau
 * @returns Position correspondante
 * @example indiceVersPosition(17, 5) // retourne {x: 2, y: 3}
 */
export function indiceVersPosition(indice: number, largeur: number): Position {
  const x = indice % largeur;
  const y = Math.floor(indice / largeur);
  return { x, y };
}

// ============================================================================
// Niveau 2 : Logique de déplacement (40-50 min)
// ============================================================================

function getCase(position: Position, plateau: PlateauDeJeu): EtatCase {
  const indice = positionVersIndice(position, plateau.largeur);
  return plateau.cases[indice];
}

function isWithinBounds(position: Position, plateau: PlateauDeJeu): boolean {
  return (
    position.x >= 0 &&
    position.x < plateau.largeur &&
    position.y >= 0 &&
    position.y < plateau.hauteur
  );
}

/**
 * Vérifie si une position est valide (dans les limites et case libre).
 * @param position - Position à vérifier
 * @param plateau - Plateau de jeu
 * @returns true si la position est valide, false sinon
 */
export function estValide(position: Position, plateau: PlateauDeJeu): boolean {
  return (
    isWithinBounds(position, plateau) && getCase(position, plateau) === "libre"
  );
}

function getNewPosition(
  positionActuelle: Position,
  direction: Direction,
): Position {
  const nouvellePosition = { ...positionActuelle };
  switch (direction) {
    case "haut":
      nouvellePosition.y--;
      break;
    case "bas":
      nouvellePosition.y++;
      break;
    case "gauche":
      nouvellePosition.x--;
      break;
    case "droite":
      nouvellePosition.x++;
      break;
  }
  return nouvellePosition;
}

/**
 * Déplace le personnage dans une direction.
 * @param positionActuelle - Position actuelle du personnage
 * @param direction - Direction du déplacement
 * @param plateau - Plateau de jeu
 * @returns Nouvelle position si valide, null sinon
 */
export function deplacerPersonnage(
  positionActuelle: Position,
  direction: Direction,
  plateau: PlateauDeJeu,
): Position | null {
  const positionCandidate = getNewPosition(positionActuelle, direction);
  if (estValide(positionCandidate, plateau)) {
    return positionCandidate;
  } else {
    return null;
  }
}

// ============================================================================
// Niveau 3 : Score (20-30 min)
// ============================================================================

/**
 * Calcule le score basé sur le nombre de mouvements et le temps.
 * Score = nombreMouvements + tempsSecondes
 * @param nombreMouvements - Nombre de mouvements effectués
 * @param tempsSecondes - Temps écoulé en secondes
 * @returns Score calculé
 */
export function calculerScore(
  nombreMouvements: number,
  tempsSecondes: number,
): number {
  return nombreMouvements + tempsSecondes;
}

// ============================================================================
// Bonus : Parcours en largeur (optionnel)
// ============================================================================

/**
 * Compte le nombre de cases accessibles depuis une position de départ.
 * Utilise un parcours en largeur (BFS) avec une file.
 * @param depart - Position de départ
 * @param plateau - Plateau de jeu
 * @returns Nombre de cases accessibles
 */
export function compterCasesAccessibles(
  depart: Position,
  plateau: PlateauDeJeu,
): number {
  let nombreCasesAccessibles = 0;
  const positionsAExplorer: Position[] = [depart];
  const positionsExplorees: Position[] = [];

  while (positionsAExplorer.length > 0) {
    const positionCourante = positionsAExplorer.shift()!;
    positionsExplorees.push(positionCourante);
    nombreCasesAccessibles++;
    const positionCandidates: Position[] = [
      getNewPosition(positionCourante, "haut"),
      getNewPosition(positionCourante, "bas"),
      getNewPosition(positionCourante, "gauche"),
      getNewPosition(positionCourante, "droite"),
    ];
    const nouvellesPositions = positionCandidates
      .filter((pos) => estValide(pos, plateau))
      .filter(
        (pos) =>
          !positionsAExplorer.some(
            (otherPos) => pos.x === otherPos.x && pos.y === otherPos.y,
          ),
      )
      .filter(
        (pos) =>
          !positionsExplorees.some(
            (otherPos) => pos.x === otherPos.x && pos.y === otherPos.y,
          ),
      );
    positionsAExplorer.push(...nouvellesPositions);
  }

  return nombreCasesAccessibles;
}
