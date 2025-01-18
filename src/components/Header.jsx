import appLogo from "../assets/appLogo.png";
import { langConst } from "../utils/langConstants";
import { AiFillInteraction } from "react-icons/ai";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { IoIosPlayCircle } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { alterLanguage } from "../utils/store/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.language);
  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(alterLanguage(e.target.value));
  };
  return (
    <div className="flex justify-between w-screen bg-slate-900 border-b-2 border-slate-400">
      <div className="flex w-11 h-10 lg:w-14 lg:h-auto rounded-full">
        <img src={appLogo} alt="VideoGptLogo" className="rounded-full" />
        <h1 className="font-extrabold text-3xl text-red-500">GameGPT</h1>
      </div>
      <div className="flex -z-40 lg:flex lg:z-0 ">
        <button className="flex flex-col justify-center items-center lg:mx-12 text-red-500 hover:text-amber-400">
          <IoIosPlayCircle className="text-xl" />
          <h3 className="text-xs font-bold">
            {langConst[language].playLater} [12]
          </h3>
        </button>
        <button className="flex flex-col justify-center items-center lg:mx-12 text-red-500 hover:text-amber-400">
          <AiFillInteraction className="text-xl" />
          <h3 className="text-xs font-bold">{langConst[language].replay}</h3>
        </button>
        <button className="flex flex-col justify-center items-center lg:mx-12 mt-0.5 text-red-500 hover:text-amber-400">
          <BsFillCalendarCheckFill className="text-lg" />
          <h3 className="text-xs font-bold mt-0.5">
            {langConst[language].finished}
          </h3>
        </button>
      </div>
      <div>
        <select
          onChange={(e) => handleLanguageChange(e)}
          className="w-24 h-8 py-1 px-3 mr-8 mt-2 bg-slate-600 rounded-xl border-2 border-red-500 text-slate-200 text-xs font-bold outline-none cursor-pointer"
        >
          {SUPPORTED_LANGUAGES.map((language) => (
            <option
              key={language.identifier}
              value={language.identifier}
              className="font-bold"
            >
              {language.name}
            </option>
          ))}
        </select>
        {/* <button className="mx-12 mt-0.5 text-red-500 hover:text-amber-400">
          <AiOutlineLogin className="text-lg" />
          <h3 className="text-xs font-bold mt-0.5">
            {langConst[language].signIn}
          </h3>
        </button> */}
      </div>
    </div>
  );
};
export default Header;
