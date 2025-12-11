// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { describe, expect, test } from "@jest/globals";
import { creerPlateau } from "../index";

describe("Création du plateau", () => {
  test("crée un plateau avec les bonnes dimensions", () => {
    const plateau = creerPlateau(5, 5, { x: 0, y: 0 }, { x: 4, y: 4 });
    expect(plateau.largeur).toBe(5);
    expect(plateau.hauteur).toBe(5);
    expect(plateau.cases.length).toBe(25);
  });

  test('initialise toutes les cases à "libre"', () => {
    const plateau = creerPlateau(3, 3, { x: 0, y: 0 }, { x: 2, y: 2 });
    expect(plateau.cases.every((c) => c === "libre")).toBe(true);
  });

  test("stocke correctement les positions de départ et cible", () => {
    const depart = { x: 1, y: 1 };
    const cible = { x: 3, y: 3 };
    const plateau = creerPlateau(5, 5, depart, cible);
    expect(plateau.depart).toEqual(depart);
    expect(plateau.cible).toEqual(cible);
  });

  test("gère un plateau 1x1", () => {
    const plateau = creerPlateau(1, 1, { x: 0, y: 0 }, { x: 0, y: 0 });
    expect(plateau.cases.length).toBe(1);
  });

  test("gère un plateau rectangulaire", () => {
    const plateau = creerPlateau(10, 5, { x: 0, y: 0 }, { x: 9, y: 4 });
    expect(plateau.largeur).toBe(10);
    expect(plateau.hauteur).toBe(5);
    expect(plateau.cases.length).toBe(50);
  });
});
