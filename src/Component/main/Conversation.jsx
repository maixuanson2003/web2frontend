import React, { useEffect, useState } from "react";
import AnxiosInstance from "../../Service/anxiosInstance";
const Conversation = ({ onSendGroupId }) => {
  const type = localStorage.getItem("type");
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    AnxiosInstance.get("/api/conversations/user").then((res) => {
      console.log("API Response:", res.data);
      const DataResponse = res.data;
      setData(DataResponse);
    });
  }, []);
  return (
    <div className="w-full">
      <div className="w-[80%] h-[30px] mx-auto mt-2 gap-x-2 flex flex-row">
        <input
          onFocus={() => setFocus(true)}
          className={`${
            focus ? "w-full" : ""
          } border  h-full border-solid rounded-xl border-gray-500`}
          type="text"
          name=""
          id=""
          placeholder="Tim kiem"
        />
        <button className="bg-blue-500 w-full h-full text-center text-white">
          Search
        </button>
      </div>
      <div className="p-2 flex flex-col gap-y-3 mt-2">
        {data &&
          data.map((item, index) => (
            <div
              onClick={() => onSendGroupId(item.id)}
              className="w-[90%] h-[40px] mx-auto  flex items-center border  border-solid rounded-xl border-gray-500"
            >
              <div className="w-[80%]">
                {" "}
                <h1 className="p-2 text-white">{item.nameUserRecevive}</h1>
              </div>
              <div className="w-[30px] h-[30px] bg-blue-600 rounded-full"></div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Conversation;
