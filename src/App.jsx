import { useState, useEffect } from 'react';

// eN vrai j'aurais pu faire un compo mais flemme
// Le Sqare représente une seule case du jeu. Il reçoit deux "props" la valeur et l'etat partager au state
function Square({ value, onSquareClick }) {
  return (
    <button 
      className="h-20 w-20 bg-gray-100 border border-black text-4xl font-bold hover:bg-gray-200 transition-colors"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// COMPOSANT PRINCIPAL (App) 
export default function App() {

  // Le tableau de 9 cases. Au début, il est rempli de "null" (full vide dcp).
  const [squares, setSquares] = useState([null, null, null, null, null, null, null, null, null]);

  // Le tour du prochain
  const [isXNext, setIsXNext] = useState(true);

  // Les scores des joueurs
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  // Le temps restant
  const [timeLeft, setTimeLeft] = useState(5);

  // Etat de la partie
  const [gameActive, setGameActive] = useState(false);

  let winner = null; // gagnant

  // On regarde toutes les combinaisons gagnantes possibles manuellment à la main comme cà ca permet de dire rapidement qui a gagner
  const lignesGagnantes = [
    [0, 1, 2], // Ligne du haut
    [3, 4, 5], // Ligne du milieu
    [6, 7, 8], // Ligne du bas
    [0, 3, 6], // Colonne de gauche
    [1, 4, 7], // Colonne du milieu
    [2, 5, 8], // Colonne de droite
    [0, 4, 8], // Diagonale
    [2, 4, 6]  // Autre diagonale
  ];

  for (let i = 0; i < lignesGagnantes.length; i++) {
    const [a, b, c] = lignesGagnantes[i];
    // Si la case a... n'est pas vide, ..., ...
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a]; // Alors gagnant
    }
  }

  // On check si match nul (Pas de gagnant et toutes les cases sont pleines)
  const isDraw = !winner && squares.every((square) => square !== null);

  // (Update automatique) 
  // Gère le compte à rebours
  useEffect(() => {
    // Si le jeu n'est pas actif ou s'il y a un gagnant, on ne fait rien
    if (!gameActive || winner || isDraw) return;

    // On lance un intervalle qui s'exécute toutes les 1000ms (1 seconde logiquement)
    const timer = setInterval(() => {
      setTimeLeft((tempsActuel) => {
        if (tempsActuel <= 1) {
          // Si le temps arrive à 0, on change de joueur et on remet le temps à 5
          setIsXNext(!isXNext);
          return 5;
        }
        // Sinon, on enlève 1 seconde a chaque 1000ms du coup
        return tempsActuel - 1;
      });
    }, 1000);

    // Quand le composant change ou se détruit, on arrête le timer pour éviter les bugs.
    return () => clearInterval(timer);
  }, [gameActive, isXNext, winner, isDraw]); // Ce code se relance si ces variables changent

  // On met à jour les points quand quelqu'un gagne
  useEffect(() => {
    if (winner === 'X') {
      setScoreX(scoreX + 1);
      setGameActive(false); // On arrête la partie
    } else if (winner === 'O') {
      setScoreO(scoreO + 1);
      setGameActive(false); // On arrête la partie
    }
  }, [winner]); // on execute le useEffect UNIQUEMENT quand "winner" change

  // Quand on clique sur une case
  function handleClick(index) {
    // Si la case est déjà prise OU s'il y a un gagnant OU si le jeu est arreter
    if (squares[index] || winner || !gameActive) {
      return; // ...on ne fait rien concrtement :)
    }

    // On crée une copie du tableau des cases (règle importante de React)
    const newSquares = [...squares];

    // On écrit X ou O selon le tour
    if (isXNext) {
      newSquares[index] = 'X';
    } else {
      newSquares[index] = 'O';
    }

    // On met à jour l'état avec le nouveau tableau
    setSquares(newSquares);
    // On change de joueur
    setIsXNext(!isXNext);
    // On remet le timer à 5
    setTimeLeft(5);
  }

  // Pour lancer ou relancer le jeu
  function startNewGame() {
    setSquares([null, null, null, null, null, null, null, null, null]);
    setGameActive(true);
    setIsXNext(true);
    setTimeLeft(5);
    // On ne remet SURTout PAS le les scores à zéro ici pour les garder
  }

  function resetTousLesScores() {
     setScoreX(0);
     setScoreO(0);
     startNewGame();
  }
 
  return (
    <div className="flex flex-col items-center mt-10 gap-5 font-sans">
      <h1 className="text-4xl font-bold mb-4">Morpion Facile</h1>

      {/* infos */}
      <div className="flex gap-10 text-xl font-bold">
        <div className="text-blue-600">Joueur X : {scoreX}</div>
        <div className="text-red-600">Joueur O : {scoreO}</div>
      </div>

      <div className="text-lg">
        {winner ? (
            <span className="text-green-600 font-bold text-2xl">Le gagnant est : {winner} !</span>
        ) : isDraw ? (
            <span className="text-gray-600 font-bold">C'est match Nul !</span>
        ) : (
            <span>C'est le tour de : <span className="font-bold">{isXNext ? 'X' : 'O'}</span></span>
        )}
      </div>

      {gameActive && !winner && (
        <div className="text-red-500 font-bold">
           Temps restant : {timeLeft} secondes
        </div>
      )}

      {/* LA grille */}
      <div className="grid grid-cols-3 gap-2 bg-gray-800 p-2">
        {/* Ligne 1 */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        {/* Ligne 2 */}
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        {/* Ligne 3 */}
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <div className="flex gap-4 mt-5">
        {!gameActive || winner || isDraw ? (
          <button 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 font-bold shadow-lg transition"
            onClick={startNewGame}
          >
            {winner || isDraw ? 'Rejouer une partie' : 'Commencer le Jeu'}
          </button>
        ) : (
           <button 
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 font-bold shadow-lg transition"
            onClick={startNewGame}
          >
            Recommencer la manche
          </button>
        )}

        <button 
           className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 font-bold shadow-lg transition"
           onClick={resetTousLesScores}
        >
          Remise à zéro totale
        </button>
      </div>
    </div>
  );
}
