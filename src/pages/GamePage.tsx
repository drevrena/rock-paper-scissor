import { useState } from 'react';
import SymbolButton from '../components/SymbolButton';

type Choice = 'rock' | 'paper' | 'scissors';
type GameMode = 'player' | 'computer' | null;
type GameResult = 'draw' | 'playerOne' | 'playerTwo'
type Emoji = '🪨' | '📄' | '✂️';

//Simboli con cui è possibile goiocare
const choices: Choice[] = ['rock', 'paper', 'scissors'];

//Il simbolo scelto viene mappato al simbolo con la quale vince, utilizzo un array per estendere in futuro
//per la variaible di gioco spock e lizard.
const winnerMappings: Record<Choice, Choice[]> = {
  'rock': ['scissors'],
  'paper': ['rock'],
  'scissors': ['paper']
}

const emojiMappings: Record<Choice, Emoji> = {
  'rock': '🪨',
  'paper': '📄',
  'scissors': '✂️'
}

const getWinner = (p1: Choice, p2: Choice): GameResult => {
  if (p1 === p2) return 'draw';

  if(winnerMappings[p1].includes(p2)) {
    return 'playerOne'
  } else {
    return 'playerTwo'
  }

};


const Game = () => {
  const [mode, setMode] = useState<GameMode>(null);
  const [playerOneChoice, setPlayerOneChoice] = useState<Choice | null>(null);
  const [playerTwoChoice, setPlayerTwoChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);

  function handlePlayerChoice(choice: Choice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = getWinner(choice, computerChoice);
    setPlayerOneChoice(choice);
    setPlayerTwoChoice(computerChoice)
    setResult(winner);
  };

  function handleComputerVsComputer() {
    const computerChoiceOne = choices[Math.floor(Math.random() * choices.length)];
    const computerChoiceTwo = choices[Math.floor(Math.random() * choices.length)];
    const winner = getWinner(computerChoiceOne, computerChoiceTwo);
    setPlayerOneChoice(computerChoiceOne);
    setPlayerTwoChoice(computerChoiceTwo)
    setResult(winner);
  };

  function resetGame() {
    setPlayerOneChoice(null);
    setPlayerTwoChoice(null);
    setResult(null);
  };

  function resetMode() {
    resetGame();
    setMode(null)
  }

  function getWinnerText(result: GameResult) {

    if(mode === 'player') {

      if (result === 'draw')
       return 'Pareggio!'
      else if (result === 'playerOne')
       return 'Complimenti, Hai vinto!'
      else
       return 'Che sfortuna, Hai perso!'

    } else {
      if (result === 'draw')
       return 'Anche il computer pareggia a volte..'
      else
       return 'Che noia :/, vince sempre il computer'
    } 
  }

  return (
    <div className="text-center mt-10">
      {!mode && (
        <div>
          <button onClick={() => setMode('player')} className="bg-green-500 text-white px-4 py-2 rounded m-2">
            Player vs Computer
          </button>
          <button onClick={() => { setMode('computer'); handleComputerVsComputer(); }} className="bg-blue-500 text-white px-4 py-2 rounded m-2">
            Computer vs Computer
          </button>
        </div>
      )}

      {/*Modalità Player vs Computer */}
      {mode && !result && mode === 'player' && (
        <div>
          <p className="text-lg mb-4">Scegli la tua mossa:</p>
          {choices.map((choice, i) => (
            <SymbolButton key={i} choice={choice} onClick={handlePlayerChoice} />
          ))}
        </div>
      )}

      {result && (
        <div className="mt-6 border-double">
          <p className="text-xl font-semibold mb-2">
            {mode === 'player' ? 'Hai scelto' : 'Computer 1'}: {playerOneChoice && emojiMappings[playerOneChoice]}
          </p>
          <p className="text-xl font-semibold mb-2">
            {mode === 'player' ? 'Il computer ha scelto' : 'Computer 2'}: {playerTwoChoice && emojiMappings[playerTwoChoice]}
          </p>
          <p className="text-2xl font-bold mt-4">
            {getWinnerText(result)}
          </p>
          <div>
          <button onClick={() => { resetGame(); handleComputerVsComputer(); }} className="mt-4 mx-2 bg-gray-700 text-white px-4 py-2 rounded">
            Nuova partita
          </button>
          <button onClick={resetMode} className="mt-4 mx-2 bg-gray-700 text-white px-4 py-2 rounded">
            Cambia Modalità
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
