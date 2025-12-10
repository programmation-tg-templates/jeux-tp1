# Indices pour le Labyrinthe

Ce fichier contient des indices progressifs pour vous aider à résoudre les exercices. Cliquez sur les sections pour révéler les indices.

## Fonction 1 : creerPlateau

<details>
<summary>💡 Indice 1 (cliquez pour révéler)</summary>

Vous devez retourner un objet de type `PlateauDeJeu` avec 5 propriétés :
- `largeur` (le paramètre reçu)
- `hauteur` (le paramètre reçu)
- `cases` (un tableau 1D)
- `depart` (le paramètre reçu)
- `cible` (le paramètre reçu)

</details>

<details>
<summary>💡 Indice 2</summary>

Pour créer le tableau `cases`, calculez d'abord la taille totale : `largeur * hauteur`.

Ensuite, créez un tableau de cette taille rempli de `"libre"` :
```typescript
new Array(tailleTotale).fill("libre")
```

</details>

<details>
<summary>💡 Indice 3 (solution partielle)</summary>

```typescript
export function creerPlateau(
  largeur: number,
  hauteur: number,
  depart: Position,
  cible: Position
): PlateauDeJeu {
  const tailleTotale = largeur * hauteur;
  const cases = new Array(tailleTotale).fill("libre");

  return {
    largeur: largeur,
    hauteur: hauteur,
    cases: cases,
    depart: depart,
    cible: cible,
  };
}
```

</details>

---

## Fonction 2 : positionVersIndice

<details>
<summary>💡 Indice 1</summary>

La formule est donnée dans le commentaire JSDoc :
```
indice = y * largeur + x
```

Pourquoi cette formule ? Imaginez un tableau 1D qui représente une grille :
- Ligne 0 : indices 0 à (largeur-1)
- Ligne 1 : indices largeur à (2*largeur-1)
- Ligne y : commence à l'indice `y * largeur`
- Puis on ajoute `x` pour se déplacer dans la ligne

</details>

<details>
<summary>💡 Indice 2 (exemple concret)</summary>

Pour une position `(x=2, y=3)` sur un plateau de largeur 5 :
```
indice = 3 * 5 + 2 = 15 + 2 = 17
```

Vérification visuelle (plateau 5×5) :
```
 0  1  2  3  4     (y=0)
 5  6  7  8  9     (y=1)
10 11 12 13 14     (y=2)
15 16 [17] 18 19   (y=3, x=2)
20 21 22 23 24     (y=4)
```

</details>

<details>
<summary>💡 Indice 3 (solution)</summary>

```typescript
export function positionVersIndice(position: Position, largeur: number): number {
  return position.y * largeur + position.x;
}
```

</details>

---

## Fonction 3 : indiceVersPosition

<details>
<summary>💡 Indice 1</summary>

C'est l'opération inverse de `positionVersIndice`. Les formules sont :
- `x = indice % largeur` (modulo)
- `y = Math.floor(indice / largeur)` (division entière)

</details>

<details>
<summary>💡 Indice 2 (explication)</summary>

**Pourquoi le modulo pour x ?**
- Le modulo `%` donne le reste de la division
- `17 % 5 = 2` → position x dans la ligne

**Pourquoi Math.floor pour y ?**
- `Math.floor(indice / largeur)` donne le numéro de ligne
- `Math.floor(17 / 5) = Math.floor(3.4) = 3` → ligne y

</details>

<details>
<summary>💡 Indice 3 (solution)</summary>

```typescript
export function indiceVersPosition(indice: number, largeur: number): Position {
  const x = indice % largeur;
  const y = Math.floor(indice / largeur);

  return { x, y };
}
```

Note : `{ x, y }` est équivalent à `{ x: x, y: y }` en JavaScript moderne.

</details>

---

## Fonction 4 : estValide

<details>
<summary>💡 Indice 1</summary>

Une position est valide si :
1. Elle est dans les limites du plateau (x et y >= 0 et < largeur/hauteur)
2. La case à cette position est "libre" (pas "bloqué")

Vous devez vérifier ces deux conditions.

</details>

<details>
<summary>💡 Indice 2</summary>

Pour vérifier les limites :
```typescript
if (position.x < 0 || position.x >= plateau.largeur) {
  return false;
}
if (position.y < 0 || position.y >= plateau.hauteur) {
  return false;
}
```

Pour vérifier l'état de la case, utilisez `positionVersIndice` pour obtenir l'indice, puis vérifiez `plateau.cases[indice]`.

</details>

<details>
<summary>💡 Indice 3 (solution)</summary>

```typescript
export function estValide(position: Position, plateau: PlateauDeJeu): boolean {
  // Vérifier les limites
  if (position.x < 0 || position.x >= plateau.largeur) {
    return false;
  }
  if (position.y < 0 || position.y >= plateau.hauteur) {
    return false;
  }

  // Vérifier que la case est libre
  const indice = positionVersIndice(position, plateau.largeur);
  return plateau.cases[indice] === "libre";
}
```

</details>

---

## Fonction 5 : deplacerPersonnage

<details>
<summary>💡 Indice 1</summary>

Algorithme :
1. Calculer la nouvelle position selon la direction
2. Vérifier si la nouvelle position est valide avec `estValide`
3. Si valide, retourner la nouvelle position
4. Si invalide, retourner `null`

</details>

<details>
<summary>💡 Indice 2</summary>

Pour calculer la nouvelle position selon la direction :
```typescript
let nouvellePosition: Position;

if (direction === "haut") {
  nouvellePosition = { x: positionActuelle.x, y: positionActuelle.y - 1 };
} else if (direction === "bas") {
  nouvellePosition = { x: positionActuelle.x, y: positionActuelle.y + 1 };
} else if (direction === "gauche") {
  nouvellePosition = { x: positionActuelle.x - 1, y: positionActuelle.y };
} else { // "droite"
  nouvellePosition = { x: positionActuelle.x + 1, y: positionActuelle.y };
}
```

</details>

<details>
<summary>💡 Indice 3 (solution complète)</summary>

```typescript
export function deplacerPersonnage(
  positionActuelle: Position,
  direction: Direction,
  plateau: PlateauDeJeu
): Position | null {
  let nouvellePosition: Position;

  // Calculer la nouvelle position selon la direction
  switch (direction) {
    case "haut":
      nouvellePosition = { x: positionActuelle.x, y: positionActuelle.y - 1 };
      break;
    case "bas":
      nouvellePosition = { x: positionActuelle.x, y: positionActuelle.y + 1 };
      break;
    case "gauche":
      nouvellePosition = { x: positionActuelle.x - 1, y: positionActuelle.y };
      break;
    case "droite":
      nouvellePosition = { x: positionActuelle.x + 1, y: positionActuelle.y };
      break;
  }

  // Vérifier si la nouvelle position est valide
  if (estValide(nouvellePosition, plateau)) {
    return nouvellePosition;
  } else {
    return null;
  }
}
```

</details>

---

## Fonction 6 : calculerScore

<details>
<summary>💡 Indice 1</summary>

C'est la fonction la plus simple ! Le score est simplement la somme du nombre de mouvements et du temps en secondes.

</details>

<details>
<summary>💡 Indice 2 (solution)</summary>

```typescript
export function calculerScore(nombreMouvements: number, tempsSecondes: number): number {
  return nombreMouvements + tempsSecondes;
}
```

</details>

---

## Fonction 7 (BONUS) : compterCasesAccessibles

<details>
<summary>💡 Indice 1</summary>

Cette fonction nécessite un algorithme de **parcours en largeur (BFS)**.

Principe :
1. Créer une file (queue) avec la position de départ
2. Créer un ensemble de positions visitées
3. Tant que la file n'est pas vide :
   - Retirer une position de la file
   - Si déjà visitée, passer à la suivante
   - Marquer comme visitée
   - Ajouter toutes les positions voisines valides à la file
4. Retourner le nombre de positions visitées

</details>

<details>
<summary>💡 Indice 2 (structure de données)</summary>

En JavaScript/TypeScript :
- **File** : utilisez un tableau avec `push()` (ajouter à la fin) et `shift()` (retirer du début)
- **Ensemble de visitées** : utilisez un `Set<string>` avec des clés comme `"x,y"`

Exemple :
```typescript
const file: Position[] = [depart];
const visitees = new Set<string>();
```

</details>

<details>
<summary>💡 Indice 3 (solution partielle)</summary>

```typescript
export function compterCasesAccessibles(depart: Position, plateau: PlateauDeJeu): number {
  const file: Position[] = [depart];
  const visitees = new Set<string>();

  while (file.length > 0) {
    const position = file.shift()!; // Retirer le premier élément
    const cle = `${position.x},${position.y}`;

    if (visitees.has(cle)) {
      continue; // Déjà visitée
    }

    visitees.add(cle);

    // Explorer les 4 directions
    const directions: Direction[] = ["haut", "bas", "gauche", "droite"];
    for (const direction of directions) {
      const voisine = deplacerPersonnage(position, direction, plateau);
      if (voisine !== null) {
        file.push(voisine);
      }
    }
  }

  return visitees.size;
}
```

</details>

---

## Astuces générales

- **Utilisez console.log()** : N'hésitez pas à afficher les valeurs intermédiaires pour déboguer
- **Testez les cas limites** : Positions (0,0), coins, bords du plateau
- **Lisez les messages d'erreur** : TypeScript vous aide en signalant les erreurs de types
- **Vérifiez dans le navigateur** : L'interface graphique vous montre visuellement les erreurs

Bon courage ! 🚀
