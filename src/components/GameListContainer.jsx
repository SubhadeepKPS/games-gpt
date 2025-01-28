import { useSelector } from "react-redux";
import FilteredGameListContainer from "./FilteredGameListContainer";
import GameCard from "./GameCard";
import OpenGame from "./OpenGame";
import { langConst } from "../utils/langConstants";
import { useState } from "react";

const GameListContainer = ({ games }) => {
  const [openGame, setOpenGame] = useState(null);
  const gameData = games;
  const language = useSelector((store) => store.config.language);
  console.log("showGame :", openGame);

  const handleOpenGameModal = (game) => {
    setOpenGame(game);
  };
  const handleCloseGameModal = () => {
    setOpenGame(null);
  };

  // console.log(gameData);
  return (
    <div className="flex h-screen w-full pb-52 rounded-2xl">
      {openGame && (
        <OpenGame game={openGame} closeGameModal={handleCloseGameModal} />
      )}

      <div>
        <div className="bg-black rounded-2xl mx-4 mt-4 text-xl text-red-500 font-bold py-2 px-8">
          <h4>{langConst[language].explore}</h4>
        </div>
        <div className="h-full flex justify-center items-center flex-wrap rounded-2xl pt-6 mt-3 mx-4 bg-slate-900 overflow-y-scroll">
          {gameData &&
            gameData.length > 0 &&
            gameData.map(
              (game) => (
                <button
                  key={game?.id}
                  onClick={() => handleOpenGameModal(game)}
                >
                  <GameCard info={game} />
                </button>
              )
              // console.log("lol: ", game)
            )}
        </div>
      </div>
      <div className="h-full flex justify-center rounded-2xl">
        <FilteredGameListContainer
          sendGameToGameListContainer={handleOpenGameModal}
        />
      </div>
    </div>
  );
};

export default GameListContainer;
