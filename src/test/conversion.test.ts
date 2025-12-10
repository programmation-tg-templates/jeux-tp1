// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { positionVersIndice, indiceVersPosition } from '../index';

describe('Conversion position ↔ indice', () => {
  describe('positionVersIndice', () => {
    test('convertit position (0,0) en indice 0', () => {
      expect(positionVersIndice({x: 0, y: 0}, 5)).toBe(0);
    });

    test('convertit position (2,3) en indice 17 (largeur 5)', () => {
      expect(positionVersIndice({x: 2, y: 3}, 5)).toBe(17);
    });

    test('convertit dernière position (4,4) en indice 24 (plateau 5x5)', () => {
      expect(positionVersIndice({x: 4, y: 4}, 5)).toBe(24);
    });

    test('gère largeur différente (largeur 10)', () => {
      expect(positionVersIndice({x: 7, y: 2}, 10)).toBe(27);
    });
  });

  describe('indiceVersPosition', () => {
    test('convertit indice 0 en position (0,0)', () => {
      expect(indiceVersPosition(0, 5)).toEqual({x: 0, y: 0});
    });

    test('convertit indice 17 en position (2,3) (largeur 5)', () => {
      expect(indiceVersPosition(17, 5)).toEqual({x: 2, y: 3});
    });

    test('convertit indice 24 en position (4,4) (plateau 5x5)', () => {
      expect(indiceVersPosition(24, 5)).toEqual({x: 4, y: 4});
    });

    test('gère largeur différente (largeur 10)', () => {
      expect(indiceVersPosition(27, 10)).toEqual({x: 7, y: 2});
    });
  });

  describe('Conversion réversible', () => {
    test('position → indice → position retourne la position initiale', () => {
      const pos = {x: 3, y: 2};
      const indice = positionVersIndice(pos, 5);
      expect(indiceVersPosition(indice, 5)).toEqual(pos);
    });

    test('indice → position → indice retourne l\'indice initial', () => {
      const indice = 15;
      const pos = indiceVersPosition(indice, 5);
      expect(positionVersIndice(pos, 5)).toBe(indice);
    });
  });
});
