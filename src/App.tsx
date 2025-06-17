import Game from './pages/GamePage';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Carta, Forbice, Sasso</h1>
      <Game />
    </div>
  );
};

export default App;
