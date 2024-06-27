"use client";
import React, { useCallback, useEffect, useState } from "react";
import pic from "../../assets/empty.png";
import task from "../../assets/task.png";
import greenflag from "../../assets/greenflag.png";
import Image from "next/image";
import TeamModal from "../Compo/Addteamtask";
import axios from "axios";
import { API } from "@/utils/Essentials";
import moment from "moment";
import { useAuthContext } from "@/utils/auth";

function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamtasks, setTeamtasks] = useState(false);
  const [done, setDone] = useState(1);
  const [tasks, setGetTasks] = useState([]);
  // const cookie = Cookies.get("she2202");
  // const cook = decryptaes(cookie);
  // const d = JSON.parse(cook);
  const { data } = useAuthContext()

  const openModal = () => {
    setIsModalOpen(true);
  };

  console.log(data)

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const open = () => {
    setTeamtasks(true);
  };

  const close = () => {
    setTeamtasks(false);
  };

  const handleImageClick = async ({ taskid, id }) => {
    try {
      setDone(!done);
      const res = await axios.post(`${API}/updatetask`, {
        id,
        taskid,
        status: done ? "completed" : "pending",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = useCallback(async () => {
    try {
      const res = await axios.post(`${API}/fetchalltasks`, { id: data?.id });
      setGetTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="font-sans scrollbar-hide flex flex-col justify-evenly items-center">
      {/* Tasks */}
      <div className="h-[80vh] w-[95%] bg-[#EAEEF4]  rounded-2xl  flex flex-col justify-between items-center object-contain">
        <div className="h-[10%] w-[95%] flex items-center ">
          <div className="text-[14px] text-[#444444] font-semibold">
            Total: {tasks?.tasks?.length || 0} tasks
          </div>
        </div>

        <div className="h-[90%] scrollbar-hide overflow-auto  w-[100%] flex flex-col justify-start items-center">
          {tasks?.tasks?.length < 1 ? (
            <>
              {/* for empty task */}
              <Image src={pic} className="h-[300px] w-[300px]" />
              <div className="flex flex-row items-center justify-between">
                <Image src={task} className="h-[25px] w-[25px]" />
                <div className="text-[18px] mx-2 text-[#444444] font-semibold">
                  No tasks found.
                </div>
              </div>
            </>
          ) : (
            <>
              {tasks?.tasks?.map((task, index) => {
                return (
                  <div
                    key={index}
                    className="w-[95%] my-3 items-center justify-center rounded-xl bg-white flex flex-col"
                  >
                    {/* For each task */}
                    <div className="h-[60px] w-[98%] bg-white items-center justify-center flex flex-row">
                      <div className="w-[5%]  flex items-center justify-center">
                        <img
                          src={{ uri: task?.dp }}
                          className="h-[45px] w-[45px] bg-orange-700 rounded-full"
                        />
                      </div>

                      <div className="w-[85%] h-[60%] px-2 flex flex-col">
                        <div className="font-bold font-sans text-[14px] text-black">
                          {task?.name || "Unknown"}
                        </div>
                        <div className="text-[14px] text-[#414141]">You</div>
                      </div>

                      <div className="w-[10%] flex justify-center">
                        <div className="text-[14px] text-[#414141] ">
                          {moment(task.createdAt).fromNow()}
                        </div>
                      </div>
                    </div>
                    <div className="w-[98%] m-2 flex flex-row bg-[#FFF8EB] rounded-2xl text-black">
                      <div className="w-[95%] p-4">
                        <div className="text-[14px]  text-black">
                          {task.text}
                        </div>
                      </div>

                      <div className="w-[5%] object-contain flex items-start justify-center py-2">
                        <Image
                          alt="pic"
                          src={greenflag}
                          onClick={() => {
                            handleImageClick({ taskid: task._id, id: data?.id });
                          }}
                          className="h-[45px] w-[45px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* <div className="w-[95%]  items-center justify-center rounded-xl bg-white flex flex-col">
            <div className="h-[60px] w-[98%] bg-white items-center justify-center  flex flex-row">
              <div className="w-[5%]  flex items-center justify-center">
                <div className="h-[45px] w-[45px] bg-orange-700 rounded-full"></div>
              </div>

              <div className="w-[85%] h-[60%] px-2 flex flex-col">
                <div className="font-bold font-sans text-[14px] text-black">
                  Lekan Okeowo
                </div>
                <div className="text-[14px] text-[#414141]">You</div>
              </div>

              <div className="w-[10%] flex justify-center">
                <div className="text-[14px] text-[#414141] ">24 Nov 2022</div>
              </div>
            </div>
            <div className="w-[98%] m-2 flex flex-row bg-[#FFF8EB] rounded-2xl text-black">
              <div className="w-[95%] p-4">
                <div className="text-[14px]  text-black">
                  As a translator, I want integrate Crowdin webhook to notify
                  translators about changed stringsAs a translator, I want
                  integrate Crowdin webhook to notify translators about changed
                  strings As a translator, I want integrate Crowdin webhook to
                  notify translators about changed strings As a translator, I
                  want integrate Crowdin webhook to notify translators about
                  changed stringsAs a translator
                </div>
              </div>

              <div className="w-[5%] object-contain flex items-start justify-center py-2">
                <Image
                  alt="pic"
                  src={greenflag}
                  onClick={handleImageClick}
                  className="h-[45px] w-[45px] object-contain "
                />
              </div>
            </div>
          </div>
          <div className="w-[95%]  items-center justify-center rounded-xl bg-white flex flex-col">
            <div className="h-[60px] w-[98%] bg-white items-center justify-center  flex flex-row">
              <div className="w-[5%]  flex items-center justify-center">
                <div className="h-[45px] w-[45px] bg-orange-700 rounded-full"></div>
              </div>

              <div className="w-[85%] h-[60%] px-2 flex flex-col">
                <div className="font-bold font-sans text-[14px] text-black">
                  Lekan Okeowo
                </div>
                <div className="text-[14px] text-[#414141]">You</div>
              </div>

              <div className="w-[10%] flex justify-center">
                <div className="text-[14px] text-[#414141]">24 Nov 2022</div>
              </div>
            </div>
            <div className="w-[98%] m-2 flex flex-row bg-[#FFF8EB] rounded-2xl text-black">
              <div className="w-[95%] p-4">
                <div className="text-[14px]  text-black">
                  As a translator, I want integrate Crowdin webhook to notify
                  translators about changed stringsAs a translator, I want
                  integrate Crowdin webhook to notify translators about changed
                  strings As a translator, I want integrate Crowdin webhook to
                  notify translators about changed strings As a translator, I
                  want integrate Crowdin webhook to notify translators about
                  changed stringsAs a translator
                </div>
              </div>

              <div className="w-[5%] object-contain flex items-start justify-center py-2">
                <Image
                  alt="pic"
                  src={greenflag}
                  onClick={handleImageClick}
                  className="h-[45px] w-[45px] object-contain "
                />
              </div>
            </div>
          </div>*/}
        </div>
      </div>
      {/* <TaskModal isOpen={isModalOpen} onClose={closeModal} /> */}
      <TeamModal isOpen={teamtasks} onClose={close} />
    </div>
  );
}

export default page;
