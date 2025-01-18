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

const SortPanel = (gameInfo) => {
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [sortParamFromSortAccordion, setSortParamFromSortAccordion] =
    useState(null);
  const gameList = gameInfo.gameInfo;
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.language);

  const handleSortParam = (sortParam) => {
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
    // if (sortSlice.sortAllGames === false) {
    //   const sortedGames = [...gameData].sort((a, b) => {
    //     return a[sortParamFromSortAccordion] < b[sortParamFromSortAccordion]
    //       ? -1
    //       : 1;
    //   });
    //   dispatch(addGameInfo(sortedGames));
    //   dispatch(toggleSortAllGames());
    // } else {
    //   dispatch(addGameInfo(allGames.current));
    //   dispatch(toggleSortAllGames());
    // }
  };

  useEffect(() => {
    // if (sortSlice.sortAllGames === false) {
    //   const sortedGames = [...gameData].sort((a, b) => {
    //     return a[sortParamFromSortAccordion] < b[sortParamFromSortAccordion]
    //       ? -1
    //       : 1;
    //   });
    //   dispatch(addGameInfo(sortedGames));
    //   dispatch(toggleSortAllGames());
    // } else {
    //   dispatch(addGameInfo(allGames.current));
    //   dispatch(toggleSortAllGames());
    // }
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
    <div className="flex flex-row lg:flex lg:flex-col justify-between bg-slate-900 text-gray-400 border-2 border-gray-300 lg:h-screen">
      <div>
        <div className="flex justify-between w-full px-5 py-1 border-b-2 border-gray-400">
          <div className="">
            <h4 className="text-sm font-bold pt-1">
              {langConst[language].filter}
            </h4>
          </div>
          <button
            onClick={handleFilterButton}
            className="py-1 font-bold text-xl pr-2"
          >
            <TbFilterCog className="text-red-500 hover:text-amber-400 hover:scale-110" />
          </button>
        </div>
        <div>
          <FilterAccordion accordionInfo={accordionInformation} />
        </div>
      </div>
      <div className="border-2 border-slate-400">
        <div className="flex justify-between py-1 border-2 border-slate-400">
          <h4 className="font-bold text-sm px-4">{langConst[language].sort}</h4>
          <div className="flex px-6">
            <button onClick={handleOpenAccordion}>
              {accordionOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>

            <button onClick={handleSortButton}>
              <RiSortAlphabetAsc className="ml-6 py-1 font-bold text-red-500 text-2xl hover:text-amber-400 hover:scale-110" />
            </button>
          </div>
        </div>
        {accordionOpen && (
          <div>
            <SortAccordion getSortParam={handleSortParam} />
          </div>
        )}
      </div>

      <Link
        to="/gameGPT"
        className="bg-lime-500 mb-16 ml-3 w-11/12 text-center font-bold text-slate-950"
      >
        GameGPT
      </Link>
    </div>
  );
};
export default SortPanel;
