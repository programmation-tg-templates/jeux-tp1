// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { beforeEach, describe, expect, test } from "@jest/globals";
import type { PlateauDeJeu } from "../index";
import { creerPlateau, deplacerPersonnage, estValide } from "../index";

describe("Logique de déplacement", () => {
  let plateau: PlateauDeJeu;

  beforeEach(() => {
    plateau = creerPlateau(5, 5, { x: 0, y: 0 }, { x: 4, y: 4 });
  });

  describe("estValide", () => {
    test("accepte une position à l'intérieur du plateau (case libre)", () => {
      expect(estValide({ x: 2, y: 2 }, plateau)).toBe(true);
    });

    test("rejette position x négatif", () => {
      expect(estValide({ x: -1, y: 2 }, plateau)).toBe(false);
    });

    test("rejette position y négatif", () => {
      expect(estValide({ x: 2, y: -1 }, plateau)).toBe(false);
    });

    test("rejette position x hors limites", () => {
      expect(estValide({ x: 5, y: 2 }, plateau)).toBe(false);
    });

    test("rejette position y hors limites", () => {
      expect(estValide({ x: 2, y: 5 }, plateau)).toBe(false);
    });

    test("accepte les coins du plateau", () => {
      expect(estValide({ x: 0, y: 0 }, plateau)).toBe(true);
      expect(estValide({ x: 4, y: 4 }, plateau)).toBe(true);
    });

    test("rejette une case bloquée", () => {
      plateau.cases[12] = "bloqué"; // Position (2,2)
      expect(estValide({ x: 2, y: 2 }, plateau)).toBe(false);
    });
  });

  describe("deplacerPersonnage", () => {
    test("déplace vers le haut", () => {
      const result = deplacerPersonnage({ x: 2, y: 2 }, "haut", plateau);
      expect(result).toEqual({ x: 2, y: 1 });
    });

    test("déplace vers le bas", () => {
      const result = deplacerPersonnage({ x: 2, y: 2 }, "bas", plateau);
      expect(result).toEqual({ x: 2, y: 3 });
    });

    test("déplace vers la gauche", () => {
      const result = deplacerPersonnage({ x: 2, y: 2 }, "gauche", plateau);
      expect(result).toEqual({ x: 1, y: 2 });
    });

    test("déplace vers la droite", () => {
      const result = deplacerPersonnage({ x: 2, y: 2 }, "droite", plateau);
      expect(result).toEqual({ x: 3, y: 2 });
    });

    test("retourne null si déplacement hors limites (bord supérieur)", () => {
      const result = deplacerPersonnage({ x: 2, y: 0 }, "haut", plateau);
      expect(result).toBeNull();
    });

    test("retourne null si déplacement hors limites (bord droit)", () => {
      const result = deplacerPersonnage({ x: 4, y: 2 }, "droite", plateau);
      expect(result).toBeNull();
    });

    test("retourne null si case cible bloquée", () => {
      plateau.cases[7] = "bloqué"; // Position (2,1)
      const result = deplacerPersonnage({ x: 2, y: 2 }, "haut", plateau);
      expect(result).toBeNull();
    });
  });
});
