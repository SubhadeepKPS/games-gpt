import { useState, useRef, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import openai from "../utils/openAI";
import { debounce } from "lodash";
import { developerQueryText1, developerQueryText2 } from "../utils/constants";

import { useDispatch, useSelector } from "react-redux";
import { alterPage } from "../utils/store/pageSlice";
import sanitizeGptResponse from "../hooks/sanitizeGptResponse";
import GptResultContainer from "../components/GptResultContainer";

const GameGPT = () => {
  const dispatch = useDispatch();
  const [userQuery, setUserQuery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [gptResult, setGptResult] = useState(null);
  let callCount = useRef(0);
  const gamesDatabase = useSelector((store) => store.games);
  const gameMetadata =
    gamesDatabase &&
    gamesDatabase
      .map((game) => `Name: ${game.title}, genre: ${game.genre}`)
      .join("\n");

  // console.log("today: ", gameMetadata);

  const handleInputValue = (inputValue) => {
    setUserQuery(inputValue.current.value);
    console.log("userQuery: ", userQuery);
  };
  // console.log(gptQueryText);

  const handleGptSearch = debounce(async () => {
    if (isLoading) return;
    setIsLoading(true);
    let retries = 3;
    while (retries > 0) {
      try {
        callCount.current++;
        console.log("callCount: ", callCount);

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini-2024-07-18",
          messages: [
            {
              role: "developer",
              content: `${developerQueryText1}${gameMetadata}${developerQueryText2}`,
            },
            {
              role: "user",
              content: `${userQuery}`,
            },
          ],
        });

        console.log(completion.choices[0].message.content);
        const verifiedJson = sanitizeGptResponse(
          completion.choices[0].message.content
        );
        // const gptResultJson = JSON.parse(completion.choices[0].message.content);
        // console.log(verifiedJson);
        setGptResult(verifiedJson);
        break; // Exit loop on success
      } catch (error) {
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers["retry-after"];
          console.warn(
            `Rate limit exceeded. Retrying after ${retryAfter || 2} seconds.`
          );
          await new Promise((resolve) =>
            setTimeout(resolve, (retryAfter || 2) * 1000)
          );
        } else {
          console.error(error);
          break; // Exit loop on non-rate-limit errors
        }
      }
      retries--;
    }
    setIsLoading(false);
  }, 1000); // Debounce to prevent rapid clicks

  useEffect(() => {
    dispatch(alterPage({ page: "GameGPT" }));
    console.log("gptResult: ", gptResult);
  }, [gptResult]);

  return (
    <div className="fixed bg-slate-700 w-screen h-screen">
      <div className="my-4">
        <SearchBox
          onInputChange={handleInputValue}
          onButtonClick={handleGptSearch}
          loading={isLoading}
        />
      </div>
      <div className="">
        <GptResultContainer gptResult={gptResult} loading={isLoading} />
      </div>
    </div>
  );
};

export default GameGPT;
