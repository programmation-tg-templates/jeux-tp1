// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { describe, expect, test } from "vitest";
import { calculerScore } from "../index";

describe("Calcul du score", () => {
  test("calcule score = mouvements + temps", () => {
    expect(calculerScore(10, 30)).toBe(40);
  });

  test("gère score avec 0 mouvements", () => {
    expect(calculerScore(0, 15)).toBe(15);
  });

  test("gère score avec 0 secondes", () => {
    expect(calculerScore(20, 0)).toBe(20);
  });

  test("calcule score pour valeurs élevées", () => {
    expect(calculerScore(100, 250)).toBe(350);
  });
});
