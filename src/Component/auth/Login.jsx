import AnxiosInstance from "../../Service/anxiosInstance";
import React, { useState } from "react";
const Login = ({ onDataSend }) => {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const handleSubmit = (event) => {
    console.log("ssss");
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    AnxiosInstance.post("/auth/login", data)
      .then((res) => {
        const response = res.data;
        if (response.type == "USER") {
          AnxiosInstance.post("/api/conversations/create");
        }
        localStorage.setItem("token", response.token);
        localStorage.setItem("type", response.type);
        localStorage.setItem("username", response.username);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  return (
    <div className="w-full h-full relative flex justify-center items-center bg-blue-400">
      <div className="w-[400px] h-[400px] absolute border border-solid border-slate-500 ">
        <div className="relative w-full h-full flex justify-center items-center">
          <form className="flex flex-col gap-y-4 absolute" action="">
            <div className="flex flex-row gap-x-2">
              <label htmlFor="">Username</label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                type="text"
                className="border border-solid border-slate-500"
              />
            </div>
            <div className="flex flex-row gap-x-3">
              <label htmlFor="">password</label>
              <input
                onChange={(e) => setPassWord(e.target.value)}
                value={password}
                type="text"
                className="border border-solid border-slate-500"
              />
            </div>
            <button onClick={handleSubmit}>Đăng Nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
