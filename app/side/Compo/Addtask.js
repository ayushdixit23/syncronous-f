"use client";
import React, { useEffect, useState } from "react";
import Icon from "../../assets/Icon.png";
import Image from "next/image";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { decryptaes } from "@/app/security";
import { API } from "@/utils/Essentials";
function Addtask({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [data, setData] = useState([]);
  const [allorganizations, setAllorganizations] = useState([]);
  const [tasks, setTasks] = useState("");
  const [gettasks, setGetTasks] = useState("");

  // const id = useSelector((state) => state.user.id);
  // const email = useSelector((state) => state.user.email);

  const cokkie = Cookies.get("she2202");
  const dec = decryptaes(cokkie);
  const d = JSON.parse(dec);

  const postTask = async () => {
    try {
      const response = await axios.post(`${API}/newtask`, {
        text: tasks,
        id: d?._id,
      });
      const data = response.data;

      setTasks("");
      onClose();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const altasks = async () => {
    try {
      const id = d._id;
      const res = await axios.get(`http://localhost:3500/api/mytasks/${id}`);
      //console.log(res.data, "tasks");
    } catch (e) {
      console.log("Tasks not fetched");
    }
  };
  useEffect(() => {
    altasks();
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-opacity-50 bg-gray-800">
      <div className="bg-white p-4 rounded-xl w-[100%] sm:w-[35%] flex-col h-[60%] flex justify-evenly items-center">
        <div className="flex flex-row  h-[8%] justify-between items-center w-[90%] ">
          <div className="text-[16px] text-black flex items-center h-[100%] font-semibold ">
            Add New Task
          </div>
          {/* Add your form or other content here */}
        </div>
        <input
          className="p-2 bg-[#FFFBF3] outline-none h-[65%] flex justify-start w-[90%] overflow-auto border-2 rounded-xl border-[#FFC248]"
          placeholder="What is the task?"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
        <div className="flex flex-row justify-between items-center w-[90%] space-x-1 h-[10%]">
          <div
            onClick={onClose}
            className="w-[50%] flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-white rounded-3xl"
          >
            Cancel
          </div>
          <div
            onClick={postTask}
            className="w-[50%] flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-[#FFC248] rounded-3xl"
          >
            Save Task
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addtask;
