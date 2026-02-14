import { useEffect, useState } from "react";

/**
 * Juste une case de la grille.
 * C'est le parent qui décide ce qu'on affiche ici.
 */
function Square({ value, onSquareClick, isWinningSquare }) {
  // On change la couleur selon si t'es X ou O.
  // Par défaut, c'est gris (slate).
  let textColor = "text-slate-700";

  // Si c'est un X -> Bleu ciel.
  if (value === "X") textColor = "text-sky-500";
  // Si c'est un O -> Rose.
  if (value === "O") textColor = "text-rose-600";

  return (
    <button
      type="button"
      className="relative h-24 w-24 p-0 overflow-hidden border border-slate-100"
      onClick={onSquareClick} // On dit au parent qu'on a cliqué
    >
      {/* 
        Le fond de la case :
        - Si c'est gagné : Fond vert qui clignote.
        - Sinon : Fond blanc classique qui réagit un peu quand on passe la souris dessus.
      */}
      <div
        className={`absolute inset-0 transition-colors ${isWinningSquare ? "bg-green-100 animate-flash-slow" : "bg-white hover:bg-slate-50"}`}
      />

      {/* 
        Le symbole (X ou O) :
      */}
      <div
        className={`relative z-10 w-full h-full flex items-center justify-center text-5xl font-bold ${textColor}`}
      >
        {value}
      </div>
    </button>
  );
}

/**
 * L'écran d'accueil du jeu.
 */
function TitleScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800 font-sans p-4">
      <div className="text-center space-y-16 max-w-lg">
        {/* Titre */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
            Morpion
          </h1>
          <p className="text-lg text-slate-600">Un simple jeu de Morpion.</p>
        </div>

        {/* Le bouton pour lancer la page de configuration de partie */}
        <div>
          <button
            type="button"
            onClick={onStart}
            className="font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 px-10 py-3 text-lg"
          >
            Commencer une partie
          </button>
        </div>
        <div className="text-xs text-slate-400 font-medium tracking-wide uppercase">
          Kaelian BAUDELET
        </div>
      </div>
    </div>
  );
}

/**
 * L'écran pour configurer la partie.
 * Ici on choisit ses pseudos et si on veut le chrono.
 */
function SetupScreen({
  playerXName,
  setPlayerXName,
  playerOName,
  setPlayerOName,
  isTimerEnabled,
  setIsTimerEnabled,
  onStartGame,
  onBack,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-sans p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-white border border-slate-100 overflow-hidden">
        {/* Titre de la config */}
        <div className="px-8 py-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 text-center">
            Configuration de partie
          </h2>
        </div>

        <div className="p-8 space-y-2">
          {/* On rentre les noms des joueurs */}
          <div className="space-y-4">
            {/* Nom du Joueur X */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="playerX"
                className="text-sm font-medium text-slate-700"
              >
                Joueur X
              </label>
              <input
                id="playerX"
                type="text"
                value={playerXName}
                onChange={(e) => setPlayerXName(e.target.value)} // Mise à jour en live
                className="px-3 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-800 placeholder-slate-400"
                placeholder="Pseudo..."
              />
            </div>
            {/* Nom du Joueur O */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="playerO"
                className="text-sm font-medium text-slate-700"
              >
                Joueur O
              </label>
              <input
                id="playerO"
                type="text"
                value={playerOName}
                onChange={(e) => setPlayerOName(e.target.value)} // Mise à jour en live
                className="px-3 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-800 placeholder-slate-400"
                placeholder="Pseudo..."
              />
            </div>
          </div>

          {/* Le bouton pour activer le mode chrono */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="timerToggle"
              checked={isTimerEnabled}
              onChange={(e) => setIsTimerEnabled(e.target.checked)} // On active ou pas ?
              className="w-4 h-4 text-sky-500 border-slate-300 focus:ring-sky-500"
            />
            <label
              htmlFor="timerToggle"
              className="text-sm font-medium text-slate-700 cursor-pointer select-none"
            >
              Activer le chronomètre
            </label>
          </div>

          {/* Les boutons pour lancer ou annuler */}
          <div className="pt-4 space-y-3">
            <button
              type="button"
              onClick={onStartGame}
              className="px-6 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 w-full justify-center"
            >
              Lancer le jeu
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed text-slate-500 hover:text-slate-800 hover:bg-slate-100 w-full justify-center text-sm"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Ecran de jeu
 * C'est là que tout se passe : les scores, le chrono, et bien sûr la grille.
 */
function GameScreen({
  playerXName,
  playerOName,
  scoreX,
  scoreO,
  squares,
  onSquareClick,
  winner,
  isDraw,
  isXNext,
  timeLeft,
  gameActive,
  isTimerEnabled,
  winningLine,
  onRestartRound,
  onBackToSetup,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-sans p-4 animate-in fade-in duration-500">
      {/* 1. LE TABLEAU DES SCORES */}
      <div className="w-full max-w-md mb-8 flex items-center justify-between bg-white px-6 py-4 border border-slate-200">
        {/* Côté Joueur X */}
        <div
          className={`mx-auto flex flex-col items-center ${isXNext && !winner && "opacity-100"} ${(!isXNext || winner) && "opacity-10 transition-opacity"}`}
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Joueur X
          </span>
          <span className="font-bold text-sky-500 text-2xl">{playerXName}</span>
          <span className="text-2xl font-mono font-bold text-slate-800">
            {scoreX}
          </span>
        </div>

        {/* La petite ligne au milieu */}
        <div className="h-10 w-px bg-slate-200 mx-4"></div>

        {/* Côté Joueur O */}
        <div
          className={`mx-auto flex flex-col items-center ${!isXNext && !winner && "opacity-100"} ${(isXNext || winner) && "opacity-10 transition-opacity"}`}
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Joueur O
          </span>
          <span className="font-bold text-rose-600 text-2xl">
            {playerOName}
          </span>
          <span className="text-2xl font-mono font-bold text-slate-800">
            {scoreO}
          </span>
        </div>
      </div>

      {/* 2. LE STATUS DU JEU (C'est à qui ?) */}
      <div className="h-8 mb-6 text-center">
        {winner ? (
          // On a un gagnant !
          <div className="text-amber-500 font-bold text-xl animate-bounce">
            {winner === "X" ? playerXName : playerOName} a gagné !
          </div>
        ) : isDraw ? (
          // Personne n'a gagné...
          <div className="text-slate-600 font-bold text-xl">Match nul !</div>
        ) : (
          // La partie continue, on dit à qui c'est de jouer.
          <div className="flex items-center gap-2 text-slate-600 text-lg">
            <span>C&apos;est à </span>
            <span
              className={`font-bold ${isXNext ? "text-sky-500" : "text-rose-600"}`}
            >
              {isXNext ? playerXName : playerOName}
            </span>
            <span> de jouer</span>
          </div>
        )}
      </div>

      {/* 3. LE CHRONO */}
      {/* On l'affiche seulement si la partie est en cours et que l'option est activée */}
      {gameActive && !winner && isTimerEnabled && (
        <div className="mb-4">
          <div className="relative w-64 h-2 bg-slate-200 overflow-hidden">
            {/* La barre qui diminue */}
            <div
              className={`absolute top-0 left-0 h-full transition-all ease-linear ${timeLeft === 5 ? "duration-0" : "duration-1000"} ${timeLeft > 3 ? "bg-emerald-500" : timeLeft === 3 ? "bg-orange-500" : "bg-red-600 animate-flash"}`}
              style={{ width: `${(timeLeft / 5) * 100}%` }}
            ></div>
          </div>
          {/* Le temps en chiffres pour être précis */}
          <p className="text-center text-xs text-slate-400 mt-1 font-mono">
            {timeLeft}s
          </p>
        </div>
      )}

      {/* 4. LA GRILLE (Là où on clique) */}
      <div className="bg-white p-2 border border-slate-200">
        <div className="grid grid-cols-3 gap-2">
          {/* On crée les 9 cases */}
          {squares.map((val, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: On ignore, les indexs sont stables
              key={i}
              className={`
                ${(i + 1) % 3 === 0 ? "" : "h-24 w-24 p-0 "} 
                ${i >= 6 ? "" : "h-24 w-24 p-0 "}
             `}
            >
              <Square
                value={val}
                onSquareClick={() => onSquareClick(i)}
                isWinningSquare={winningLine?.includes(i)} // Si c'est gagnant, on le dit à la case
              />
            </div>
          ))}
        </div>
      </div>

      {/* 5. LES BOUTONS DE FIN */}
      <div className="mt-10 flex gap-3">
        {/* Recommencer ou manche suivante */}
        {!gameActive || winner || isDraw ? (
          <button
            type="button"
            onClick={onRestartRound}
            className="px-6 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500"
          >
            {winner || isDraw ? "Nouvelle manche" : "Reprendre"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onRestartRound}
            className="px-6 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400"
          >
            Recommencer
          </button>
        )}

        {/* Retour au menu principal */}
        <button
          type="button"
          onClick={onBackToSetup}
          className="px-6 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
          Menu
        </button>
      </div>
    </div>
  );
}

/**
 * Partie Principal
 * C'est ici qu'on gère tout : qui joue, qui gagne, le temps, etc.
 */
export default function App() {
  // Tout ce qu'on doit retenir (États)

  // On est où ? ('title', 'setup', ou 'game')
  const [appState, setAppState] = useState("title");

  // Les infos des joueurs
  const [playerXName, setPlayerXName] = useState("Joueur 1"); // Blaise
  const [playerOName, setPlayerOName] = useState("Joueur 2"); // Kevin
  const [isTimerEnabled, setIsTimerEnabled] = useState(true); // Avec ou sans pression ?

  // Le jeu en lui-même state
  const [squares, setSquares] = useState(Array(9).fill(null)); // La grille vide au début
  const [isXNext, setIsXNext] = useState(true); // C'est à X de commencer
  const [scoreX, setScoreX] = useState(0); // Score de X
  const [scoreO, setScoreO] = useState(0); // Score de O
  const [timeLeft, setTimeLeft] = useState(5); // 5 secondes pour jouer, vite !
  const [gameActive, setGameActive] = useState(false); // Est-ce qu'on joue ou on dort ?

  // Le gagnant

  let winner = null; // Pour l'instant personne
  let winningLine = null; // La ligne qui fait gagner

  // Toutes les façons de gagner
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Lignes
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Colonnes
    [0, 4, 8],
    [2, 4, 6], // Diagonales
  ];

  // On vérifie si quelqu'un a aligné 3 symboles
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
      winningLine = lines[i];
      break; // On a un gagnant, on arrête tout !
    }
  }

  // Si personne n'a gagné et que tout est rempli, c'est match nul
  const isDraw = !winner && squares.every((square) => square !== null);

  // Effets

  // Effet 1 : chrono
  useEffect(() => {
    // Si on joue pas, on fait rien
    if (
      appState !== "game" ||
      !isTimerEnabled ||
      !gameActive ||
      winner ||
      isDraw
    )
      return;

    // On enlève 1 seconde toutes les 1000ms
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    // On nettoie quand on a fini
    return () => clearInterval(timer);
  }, [appState, isTimerEnabled, gameActive, winner, isDraw]);

  // Effet 2 : Passation de tour si trop lent !
  useEffect(() => {
    if (timeLeft === 0 && gameActive && !winner && !isDraw) {
      // On laisse le 0s affiché 1 seconde, puis on change
      const timeoutId = setTimeout(() => {
        setIsXNext((x) => !x); // Changement de joueur
        setTimeLeft(5); // Et c'est reparti pour 5s
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [timeLeft, gameActive, winner, isDraw]);

  // Effet 3 : On compte les points quand quelqu'un gagne
  useEffect(() => {
    if (winner === "X") {
      setScoreX((s) => s + 1); // +1 pour X
      setGameActive(false); // C'est fini
    } else if (winner === "O") {
      setScoreO((s) => s + 1); // +1 pour O
      setGameActive(false); // C'est fini
    }
  }, [winner]); // On regarde si 'winner' change

  // Les actions (ce qui se passe quand on clique)

  /**
   * Quand on clique sur une case.
   */
  function handleSquareClick(index) {
    // Si c'est déjà pris, ou fini, ou trop tard : on ne fait rien
    if (squares[index] || winner || !gameActive || timeLeft === 0) return;

    // On copie le tableau pour pas tout casser
    const newSquares = [...squares];
    // On met le symbole du joueur
    newSquares[index] = isXNext ? "X" : "O";

    // On met à jour tout le monde
    setSquares(newSquares);
    setIsXNext(!isXNext); // À l'autre
    setTimeLeft(5); // Reset du chrono
  }

  /**
   * On recommence une manche (on garde les scores).
   */
  function startNewRound() {
    setSquares(Array(9).fill(null)); // On efface tout, en remplacent tout le tableau par des valuers nulls
    setGameActive(true); // C'est parti
    setIsXNext(true); // X commence
    setTimeLeft(5); // On remet le temps
  }

  /**
   * On efface tout, même les scores.
   */
  function resetScores() {
    setScoreX(0); // Zéro
    setScoreO(0); // Zéro
    startNewRound(); // Et on recommence
  }

  // L'affichage final

  return (
    <>
      {/* On montre le bon écran au bon moment */}

      {/* TITRE */}
      {appState === "title" && (
        <TitleScreen onStart={() => setAppState("setup")} />
      )}

      {/* CONFIG */}
      {appState === "setup" && (
        <SetupScreen
          playerXName={playerXName}
          setPlayerXName={setPlayerXName}
          playerOName={playerOName}
          setPlayerOName={setPlayerOName}
          isTimerEnabled={isTimerEnabled}
          setIsTimerEnabled={setIsTimerEnabled}
          onStartGame={() => {
            setAppState("game"); // Lancement du jeux
            startNewRound(); // On prépare le round
          }}
          onBack={() => setAppState("title")} // Pour revenir au menu de configuration
        />
      )}

      {/* JEU */}
      {appState === "game" && (
        <GameScreen
          playerXName={playerXName}
          playerOName={playerOName}
          scoreX={scoreX}
          scoreO={scoreO}
          squares={squares}
          onSquareClick={handleSquareClick}
          winner={winner}
          isDraw={isDraw}
          winningLine={winningLine}
          isXNext={isXNext}
          timeLeft={timeLeft}
          gameActive={gameActive}
          isTimerEnabled={isTimerEnabled}
          onRestartRound={startNewRound}
          onBackToSetup={() => {
            setAppState("setup");
            setGameActive(false);
            resetScores(); // Si on part, on perd ses points !
          }}
        />
      )}
    </>
  );
}
