import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ listData, deleteItem, editItem }) => {
  if (listData.length === 0) {
    return (
      <div className="">
        <h3>No Data </h3>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center  w-full p-4 mt-8 transition bg-white rounded-lg shadow-2xl bg-opacity-10 backdrop-blur-lg hover:bg-white hover:bg-opacity-20 none123-[0.5px] none123-gray-500 h-[55vh] overflow-auto">
      {listData.map((currentItem, index) => {
        const { data, id } = currentItem;
        return (
          <div
            className="flex flex-row justify-between items-center min-w-[98%] p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg none123-[0.5px] none123-gray-500 transition-all duration-300 hover:bg-opacity-20 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.25),0_6px_6px_rgba(0,0,0,0.22)] mb-[1rem] "
            key={id}>
            <div className="text-sm sm:text-lg black font-emibold text-x">
              <span>({index + 1}) </span>
              {data}
            </div>
            <div className="flex flex-row justify-between w-[15%] h-full items-center">
              <FaEdit
                className="h-full   cursor-pointer ransition txt-black hover:text-green-500 w-[50%] sm:w-[30%]"
                onClick={() => editItem(id)}
              />
              <FaTrash
                className="h-full cursor-pointer ransition txt-black p- hover:text-red-500 w-[55%]sm:w-[27%]"
                onClick={() => deleteItem(id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
