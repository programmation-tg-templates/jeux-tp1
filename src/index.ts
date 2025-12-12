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
};

// ============================================================================
// Niveau 1 : Création et conversion (30-40 min)
// ============================================================================

/**
 * Crée un plateau de jeu avec un tableau 1D de cases libres.
 * @param largeur - Largeur du plateau
 * @param hauteur - Hauteur du plateau
 * @returns PlateauDeJeu initialisé avec toutes les cases libres
 * @example creerPlateau(5, 5)
 */
export function creerPlateau(
  largeur: number,
  hauteur: number,
): PlateauDeJeu {
  throw new Error("À implémenter");
}

/**
 * Convertit une position (x, y) en indice dans le tableau 1D.
 * Formule : indice = y * largeur + x
 * @param position - Position à convertir
 * @param largeur - Largeur du plateau
 * @returns Indice correspondant dans le tableau 1D
 * @example positionVersIndice({x: 2, y: 3}, 5) // retourne 17
 */
export function positionVersIndice(position: Position, largeur: number): number {
  throw new Error("À implémenter");
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
  throw new Error("À implémenter");
}

// ============================================================================
// Niveau 2 : Logique de déplacement (40-50 min)
// ============================================================================

/**
 * Vérifie si une position est valide (dans les limites et case libre).
 * @param position - Position à vérifier
 * @param plateau - Plateau de jeu
 * @returns true si la position est valide, false sinon
 */
export function estValide(position: Position, plateau: PlateauDeJeu): boolean {
  throw new Error("À implémenter");
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
  plateau: PlateauDeJeu
): Position | null {
  throw new Error("À implémenter");
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
export function calculerScore(nombreMouvements: number, tempsSecondes: number): number {
  throw new Error("À implémenter");
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
export function compterCasesAccessibles(depart: Position, plateau: PlateauDeJeu): number {
  throw new Error("À implémenter");
}
