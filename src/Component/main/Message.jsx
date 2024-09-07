import React, { useState, useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import AnxiosInstance from "../../Service/anxiosInstance";
const Message = ({ GroupId }) => {
  const [stompClient, setStompClient] = useState(null);
  const [userReceive, setUserReceive] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [render, setRender] = useState();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat");
    const client = Stomp.over(socket);
    client.connect(
      {},
      (frame) => {
        console.log("Connected: " + frame);
        client.subscribe(`/Topic/Conversation/${GroupId}`, (msg) => {
          console.log(msg);
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(msg.body),
          ]);
        });
        setStompClient(client);
        return () => {
          if (stompClient) {
            stompClient.disconnect();
          }
        };
      },
      (error) => {
        console.error("STOMP connection error:", error);
      }
    );
  }, [GroupId]);

  useEffect(() => {
    if (GroupId) {
      AnxiosInstance.get(`/api/conversations/${GroupId}`).then((res) => {
        const responseData = res.data;
        console.log(responseData.id);
        setMessages(responseData.chatinfors);
      });
    }
  }, [GroupId, render]);
  useEffect(() => {
    AnxiosInstance.get("/api/conversations/user").then((res) => {
      const responseData = res.data;

      setUserReceive(responseData.nameUserRecevive);
    });
  }, [GroupId]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected && message) {
      const dataSend = {
        userSender: username,
        userRceive: userReceive,
        content: message,
        conversationId: GroupId,
      };

      AnxiosInstance.post("/sendMessage", dataSend)
        .then((response) => {
          const responseData = response.data;
          console.log(responseData);
          stompClient.send(
            `/app/chat/Conversation/${GroupId}`,
            {},
            JSON.stringify(responseData)
          );
          setMessage("");
        })
        .then((res) => {
          setRender(Date.now());
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    } else {
      console.error("STOMP client not connected or no message to send");
    }
  };
  return (
    <div className="h-full">
      <div className="overflow-y-auto h-[95%] overflow-visible flex flex-col gap-y-4 ">
        <h2>Chat Messages</h2>

        {messages.map((msg, index) => (
          <div
            className={`inline-block p-2 border border-solid rounded-xl border-gray-500 flex items-center max-w-[70%] ${
              msg.userSender === username
                ? "bg-blue-100 self-end"
                : "bg-gray-100 self-start"
            }`}
            key={index}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="h-[5%] flex justify-center items-center">
        <input
          className="w-[90%] h-full border border-solid border-gray-600"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="w-[10%] h-full bg-blue-500 text-white"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Message;
