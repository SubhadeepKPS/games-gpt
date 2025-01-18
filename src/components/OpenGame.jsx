import { IoCloseCircle } from "react-icons/io5";
import { MdBuildCircle } from "react-icons/md";
import { GiPlatform } from "react-icons/gi";
import { HiCalendarDateRange } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { unloadShowGame } from "../utils/store/gameCartSlice";

const OpenGame = () => {
  // const [isOpen, setIsOpen] = useState(false); // State to control modal visibility
  const openGame = useSelector((store) => store.gameCart.openGame);
  const dispatch = useDispatch();

  // Fallback to prevent destructuring issues
  const {
    thumbnail,
    title = "Unknown Title",
    developer = "Unknown Developer",
    genre = "Unknown Genre",
    platform = "Unknown Platform",
    short_description = "No description available.",
    game_url,
    publisher,
    release_date,
  } = openGame || {}; // Fallback if openGame is undefined or null

  // const openModal = () => setIsOpen(true);
  const handleCloseModal = () => {
    dispatch(unloadShowGame());
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80">
        {/* Modal Content */}
        <div className="bg-slate-950 border-2 border-slate-100 w-11/12 max-w-4xl rounded-2xl shadow-lg transform transition-transform duration-300 scale-100 opacity-100">
          <button
            onClick={() => handleCloseModal()}
            className="absolute right-0 mr-4 my-4"
          >
            <IoCloseCircle className=" text-3xl text-red-500 hover:text-amber-400 " />
          </button>
          <div className="p-6 mt-10 mx-4 flex">
            <div className="">
              <div>
                <img src={thumbnail} className="rounded-2xl" />
              </div>
              <h4 className="mx-2 mt-4 text-3xl font-bold text-red-500">
                {title}
              </h4>
              <div className="">
                <h4 className="text-md font-bold text-red-500 bg-slate-200 px-4 py-1 my-4 rounded-2xl">
                  {developer}
                </h4>
                <h4 className="flex text-md font-bold text-red-500 bg-slate-200 px-3 py-1 my-4 rounded-2xl">
                  <MdBuildCircle /> {genre}
                </h4>
                <h4 className="flex text-md font-bold text-red-500 bg-slate-200 px-3 py-1 my-4 rounded-2xl">
                  <GiPlatform />
                  {platform}
                </h4>
              </div>
            </div>
            <div>
              <div className="mx-14 w-full">
                <div className="text-slate-300 w-96 min-h-44">
                  <h5 className="text-amber-400 text-xl">Short Description</h5>
                  <p>{short_description}</p>
                </div>
                <div>
                  <h5 className="text-amber-400 text-xl">Release Date</h5>
                  <p className="text-red-500">
                    <HiCalendarDateRange />
                    {release_date}
                  </p>
                </div>
                <button className="text-lg font-bold text-slate-200 bg-red-500 px-3 py-1 my-4 rounded-2xl hover:bg-amber-400">
                  <a href={game_url} target="_blank">
                    Play Now
                  </a>
                </button>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-around p-4"></div>
        </div>
      </div>
    </div>
  );
};

export default OpenGame;
