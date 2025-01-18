import { useDispatch, useSelector } from "react-redux";
import useGameData from "../hooks/useGameData";
import SearchBox from "../components/SearchBox";
import GameListContainer from "../components/GameListContainer";
import SortPanel from "../components/SortPanel";
import Loader from "../components/shimmer/PageLoader";
import { alterPage } from "../utils/store/pageSlice";
import { useEffect, useState } from "react";

const Browse = () => {
  const dispatch = useDispatch();

  const [gameInStore, setGameInStore] = useState(false);
  // const [gameInStore, setGameInStore] = useState(true);
  const gameData = useSelector((store) => store.games);
  useGameData(gameInStore);

  useEffect(() => {
    dispatch(
      alterPage({
        page: "Browse",
      })
    );
    if (gameData === null) {
      setGameInStore(false);
    }
  }, [gameData, gameInStore]);

  return gameData && gameData.length ? (
    <div className="lg:fixed bg-slate-700">
      <div className="flex flex-col-reverse lg:flex lg:flex-row lg:justify-between">
        <div className="w-10/12">
          <div className="py-3">
            <SearchBox />
          </div>
          <div className="">
            <GameListContainer games={gameData} />
          </div>
        </div>
        <div className="w-full lg:w-2/12">
          <SortPanel gameInfo={gameData} />
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default Browse;
