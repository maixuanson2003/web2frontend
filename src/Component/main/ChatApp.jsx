import React, { useEffect, useState } from "react";
import AnxiosInstance from "../../Service/anxiosInstance";
import Conversation from "./Conversation";
import Message from "./Message";
const ChatApp = ({ message }) => {
  const type = localStorage.getItem("type");
  const [groupId, setGroupId] = useState(null);
  console.log(message);
  useEffect(() => {
    console.log("Message in ChatApp:", groupId);
  }, [groupId]);
  const handleData = (data) => {
    setGroupId(data);
  };
  const hanldeLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("username");
    window.location.reload();
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-[5%] grid grid-cols-12 items-center">
        <div className="col-start-1 col-end-3">
          <h1 className="text-center">
            ChatApp {type == "ADMIN" ? "admin" : "user"}
          </h1>
        </div>
        <div className="col-start-12 col-end-13">
          <div onClick={hanldeLogOut} className="bg-red-600">
            <h1 className="text-center cursor-pointer  ">Dang xuat</h1>
          </div>
        </div>
      </div>
      <div className="w-full  h-[95%] flex flex-row justify-center gap-x-4">
        <div className="w-1/5 ml-4 border border-solid border-slate-500 rounded-xl">
          <Conversation onSendGroupId={handleData} />
        </div>
        <div className="w-3/5 border border-solid border-slate-500 rounded-xl">
          <Message GroupId={groupId} />
        </div>
      </div>
    </div>
  );
};
export default ChatApp;
