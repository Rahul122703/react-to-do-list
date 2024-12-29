import { useState, useRef, useEffect } from "react";
import List from "./List";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [listData, setData] = useState([]);
  const [submitData, setSubmitData] = useState(null);
  const inputField = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingID, setIsEditingId] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submitData) {
      toast.error("Empty Value", { position: "bottom-right", autoClose: 1000 });
    } else if (isEditing) {
      setIsEditing(false);
      const newDataList = listData.map((currentItem) => {
        if (currentItem.id === editingID) {
          return {
            id: editingID,
            data: inputField.current.value,
          };
        }
        return currentItem;
      });
      setData(newDataList);
      localStorage.setItem("list", JSON.stringify(newDataList));
      toast.info("Item Edited", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      addItem();
    }
    inputField.current.value = "";
  };

  const addItem = () => {
    const newListData = [
      ...listData,
      {
        id: new Date().getTime(),
        data: submitData,
      },
    ];
    setData(newListData);
    localStorage.setItem("list", JSON.stringify(newListData));
    toast.success("Item Added", { position: "top-right", autoClose: 1000 });
  };

  const deleteItem = (deleteId) => {
    const newListData = listData.filter(
      (currentItem) => currentItem.id !== deleteId
    );
    setData(newListData);
    localStorage.setItem("list", JSON.stringify(newListData));
    toast.error("Item Deleted", { position: "top-right", autoClose: 1000 });
  };

  const editItem = (editId) => {
    const editData = listData.find((currentItem) => currentItem.id === editId);
    inputField.current.value = editData.data;
    setIsEditing(true);
    setIsEditingId(editId);
  };

  const clearItems = () => {
    setData([]);
    localStorage.removeItem("list");
    toast.error("All Cleared", { position: "top-right", autoClose: 1000 });
  };

  useEffect(() => {
    const existingData = localStorage.getItem("list");
    setData(existingData ? JSON.parse(existingData) : []);
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center p-2 m-auto mt-[3rem] none123[0.5px] none123gray-500  rounded-xl shadow-2xl bg-white bg-opacity-10 backdrop-blur-lg w-[95vw] max-w-[600px]">
        <form
          className="none123[0.5px] none123gray-500 flex items-center p-4  bg-white rounded-lg shadow-xl bg-opacity-30 backdrop-blur-lg w-full justify-center mb-[1rem]"
          onSubmit={handleSubmit}>
          <input
            type="text"
            className="px-4 py-2 placeholder-gray-400 bg-transparent border none123gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-[1rem] w-[80%] max-w-[300px] sm:w-[80%] sm:mr-0 "
            placeholder="Workout"
            onChange={(e) => setSubmitData(e.target.value)}
            ref={inputField}
          />
          <button className="relative px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-2xl focus:outline-none transition-all duration-300 transform active:scale-95 active:shadow-inner group h-[80%] w-[40%] sm:w-[20%] sm:ml-[0.5rem] ml-[0.1rem]">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 rounded-lg opacity-50 bg-gradient-to-r from-blue-300 via-purple-400 to-purple-600 blur-md group-hover:opacity-70 group-hover:blur-lg"></span>
            <span className="relative">Submit</span>
          </button>
        </form>
        <List listData={listData} deleteItem={deleteItem} editItem={editItem} />

        {listData.length > 0 && (
          <button
            className="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95 mt-[1rem]"
            onClick={() => clearItems()}>
            <span className="absolute inset-0 w-full h-full transition duration-300 bg-red-600 rounded-lg opacity-50 blur-md group-hover:opacity-70 group-hover:blur-lg"></span>
            <span className="relative z-10">Clear Items</span>
          </button>
        )}
      </div>
    </>
  );
};

export default App;
