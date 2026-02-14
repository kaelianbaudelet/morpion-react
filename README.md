# Morpion - React JS

Projet réalisé dans le cadre de l'atelier découverte React JS (EPSI Arras).

## Objectif

Développer un jeu de Morpion interactif en React où chaque joueur dispose d'un temps limité pour jouer, avec une interface fluide et intuitive.

## Fonctionnalités

### Interface Utilisateur
- **Plateau de jeu** : Grille 3x3 interactive et réactive.
- **Scores** : Affichage en temps réel des scores des deux joueurs.
- **Feedback Visuel** :
  - Animation lors des victoires.
  - Indicateur de tour dynamique (couleur et opacité).
  - Barre de progression pour le chronomètre (change de couleur : Vert -> Orange -> Rouge).

### Règles du Jeu
- **Tour par tour** : Deux joueurs s'affrontent (X vs O).
- **Mode Chronomètre** : Chaque joueur dispose de **5 secondes** pour jouer son coup. Si le temps est écoulé, le tour passe automatiquement à l'adversaire.
- **Conditions de Victoire** : Alignement de 3 symboles (verticalement, horizontalement ou en diagonale).
- **Points** : Le gagnant remporte 1 point.
- **Match Nul** : Détection automatique des égalités si la grille est pleine.
- **Revanche** : Bouton pour relancer une manche en conservant les scores actuels.
- **Réinitialisation** : Possibilité de remettre à zéro toute la partie (scores et pseudos).

### Configuration
Un écran d'accueil et de paramétrage permet de :
- Saisir les **pseudos** des joueurs.
- Activer ou désactiver le **mode Chronomètre** (pression).

## Stack Technique

- **Framework** : [React](https://react.dev/)
- **Build Tool** : [Vite](https://vitejs.dev/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Qualité de Code** : [Biome](https://biomejs.dev/) (Linter & Formatter)

## Installation et Lancement

1. **Installation des dépendances**
   ```bash
   pnpm install
   ```

2. **Lancement en développement**
   ```bash
   pnpm run dev
   ```

## Auteur

**Kaelian BAUDELET**
