// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { describe, expect, test } from "vitest";
import { compterCasesAccessibles, creerPlateau } from "../index";

describe("Bonus : Compter cases accessibles", () => {
  test("compte toutes les cases si plateau vide", () => {
    const plateau = creerPlateau(5, 5, { x: 0, y: 0 }, { x: 4, y: 4 });
    expect(compterCasesAccessibles({ x: 0, y: 0 }, plateau)).toBe(25);
  });

  test("compte 1 si personnage isolé", () => {
    const plateau = creerPlateau(3, 3, { x: 1, y: 1 }, { x: 2, y: 2 });
    // Bloquer toutes les cases adjacentes à (1,1)
    plateau.cases[0] = "bloqué";
    plateau.cases[1] = "bloqué";
    plateau.cases[2] = "bloqué";
    plateau.cases[3] = "bloqué";
    /* (1,1) libre */ plateau.cases[5] = "bloqué";
    plateau.cases[6] = "bloqué";
    plateau.cases[7] = "bloqué";
    plateau.cases[8] = "bloqué";
    expect(compterCasesAccessibles({ x: 1, y: 1 }, plateau)).toBe(1);
  });

  test("compte cases accessibles dans un couloir", () => {
    const plateau = creerPlateau(5, 1, { x: 0, y: 0 }, { x: 4, y: 0 });
    expect(compterCasesAccessibles({ x: 0, y: 0 }, plateau)).toBe(5);
  });
});
