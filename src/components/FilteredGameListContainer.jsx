import { useDispatch, useSelector } from "react-redux";
import FilteredGameCard from "./FilteredGameCard";
import { langConst } from "../utils/langConstants";
import { loadShowGame } from "../utils/store/gameCartSlice";

const FilteredGameListContainer = () => {
  const dispatch = useDispatch();
  const filteredGames = useSelector((store) => store.filteredGameCard);
  // console.log("FilteredGamesFinal: ", filteredGames);
  const language = useSelector((store) => store.config.language);

  const handleFilteredCardButtonClick = (game) => {
    dispatch(loadShowGame(game));
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
        <div className="flex flex-wrap h-screen pb-28 justify-evenly overflow-y-scroll">
          {filteredGames && filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <button
                key={game?.id}
                onClick={() => handleFilteredCardButtonClick(game)}
              >
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
