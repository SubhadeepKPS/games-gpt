import { useDispatch, useSelector } from "react-redux";
import FilteredGameListContainer from "./FilteredGameListContainer";
import GameCard from "./GameCard";
import { loadShowGame } from "../utils/store/gameCartSlice";
import OpenGame from "./OpenGame";
import { langConst } from "../utils/langConstants";

const GameListContainer = ({ games }) => {
  const dispatch = useDispatch();
  const gameData = games;
  const showGame = useSelector((store) => store.gameCart.openGame);
  const language = useSelector((store) => store.config.language);
  console.log("showGame :", showGame);

  const handleCardButtonClick = (game) => {
    dispatch(loadShowGame(game));
  };

  // console.log(gameData);
  return (
    <div className="flex h-screen w-full pb-28 border-2 border-slate-400 ">
      {showGame && <OpenGame />}

      <div>
        <div className="bg-slate-900 text-xl text-red-500 font-bold py-2 border-2 border-slate-400 px-8">
          <h4>{langConst[language].explore}</h4>
        </div>
        <div className="h-screen flex justify-center items-center flex-wrap bg-slate-800 overflow-y-scroll">
          {gameData &&
            gameData.length > 0 &&
            gameData.map(
              (game) => (
                <button
                  key={game?.id}
                  onClick={() => handleCardButtonClick(game)}
                >
                  <GameCard info={game} />
                </button>
              )
              // console.log("lol: ", game)
            )}
        </div>
      </div>
      <div className="border-1 border-gray-400 ">
        <FilteredGameListContainer />
      </div>
    </div>
  );
};

export default GameListContainer;
