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
    <div className="flex h-screen w-full pb-60 rounded-2xl">
      {showGame && <OpenGame />}

      <div>
        <div className="bg-black rounded-2xl mx-4 mt-4 text-xl text-red-500 font-bold py-2 px-8">
          <h4>{langConst[language].explore}</h4>
        </div>
        <div className="h-screen flex justify-center items-center flex-wrap rounded-2xl pt-6 mt-3 pb-52 mx-4 bg-slate-900 overflow-y-scroll">
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
