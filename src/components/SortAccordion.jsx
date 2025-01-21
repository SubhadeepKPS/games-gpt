import { FaRegCircle } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addSortParam } from "../utils/store/sortSlice";
import { useEffect, useState } from "react";

const SortAccordion = ({ getSortParam }) => {
  const [sortParam, setSortParam] = useState(null);
  const sortCategory = ["Title", "Developer", "Publisher", "Genre"];
  const dispatch = useDispatch();

  const handleSelectSortParam = (param) => {
    // dispatch(addSortParam(param));
  };

  return (
    <div>
      <div className="border-l-2 border-t-2 border-b-2 border-slate-500 ml-4 rounded-l-2xl hover:cursor-pointer">
        {sortCategory.map((categoryName) => {
          return (
            <div
              key={categoryName}
              // onClick={}
              className="group flex justify-between mx-12 my-2"
            >
              <div className="text-sm group-hover:scale-110">
                <h5 className="">{categoryName}</h5>
              </div>
              <button
                onClick={handleSelectSortParam(categoryName.toLowerCase())}
                className="text-lg text-red-500"
              >
                {categoryName?.toLowerCase() === sortParam?.toLowerCase() ? (
                  <IoCheckmarkCircleSharp
                    onClick={() => setSortParam(null)}
                    className="text-amber-400 pt-0.5 pl-0.5"
                  />
                ) : (
                  <FaRegCircle
                    onClick={() => {
                      setSortParam(categoryName);
                      getSortParam(categoryName);
                    }}
                    className="mt-1 text-sm pb-0.5 text-red-500 group-hover:text-amber-300"
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SortAccordion;
