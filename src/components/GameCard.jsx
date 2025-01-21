import { useSelector } from "react-redux";
import { AiFillInteraction } from "react-icons/ai";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { IoIosPlayCircle } from "react-icons/io";
import { MdBuildCircle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

const GameCard = (info) => {
  // console.log("Info", info);
  const filteredGames = useSelector((store) => store.filteredGameCard);
  // console.log("FilteredGamesFinal: ", filteredGames);
  const {
    developer,
    freetogame_profile_url,
    game_url,
    genre,
    id,
    platform,
    publisher,
    release_date,
    short_description,
    thumbnail,
    title,
  } = info.info;
  // console.log("game: ", info);

  return !info ? (
    <div>Loading...</div>
  ) : (
    <div className="group h-auto mx-5 mt-4 mb-6 pb-1 rounded-lg border-2 border-slate-800 bg-gradient-to-b from-slate-200 to-black hover:border-2 hover:border-slate-400 hover:scale-125 hover:bg-gradient-to-b hover:from-black hover:to-slate-200">
      <div className="p-2">
        <div
          className={`h-auto" ${
            filteredGames && filteredGames.length > 0 ? "w-40" : "w-48"
          }`}
        >
          <img src={thumbnail} className="rounded-md" />
        </div>
        <div>
          <div className="text-sm font-semibold text-amber-400 group-hover:text-red-700 group-hover:shadow-xl group-hover:font-bold">
            {title.length >= 17 ? (
              <h3>{title.slice(0, 17) + "..."}</h3>
            ) : (
              <h3>{title}</h3>
            )}
          </div>
          <div className="flex text-xs text-slate-100 font-semibold my-1 group-hover:text-black">
            <BiSolidCategory className="mr-1" />
            {publisher.length >= 25 ? (
              <h3>{publisher.slice(0, 25) + "..."}</h3>
            ) : (
              <h3>{publisher}</h3>
            )}
          </div>

          {/* <h4>{platform}</h4> */}
        </div>
        <div className="flex justify-between text-white group-hover:text-black group-hover:font-bold">
          <div className="flex">
            <MdBuildCircle className="mr-1" />
            <h4 className="text-xs font-semibold">{genre}</h4>
          </div>
          <div className="flex">
            <IoIosPlayCircle className="hover:text-amber-400" />
            {/* <AiFillInteraction className="hover:text-amber-400" />
            <BsFillCalendarCheckFill className="hover:text-amber-400" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
