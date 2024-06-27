"use client";
import { decryptaes } from "@/app/security";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import task from "../assets/task.png";
import chat from "../assets/chat.png";
import List from "../assets/List.png";
import pic from "../assets/pic.png";
import people from "../assets/people.png";
import upgrade from "../assets/upgrade.png";
import Setting from "../assets/Setting.png";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineTask } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { RiGroupLine } from "react-icons/ri";
import { RiSettings2Line } from "react-icons/ri";
import { useAuthContext } from "@/utils/auth";

function Sidebar() {
  const [click, setClick] = useState(1);
  // const cookie = Cookies.get("she2202");
  // const cook = decryptaes(cookie);
  // const d = JSON.parse(cook);
  const { data } = useAuthContext()
  const [name, setName] = useState("");
  const userdata = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/get/alldata");
      const data = response.data;

      const userid = data.find((e) => e._id === data?.id);
      if (userid) {
        setName(userid.username);
      } else {
        console.log("Not getting user");
      }
    } catch (e) {
      console.error("No User found", e.message);
    }
  };
  useEffect(() => {
    userdata();
  }, []);
  return (
    <div className="bg-[#FFFBF3] pn:max-md:hidden h-screen w-[280px] font-sans scrollbar-hide flex flex-col text-[#414141]">
      <div className="h-[15%] w-[100%] flex flex-row  items-center justify-center">
        {/* top */}
        <div className="w-[85%] flex flex-row">
          {/* dp */}
          <div className="h-[40px] w-[40px] rounded-full bg-yellow-500 ">
            <div className="h-[40px] w-[40px] rounded-full bg-red-50 -ml-[3px] border-2 border-yellow-500 -mt-[3px]" />
            {/* <Image src={pic} className="h-[38px] w-[38px] object-contain" /> */}
          </div>
          {/* name */}
          <div className="flex flex-col mx-2">
            <div className="text-[14px] font-semibold">{data?.name}</div>
            <div className="text-[12px] ">Admin</div>
          </div>
        </div>
      </div>
      <div className="h-[55%] w-[100%] flex flex-col items-center justify-evenly">
        {/* section */}
        <Link
          href={"/side/todo"}
          onClick={() => {
            setClick(1);
          }}
          className={`flex flex-row object-contain items-center h-[50px] w-[85%] rounded-xl px-2 ${click === 1 ? " bg-[#FFC977] font-semibold " : ""
            }`}
        >
          <MdOutlineTask className="h-6 w-6" />
          <div className="text-[#404040] font-semibold text-[14px] mx-2">
            Tasks
          </div>
        </Link>

        {/* Storage */}
        <Link
          href={"/side/storage"}
          onClick={() => {
            setClick(2);
          }}
          className={`flex flex-row object-contain items-center h-[50px] w-[85%] rounded-xl px-2 ${click === 2 ? " bg-[#FFC977] font-semibold " : ""
            }`}
        >
          <FaListUl className="h-5 w-5" />
          <div className="text-[#404040] font-semibold text-[14px] mx-2">
            Storage
          </div>
        </Link>

        {/* Chats */}
        <Link
          href={"/side/chit"}
          onClick={() => {
            setClick(3);
          }}
          className={`flex flex-row object-contain items-center h-[50px] w-[85%] rounded-xl px-2 ${click === 3 ? " bg-[#FFC977] font-semibold " : ""
            }`}
        >
          <MdOutlineChatBubbleOutline className="h-5 w-5" />
          <div className="text-[#404040] font-semibold text-[14px] mx-2">
            Chats
          </div>
        </Link>

        {/* Members */}
        <Link
          href={"/side/member"}
          onClick={() => {
            setClick(4);
          }}
          className={`flex flex-row object-contain items-center h-[50px] w-[85%] rounded-xl pl-2 px-2 ${click === 4 ? " bg-[#FFC977] font-semibold " : ""
            }`}
        >
          <RiGroupLine className="h-6 w-6" />
          <div className="text-[#404040] font-semibold text-[14px] mx-2">
            Members
          </div>
        </Link>

        {/* Settings */}
        <Link
          href={"/side/settings"}
          onClick={() => {
            setClick(5);
          }}
          className={`flex flex-row object-contain items-center h-[50px] w-[85%] rounded-xl px-2 ${click === 5 ? " bg-[#FFC977] font-semibold " : ""
            }`}
        >
          {" "}
          <RiSettings2Line className="h-6 w-6" />
          <div className="text-[#404040] font-semibold text-[14px] mx-2">
            Settings
          </div>
        </Link>
      </div>
      <div className="h-[30%] flex justify-center items-end object-contain">
        <Image alt="pic" src={upgrade} />
      </div>
    </div>
  );
}

export default Sidebar;
