import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAccordion,
  updateOpenAccordionName,
} from "../utils/store/accordionSlice";
import {
  addFilterParam,
  removeFilterParam,
} from "../utils/store/filterParamSlice";

const AccordionBars = (value) => {
  const val = value.name;
  // console.log("subACCo: ", val);
  const dispatch = useDispatch();
  const filterParams = useSelector((store) => store.filterParam);
  // console.log("FilterParams: ", filterParams);

  const handleSelectFilterParam = (param) => {
    dispatch(addFilterParam(param.toLowerCase()));
  };
  const handleRemoveFilterParam = (param) => {
    dispatch(removeFilterParam(param.toLowerCase()));
  };

  return (
    <div className="flex justify-between py-2 ml-8 pl-4 mx-14 border-l-2 border-gray-400">
      <div className="text-xs">
        <h4>{val.charAt(0).toUpperCase() + val.slice(1)}</h4>
      </div>
      {filterParams.includes(val.toLowerCase()) ? (
        <button
          onClick={() => handleRemoveFilterParam(val)}
          className="text-lg -mr-4 text-amber-400"
        >
          <IoCheckmarkCircleSharp className="pt-0.5 pl-0.5" />
        </button>
      ) : (
        <button
          onClick={() => handleSelectFilterParam(val)}
          className="mt-1 -mr-4 text-sm"
        >
          <FaRegCircle className="pb-0.5 text-red-500 hover:text-amber-300" />
        </button>
      )}
    </div>
  );
};

const FilterAccordion = (accordionInfo) => {
  const dispatch = useDispatch();
  // console.log(accordionInfo);

  const { accordionNames, openAccordionName, openAccordionValues } =
    accordionInfo.accordionInfo;
  // console.log("Acc Names: ", accordionNames);
  // console.log("Open Acc Name: ", typeof openAccordionName);
  // console.log("Open Acc Values: ", openAccordionValues);

  const handleOpenAccordion = (accordionName) => {
    dispatch(updateOpenAccordionName(accordionName));
  };
  const handleCloseAccordion = () => {
    dispatch(closeAccordion());
  };

  return (
    <div className="">
      <div className="">
        {accordionNames.map((name) => (
          <div key={name}>
            <div className="flex justify-between px-8">
              <h2 className="text-xs pt-0.5 my-1 font-bold">{name}</h2>
              {openAccordionName === name ? (
                <button
                  onClick={() => handleCloseAccordion(name)}
                  className="w-5 h-5 pr-8"
                >
                  <FaAngleUp className="mx-1 text-sm mt-2 text-red-500 hover:text-amber-400 hover:scale-125" />
                </button>
              ) : (
                <button
                  onClick={() => handleOpenAccordion(name)}
                  className="w-5 h-5 pr-8"
                >
                  <FaAngleDown className="mx-1 mt-2 text-sm text-red-500 hover:text-amber-400 hover:scale-125" />
                </button>
              )}
            </div>
            <div className="max-h-64 overflow-y-scroll border-2 border-slate-500">
              {typeof openAccordionName === "string" &&
                openAccordionName.toLowerCase() === name.toLowerCase() &&
                openAccordionValues &&
                (name.toLowerCase() === "genre"
                  ? openAccordionValues.genre.map((value) => {
                      // console.log("val: ", value);
                      return <AccordionBars key={value} name={value} />;
                    })
                  : name.toLowerCase() === "platform"
                  ? openAccordionValues.platform.map((value) => {
                      // console.log("val: ", value);
                      return <AccordionBars key={value} name={value} />;
                    })
                  : name.toLowerCase() === "developer"
                  ? openAccordionValues.developer.map((value) => {
                      // console.log("val: ", value);
                      return <AccordionBars key={value} name={value} />;
                    })
                  : null)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterAccordion;
