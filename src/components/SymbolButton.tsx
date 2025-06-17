import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandRock, faHandPaper, faHandScissors } from '@fortawesome/free-solid-svg-icons';

type Choice = 'rock' | 'paper' | 'scissors';

interface Props {
  choice: Choice;
  onClick: (choice: Choice) => void;
}

const iconMap = {
  rock: faHandRock,
  paper: faHandPaper,
  scissors: faHandScissors
};

const ChoiceButton = ({ choice, onClick }: Props) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      onClick={() => onClick(choice)}
    >
      <FontAwesomeIcon icon={iconMap[choice]} size="2x" />
    </button>
  );
};

export default ChoiceButton;
