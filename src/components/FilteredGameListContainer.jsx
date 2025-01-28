import { useSelector } from "react-redux";
import FilteredGameCard from "./FilteredGameCard";
import { langConst } from "../utils/langConstants";

const FilteredGameListContainer = ({ sendGameToGameListContainer }) => {
  const filteredGames = useSelector((store) => store.filteredGameCard);
  const language = useSelector((store) => store.config.language);

  const handleOpenGameModal = (game) => {
    sendGameToGameListContainer(game);
  };

  return (
    filteredGames &&
    filteredGames.length > 0 && (
      <div className="w-96 rounded-2xl">
        <div className="bg-black rounded-2xl mr-4">
          <h3 className="mx-9 my-4 py-2 rounded-lg font-bold text-xl text-red-500">
            {langConst[language].filteredGames}
          </h3>
        </div>
        <div className="flex flex-1 flex-wrap h-full pt-7 pb-8 justify-evenly overflow-y-scroll">
          {filteredGames && filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <button key={game?.id} onClick={() => handleOpenGameModal(game)}>
                <FilteredGameCard info={game} />
              </button>
            ))
          ) : (
            <div>
              <div className="text-slate-400">
                <h5>The Filtered Games Cart is empty ...</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default FilteredGameListContainer;
