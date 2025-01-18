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
    <div className="h-auto mx-4 my-3 bg bg-gradient-to-b from-slate-200 to-black border-2 border-slate-100 hover:scale-110">
      <div className="p-2">
        <div
          className={`h-auto" ${
            filteredGames && filteredGames.length > 0 ? "w-40" : "w-48"
          }`}
        >
          <img src={thumbnail} className="" />
        </div>
        <div>
          <div className="text-sm font-semibold text-amber-400">
            {title.length >= 17 ? (
              <h3>{title.slice(0, 17) + "..."}</h3>
            ) : (
              <h3>{title}</h3>
            )}
          </div>
          <div className="flex text-xs text-slate-100 font-semibold">
            <BiSolidCategory />
            {publisher.length >= 25 ? (
              <h3>{publisher.slice(0, 25) + "..."}</h3>
            ) : (
              <h3>{publisher}</h3>
            )}
          </div>

          {/* <h4>{platform}</h4> */}
        </div>
        <div className="flex justify-between text-slate-400 ">
          <div className="flex">
            <MdBuildCircle />
            <h4 className="text-xs text-slate-100 font-semibold">{genre}</h4>
          </div>
          <div className="flex">
            <IoIosPlayCircle className="hover:text-amber-400" />
            <AiFillInteraction className="hover:text-amber-400" />
            <BsFillCalendarCheckFill className="hover:text-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
