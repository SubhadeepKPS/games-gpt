export const RAPID_API_URL =
  "https://free-to-play-games-database.p.rapidapi.com/api/games";
export const RAPID_API_HOST = "free-to-play-games-database.p.rapidapi.com";

export const SUPPORTED_LANGUAGES = [
  { identifier: "eng", name: "English" },
  { identifier: "hin", name: "हिंदी" },
  { identifier: "ben", name: "বাংলা" },
  // { identifier: "spa", name: "Spanish" },
  // { identifier: "chi", name: "Chinese" },
];

const format = {
  games: [
    {
      name: "Name of the game",
      trailerLink: "Youtube trailer link",
      technicalDetails: "Technical Details of the game",
      theme: "Theme of the game",
      story: "A paragraph on the storyline and setting of the game",
      pros: "Pros of the game",
      cons: "Cons of the game",
      reviews: "Reviews and feedback of the game",
    },
  ],
};

const formatstr =
  '{ games: [{ name: "Name of the game", technicalDetails: "Device configurations required for the game", theme: "Theme of the game", story: "A paragraph on the storyline and setting of the game", pros: "Pros of the game", cons: "Cons of the game", reviews: "Reviews and feedback of the game", }, ], }';

export const developerQueryText1 = `Act as expert Game recommendation system and based on the following list of free-to-play games:`;
export const developerQueryText2 = `suggest at most 12 games with utmost accuracy according to the user query in json format so that it can be rendered on a react page. Please get appropriate data for each game. Follow the format given below strictly for response: ${formatstr}. Only respond with games from this list strictly.`;
// const dv = `Based on the following list of free-to-play games: ${localGameNames},
// answer the user's query: "${userQuery}". Only respond with games from this list.`;
