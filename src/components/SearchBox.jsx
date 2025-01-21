import { useRef } from "react";
import { CgSearchLoading } from "react-icons/cg";
import { RiChatSearchFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { langConst } from "../utils/langConstants";

const SearchBox = ({ onInputChange, onButtonClick, loading }) => {
  const page = useSelector((store) => store.page.page);
  const language = useSelector((store) => store.config.language);
  // console.log(page);
  const ref = useRef();
  // console.log(ref);

  const handleInputChange = () => {
    onInputChange(ref);
  };
  const handleClick = () => {
    onButtonClick();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onButtonClick();
    }
  };

  return (
    <div className="flex justify-center w-full">
      {page === "Browse" && (
        <div className="group flex items-center w-6/12">
          <input
            placeholder={langConst[language].search}
            className="w-10/12 h-10 bg-slate-900 rounded-l-xl px-6 border-t-2 border-l-2 border-b-2 text-sm text-amber-200 font-bold outline-none group-hover:border-red-500 group-focus:border-red-400"
          ></input>
          <button className="group w-2/12 h-10 pl-10 bg-slate-900 text-2xl rounded-r-xl border-t-2 border-r-2 border-b-2 text-red-500 hover:text-amber-400 group-hover:border-red-500 ">
            <CgSearchLoading className="group-hover:scale-110" />
          </button>
        </div>
      )}
      {page === "GameGPT" && (
        <div className="group flex items-center w-6/12">
          <input
            ref={ref}
            placeholder={langConst[language].search}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="w-10/12 h-10 bg-slate-900 rounded-l-xl px-6 border-t-2 border-l-2 border-b-2 text-sm text-amber-200 font-bold outline-none group-hover:border-red-500 group-focus:border-red-400"
          ></input>
          <button
            onClick={handleClick}
            disabled={loading}
            className="group w-2/12 h-10 pl-10 bg-slate-900 text-2xl rounded-r-xl border-t-2 border-r-2 border-b-2 text-red-500  group-hover:border-red-500 "
          >
            {loading ? (
              <p className="text-red-300 text-sm font-bold">Loading...</p>
            ) : (
              <RiChatSearchFill className="group-hover:text-amber-400" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
