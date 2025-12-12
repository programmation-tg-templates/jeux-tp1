// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { describe, expect, test } from "vitest";
import { creerPlateau } from "../index";

describe("Création du plateau", () => {
  test("crée un plateau avec les bonnes dimensions", () => {
    const plateau = creerPlateau(5, 5);
    expect(plateau.largeur).toBe(5);
    expect(plateau.hauteur).toBe(5);
    expect(plateau.cases.length).toBe(25);
  });

  test('initialise toutes les cases à "libre"', () => {
    const plateau = creerPlateau(3, 3);
    expect(plateau.cases.every((c) => c === "libre")).toBe(true);
  });

  test("gère un plateau 1x1", () => {
    const plateau = creerPlateau(1, 1);
    expect(plateau.cases.length).toBe(1);
  });

  test("gère un plateau rectangulaire", () => {
    const plateau = creerPlateau(10, 5);
    expect(plateau.largeur).toBe(10);
    expect(plateau.hauteur).toBe(5);
    expect(plateau.cases.length).toBe(50);
  });
});
