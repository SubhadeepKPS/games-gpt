import { useSelector } from "react-redux";
import FilteredGameCard from "./FilteredGameCard";
import { langConst } from "../utils/langConstants";

const FilteredGameListContainer = () => {
  const filteredGames = useSelector((store) => store.filteredGameCard);
  // console.log("FilteredGamesFinal: ", filteredGames);
  const language = useSelector((store) => store.config.language);

  return (
    filteredGames &&
    filteredGames.length > 0 && (
      <div className="w-96 bg-slate-800">
        <div className="bg-slate-900 border-2 border-slate-400">
          <h3 className="mx-9  my-2 font-bold text-xl text-red-500">
            {langConst[language].filteredGames}
          </h3>
        </div>
        <div className="flex flex-wrap h-screen pb-28 justify-evenly overflow-y-scroll">
          {filteredGames && filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <FilteredGameCard key={game?.id} info={game} />
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
