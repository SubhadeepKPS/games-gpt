import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RAPID_API_URL } from "../utils/constants";
import { RAPID_API_HOST } from "../utils/constants";
import { addGameInfo } from "../utils/store/gameDataSlice";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

const useGameData = (gameInStore) => {
  const dispatch = useDispatch();

  const fetchGameData = async () => {
    // console.log("Fetching");

    const url = RAPID_API_URL;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": RAPID_API_HOST,
      },
    };

    if (gameInStore === false) {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log("Result: ", result);
        // console.log(typeof result);

        dispatch(addGameInfo(result));
      } catch (error) {
        console.error(error);
      }
    }

    return;
  };

  useEffect(() => {
    fetchGameData();
  }, []);
};

export default useGameData;
