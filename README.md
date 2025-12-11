# Programmation - TP Jeux - Labyrinthe (Escape Room)

## Présentation

Bienvenue dans ce TP où vous allez implémenter la logique d'un jeu de labyrinthe avec le thème d'une Escape Room. Votre objectif est de coder les fonctions TypeScript qui permettront à un personnage de se déplacer dans un labyrinthe pour atteindre la sortie.

Ce TP met l'accent sur la manipulation de **tableaux 1D** avec conversion d'indices, la création de types TypeScript personnalisés, et la logique de déplacement dans un espace 2D représenté par un tableau 1D.

## Compétences visées

- Manipulation de tableaux 1D (création, accès, modification)
- Conversion entre coordonnées (x, y) et indices de tableau 1D
- Utilisation de types TypeScript personnalisés (`type` et interfaces)
- Structures de contrôle (conditions, boucles)
- Fonctions avec paramètres et valeurs de retour
- Gestion des cas limites (positions hors limites, null)
- Algorithme de parcours (bonus : BFS avec file)

## Prérequis

- Node.js 18 ou supérieur
- npm (inclus avec Node.js)
- Un éditeur de code (WebStorm recommandé)

## Installation

Clonez ce dépôt et installez les dépendances :

```bash
npm install
```

## Utilisation

### Lancer le jeu en mode développement

Pour voir votre jeu en action dans le navigateur avec rechargement automatique :

```bash
npm start
```

Puis ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`).

### Lancer les tests

Pour exécuter les tests une seule fois :

```bash
npm test
```

Les résultats des tests s'affichent également dans l'interface web du jeu !

## Description du jeu

Vous devez implémenter les fonctions qui permettent à un personnage (🚶) de se déplacer dans un labyrinthe pour atteindre la sortie (🚪) en évitant les murs (🧱).

Le plateau de jeu est représenté par un **tableau 1D**, même si visuellement il ressemble à une grille 2D. Par exemple, un plateau 5×5 contient 25 cases dans un tableau `[0, 1, 2, ..., 24]`.

### Conversion coordonnées ↔ indices

Pour passer d'une position (x, y) à un indice dans le tableau :

- **Formule** : `indice = y * largeur + x`

Pour passer d'un indice à une position (x, y) :

- **Formule** : `x = indice % largeur` et `y = Math.floor(indice / largeur)`

## Fonctions à implémenter

Toutes les fonctions sont dans le fichier [src/index.ts](src/index.ts). Elles sont organisées par niveau de difficulté.

### Niveau 1 : Création et conversion (⭐ Simple)

1. **`creerPlateau`** : Créer un plateau de jeu avec un tableau 1D
2. **`positionVersIndice`** : Convertir une position (x, y) en indice
3. **`indiceVersPosition`** : Convertir un indice en position (x, y)

### Niveau 2 : Logique de déplacement (⭐⭐ Moyen)

4. **`estValide`** : Vérifier si une position est valide (dans les limites et case libre)
5. **`deplacerPersonnage`** : Déplacer le personnage dans une direction

### Niveau 3 : Score (⭐ Simple)

6. **`calculerScore`** : Calculer le score basé sur le temps et les mouvements

### Bonus (⭐⭐⭐ Avancé, optionnel)

7. **`compterCasesAccessibles`** : Compter les cases accessibles avec un parcours en largeur (BFS)

## Ressources

### Documentation TypeScript

- [TypeScript Handbook - Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript - Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

### Documentation JavaScript

- [MDN - Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN - Math.floor](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
- [MDN - Opérateur modulo (%)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Remainder)

### Aide-mémoire : Tableaux 1D

| Opération            | Code                       | Exemple                       |
| -------------------- | -------------------------- | ----------------------------- |
| Créer tableau vide   | `new Array(taille)`        | `new Array(25)`               |
| Remplir tableau      | `.fill(valeur)`            | `new Array(25).fill("libre")` |
| Accéder à un élément | `tableau[indice]`          | `cases[12]`                   |
| Modifier un élément  | `tableau[indice] = valeur` | `cases[12] = "bloqué"`        |
| Taille du tableau    | `tableau.length`           | `cases.length`                |

## Structure du projet

```
jeux-tp1-labyrinthe/
├── src/
│   ├── index.ts              # Votre code ici (fonctions à implémenter)
│   ├── app.ts                # Le code de l'applicatoin à **NE PAS MODIFIER**
│   └── test/                 # Tests (NE PAS MODIFIER)
│       ├── plateau.test.ts
│       ├── conversion.test.ts
│       ├── deplacement.test.ts
│       ├── score.test.ts
│       └── bonus.test.ts
├── public/                   # Interface graphique (fournie)
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

## Conseils

1. **Commencez par les conversions** : Les fonctions `positionVersIndice` et `indiceVersPosition` sont fondamentales. Testez-les bien avant de passer aux autres.

2. **Utilisez les formules données** : Les formules de conversion sont dans les commentaires JSDoc des fonctions.

3. **Testez au fur et à mesure** : Lancez `npm run watch` et implémentez fonction par fonction.

4. **Visualisez dans le navigateur** : Utilisez `npm run dev` pour voir le jeu en action et déboguer visuellement.

5. **Vérifiez les limites** : Attention aux positions hors du plateau (x < 0, x >= largeur, y < 0, y >= hauteur).

6. **Consultez HINTS.md** : Si vous êtes bloqué, consultez le fichier [HINTS.md](HINTS.md) pour des indices progressifs.

## Aide

Si vous avez des questions pendant le TP, n'hésitez pas à demander de l'aide à l'enseignant.

Bon courage ! 🚀
