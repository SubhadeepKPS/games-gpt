import { TbFilterCog } from "react-icons/tb";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import FilterAccordion from "./FilterAccordion";
import SortAccordion from "./SortAccordion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { loadFilteredGameSlice } from "../utils/store/filteredGameCardSlice";
import { Link } from "react-router-dom";
import { addGameInfo } from "../utils/store/gameDataSlice";
import { toggleSortAllGames } from "../utils/store/sortSlice";
import { langConst } from "../utils/langConstants";
import { FiPlay } from "react-icons/fi";

const SortPanel = (gameInfo) => {
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [sortParamFromSortAccordion, setSortParamFromSortAccordion] =
    useState(null);
  const gameList = gameInfo.gameInfo;
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.language);

  const handleSortParam = (sortParam) => {
    if (sortParamFromSortAccordion === sortParam.toLowerCase()) {
      setSortParamFromSortAccordion(null);
      return;
    }
    setSortParamFromSortAccordion(sortParam.toLowerCase());
    console.log(sortParamFromSortAccordion);
  };
  const accordionInformation = useSelector((store) => store.accordion);
  const filterParam = useSelector((store) => store.filterParam);
  const gameData = useSelector((store) => store.games);
  // const sortSlice = useSelector((store) => store.sortData);
  const allGames = useRef(null);
  // console.log("sortSlice: ", sortSlice);
  // console.log("gameData: ", gameData);

  // console.log("ALLGAMES: ", allGames.current);

  // const gameData = useSelector((store) => store.)
  // console.log("FilterParams: ", filterParam);
  // console.log(accordionInformation);

  const handleFilterButton = () => {
    const filterResult = gameList.filter(
      (game) =>
        filterParam.includes(game.genre.toLowerCase()) ||
        filterParam.includes(game.platform.toLowerCase()) ||
        filterParam.includes(game.publisher.toLowerCase())
    );
    // console.log("FilterResult: ", filterResult);
    dispatch(loadFilteredGameSlice(filterResult));
  };

  const handleOpenAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  const handleSortButton = () => {
    const sortedGames = [...gameData].sort((a, b) => {
      return a[sortParamFromSortAccordion] < b[sortParamFromSortAccordion]
        ? -1
        : 1;
    });
    dispatch(addGameInfo(sortedGames));
    dispatch(toggleSortAllGames());
  };

  useEffect(() => {
    if (gameData && gameData.length > 0 && !allGames.current) {
      allGames.current = [...gameData]; // Copy to avoid mutating state
    }
  }, [gameData]);

  // games.sort((a, b) => {
  //   if (a.name < b.name) return -1; // Sorts a before b
  //   if (a.name > b.name) return 1; // Sorts b before a
  //   return 0; // Keeps the order if they're equal
  // });

  return (
    <div className="flex flex-row mr-4 lg:flex lg:flex-col justify-start mt-4 pb-20 bg-slate-900 rounded-2xl text-gray-400 border-2 border-gray-400 lg:h-full">
      <div>
        <div className="flex justify-between w-full px-5 py-1 border-b-2 border-gray-400">
          <div className="flex">
            <h4 className="font-bold pt-1">{langConst[language].filter}</h4>
            <h4 className="text-xl mx-4 mt-1.5">
              <TbFilterCog />
            </h4>
          </div>
          <button onClick={handleFilterButton} className="py-1 text-xl pr-2">
            <div className="text-red-500 text-base hover:text-amber-400 bg-slate-600 rounded-md p-1 hover:scale-110">
              <FiPlay />
            </div>
          </button>
        </div>
        <div>
          <FilterAccordion accordionInfo={accordionInformation} />
        </div>
      </div>
      <div className="border-2 border-slate-400 rounded-xl mx-1 mt-14 py-2">
        <div className="flex justify-between py-1">
          <div className="flex">
            <h4 className="font-bold mx-5">{langConst[language].sort}</h4>
            <h4 className="mt-1">
              <RiSortAlphabetAsc />
            </h4>
          </div>
          <div className="flex px-6">
            <button
              className="bg-slate-600 rounded-md mx-3 text-red-500 hover:text-amber-400 hover:scale-110"
              onClick={handleOpenAccordion}
            >
              {accordionOpen ? (
                <FaAngleUp className="mx-1.5 text-sm" />
              ) : (
                <FaAngleDown className="mx-1.5 text-sm" />
              )}
            </button>

            <button
              onClick={handleSortButton}
              className="bg-slate-600 rounded-md hover:scale-110"
            >
              <FiPlay className="p-1 text-red-500 text-2xl hover:text-amber-400" />
            </button>
          </div>
        </div>
        {accordionOpen && (
          <div>
            <SortAccordion
              sortParam={sortParamFromSortAccordion}
              getSortParam={handleSortParam}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default SortPanel;
