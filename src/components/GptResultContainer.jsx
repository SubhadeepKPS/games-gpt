import { useDispatch, useSelector } from "react-redux";
import useGameData from "../hooks/useGameData";
import { useEffect, useState } from "react";
import { loadGameOnPage } from "../utils/store/gptResponseSelectionSlice";
import GptResultLoader from "./shimmer/gptResultLoader";
import { langConst } from "../utils/langConstants";

const GptThumbnailPanel = ({ games }) => {
  const dispatch = useDispatch();
  const gameList = games;
  // console.log("gameList: ", gameList);

  const handleButtonClick = (game) => {
    // console.log("dispatchGame: ", game);

    // const gameSerial = JSON.parse(JSON.stringify(game));
    dispatch(loadGameOnPage(game));
  };

  return (
    <div>
      <div className="h-5/6 overflow-scroll">
        {gameList.map(
          (game) =>
            game.match && (
              <button
                key={game.match.id}
                onClick={() => handleButtonClick(game)}
                className="flex flex-row mx-8 my-8 border-2 border-slate-100"
              >
                <img src={game.match.thumbnail} className="w-60" />
              </button>
            )
        )}
      </div>
    </div>
  );
};

const GptInformationBoard = ({ games }) => {
  const gameOnPage = useSelector(
    (store) => store.gptResponseSelection.gameOnPage
  );
  const language = useSelector((store) => store.config.language);
  // console.log("gameOnPage: ", gameOnPage);
  // console.log(games);
  const { story, theme, technicalDetails, pros, cons, reviews, match } =
    gameOnPage || {};
  // .developer, freetogame_profile_url, game_url, .genre, id, .platform, publisher, release_date, short_description, thumbnail, title
  // console.log(gameOnPage);

  return gameOnPage ? (
    <div>
      <div className="w-full">
        <h4 className="mx-8 mt-4 text-3xl font-bold text-red-500">
          {match?.title}
        </h4>
        <div className="flex">
          <h4 className="text-lg font-bold text-red-500 bg-slate-200 px-4 py-1 my-4 ml-8 rounded-2xl">
            {match?.developer}
          </h4>
          <h4 className="text-lg font-bold text-red-500 bg-slate-200 px-3 py-1 my-4 mx-6 rounded-2xl">
            {match?.genre}
          </h4>
          <h4 className="text-lg font-bold text-red-500 bg-slate-200 px-3 py-1 my-4 mx-1 rounded-2xl">
            {match?.platform}
          </h4>
          <button className="text-lg font-bold text-slate-200 bg-red-500 px-3 py-1 my-4 mx-1 rounded-2xl hover:bg-amber-400">
            PLAY Now
          </button>
        </div>

        <div className="flex flex-row justify-between mx-8 w-full">
          <div className="w-96 min-h-44">
            <h5 className="text-amber-400 text-xl font-bold">Story</h5>
            <p>{story}</p>
            <p>{match?.short_description}</p>
          </div>
          <div className="">
            <h5 className="text-xl font-bold text-amber-400 w-36">Theme</h5>
            <p>{theme}</p>
          </div>
          <div className="w-72">
            <div>
              <h5 className="text-amber-400 text-xl font-bold">Pros</h5>
              <p>{pros}</p>
            </div>
            <div>
              <h5 className="text-amber-400 text-xl font-bold">Cons</h5>
              <p>{cons}</p>
            </div>
          </div>
        </div>
        <div className="mx-8 my-8">
          <h5 className="text-amber-400 text-xl font-bold">
            Technical Details
          </h5>
          <p>{technicalDetails}</p>
        </div>
        <div className="mx-8 my-8">
          <h5 className="text-amber-400 text-xl font-bold">Reviews</h5>
          <p>{reviews}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="mx-32 my-40">
      <div className="font-bold text-4xl text-red-500">
        {langConst[language].gptBoxText}
      </div>
    </div>
  );
};

const GptResultContainer = ({ gptResult, loading }) => {
  const [gameInStore, setGameInStore] = useState(false);
  const [gptResponseGames, setGptResponseGames] = useState(null);
  const language = useSelector((store) => store.config.language);
  const gptResponse = gptResult?.games;
  const gamesData = useSelector((store) => store.games);
  // console.log("Loading: ", loading);

  useGameData(gameInStore);
  // console.log("allgam: ", gamesData);
  // console.log("container: ", gptResponse);
  // console.log("gameInStore: ", gameInStore);

  useEffect(() => {
    if (gamesData === null) {
      setGameInStore(true);
    }

    if (gptResponse !== undefined) {
      const gptFilteredGames = gptResponse.map((gptGame) => {
        const found =
          gamesData &&
          gamesData.find(
            (game) => game?.title.toLowerCase() === gptGame?.name.toLowerCase()
          );
        return {
          ...gptGame,
          match: found || null,
        };
      });
      // console.log("gptFilteredGames: ", gptFilteredGames);
      setGptResponseGames(gptFilteredGames);
    }
  }, [gamesData, gptResponse]);

  return (
    <div className="flex justify-around">
      <div className="w-11/12 h-screen bg-slate-900 mt-12 rounded-2xl text-slate-300">
        {!gptResponseGames && !loading && (
          <div className="flex justify-center mt-56 text-4xl font-bold px-28">
            <div className="text-center">{langConst[language].gptDisclaim}</div>
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center mt-20">
            <GptResultLoader />
          </div>
        )}
        {gptResponseGames && (
          <div className="flex">
            <GptThumbnailPanel games={gptResponseGames} />
            <GptInformationBoard games={gptResponseGames} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GptResultContainer;
