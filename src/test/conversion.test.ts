// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { describe, expect, test } from "vitest";
import { creerPlateau, indiceVersPosition, positionVersIndice } from "../index";

describe("Conversion position ↔ indice", () => {
  describe("positionVersIndice", () => {
    test("convertit position (0,0) en indice 0", () => {
      const plateau = creerPlateau(5, 3);
      expect(positionVersIndice({ x: 0, y: 0 }, plateau)).toBe(0);
    });

    test("convertit position (2,3) en indice 17 (largeur 5)", () => {
      const plateau = creerPlateau(5, 3);
      expect(positionVersIndice({ x: 2, y: 3 }, plateau)).toBe(17);
    });

    test("convertit dernière position (4,4) en indice 24 (plateau 5x5)", () => {
      const plateau = creerPlateau(5, 5);
      expect(positionVersIndice({ x: 4, y: 4 }, plateau)).toBe(24);
    });

    test("gère largeur différente (largeur 10)", () => {
      const plateau = creerPlateau(10, 3);
      expect(positionVersIndice({ x: 7, y: 2 }, plateau)).toBe(27);
    });
  });

  describe("indiceVersPosition", () => {
    test("convertit indice 0 en position (0,0)", () => {
      const plateau = creerPlateau(5, 3);
      expect(indiceVersPosition(0, plateau)).toEqual({ x: 0, y: 0 });
    });

    test("convertit indice 17 en position (2,3) (largeur 5)", () => {
      const plateau = creerPlateau(5, 3);
      expect(indiceVersPosition(17, plateau)).toEqual({ x: 2, y: 3 });
    });

    test("convertit indice 24 en position (4,4) (plateau 5x5)", () => {
      const plateau = creerPlateau(5, 3);
      expect(indiceVersPosition(24, plateau)).toEqual({ x: 4, y: 4 });
    });

    test("gère largeur différente (largeur 10)", () => {
      const plateau = creerPlateau(10, 3);
      expect(indiceVersPosition(27, plateau)).toEqual({ x: 7, y: 2 });
    });
  });

  describe("Conversion réversible", () => {
    test("position → indice → position retourne la position initiale", () => {
      const pos = { x: 3, y: 2 };
      const plateau = creerPlateau(5, 3);
      const indice = positionVersIndice(pos, plateau);
      expect(indiceVersPosition(indice, plateau)).toEqual(pos);
    });

    test("indice → position → indice retourne l'indice initial", () => {
      const plateau = creerPlateau(5, 3);
      const indice = 15;
      const pos = indiceVersPosition(indice, plateau);
      expect(positionVersIndice(pos, plateau)).toBe(indice);
    });
  });
});
