import { FaRegCircle } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
// import { useState } from "react";

const SortAccordion = ({ sortParam, getSortParam }) => {
  // const [sortParam, setSortParam] = useState(null);
  const sortCategory = ["Title", "Developer", "Publisher", "Genre"];

  return (
    <div>
      <div className="border-l-2 border-t-2 border-b-2 border-slate-500 ml-6 rounded-l-2xl hover:cursor-pointer">
        {sortCategory.map((categoryName) => {
          return (
            <div
              key={categoryName}
              onClick={() => {
                // setSortParam(categoryName);
                getSortParam(categoryName);
              }}
              className="group flex justify-between ml-7 mr-12 my-2"
            >
              <div className="text-xs group-hover:scale-110">
                <h5 className="">{categoryName}</h5>
              </div>
              <div className="text-lg text-red-500">
                {categoryName?.toLowerCase() === sortParam ? (
                  <IoCheckmarkCircleSharp className="text-amber-400 pt-0.5 pl-0.5" />
                ) : (
                  <FaRegCircle className="mt-1 text-sm pb-0.5 text-red-500 group-hover:text-amber-300" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SortAccordion;
