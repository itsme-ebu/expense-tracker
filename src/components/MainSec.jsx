"use client";
import React, { useEffect, useState } from "react";
import Spend from "./Spend";
import { BsArrowDown, BsFillTagsFill, BsArrowRight } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { stickers } from "@/constents/const";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// ------

function MainSec({ active_form, form_active_func }) {
  const [tag, set_tag] = useState([]);
  const [exp_amount, set_exp_amount] = useState();
  const [hide_sticker, set_hide_sticker] = useState(true);
  const [confirm_hide, set_confirm_hide] = useState(true);
  const [user, set_user] = useState();
  const [exp_list, set_exp_list] = useState([]);
  const [new_exp, set_new_exp] = useState(true);
  const [this_mount, set_this_mount] = useState();
  let currentDate = new Date().toJSON().slice(0, 10);
  function handle_confirm() {
    if (exp_amount > 0 && tag.length > 0) set_confirm_hide(false);
  }

  async function set_exp_data() {
    const amount = Number(exp_amount);
    const emoji = tag[0];
    const expense_title = tag[1];
    const respons = await axios
      .post("/api/expense", {
        expense_title,
        amount,
        emoji,
      })
      .then(() => {
        set_confirm_hide(true);
        form_active_func(false);
        set_new_exp(!new_exp);
        toast.success(`spend $${amount}`);
      });
  }

  async function user_data() {
    const resp = await axios.post("/api/me");
    const { user } = resp.data;
    const { expenses } = user || [];
    set_user(user);
    set_exp_list(expenses);
  }

  async function month_data() {
    const { data } = await axios.post("/api/month");
    set_this_mount(data);
  }

  useEffect(() => {
    user_data();
    month_data();
  }, [new_exp]);

  return (
    <main
      className={` relative w-full h-[80vh] max-h-[80vh] lg:max-h-[76vh] overflow-y-scroll scroll-smooth bg-black`}
    >
      <Toaster />
      {/* main content  */}
      <div
        className={`${active_form && "opacity-0 hidden"} transition-all px-5`}
      >
        <div className="w-full h-[60vh] flex justify-center items-center flex-col gap-5">
          <p className="text-sm text-slate-400"> Remaining Budget 💰</p>
          <h2 className="text-4xl text-green-500">
            $
            <span className="text-5xl font-normal">
              {user?.budget - this_mount?.total || ""}
            </span>
            .00
          </h2>
        </div>
        <div className="w-full h-full ">
          <div className="flex justify-between items-center text-slate-400 text-sm">
            <h2 key="history"> Month History</h2>
            <h2 key="total"> $ {this_mount?.total}</h2>
          </div>
          {this_mount?.expenses.map((exp, i) => (
            <Spend exp={exp} key={i} />
          ))}
        </div>
      </div>

      {/* Expenss Form  */}

      <div
        className={`flex flex-col items-center h-full justify-center text-slate-400 ${
          !active_form && "opacity-0 hidden"
        }`}
      >
        <p className="text-xs">Today at Thu Mar 28 2024</p>
        <input
          type="Number"
          value={exp_amount}
          className={`border-slate-500 my-3 w-1/2 text-center bg-transparent outline-none border-b text-5xl text-white`}
          onChange={(e) => set_exp_amount(e.target.value)}
        />
        <BsArrowDown size={"2em"} />
        {tag.length > 0 ? (
          <div
            className="flex items-center gap-1 text-sm my-6 cursor-pointer"
            onClick={() => {
              set_hide_sticker(false);
              set_tag([]);
            }}
          >
            {tag.map((t) => (
              <p className="font-medium" key={t}>
                {t}
              </p>
            ))}
            <GrPowerReset />
          </div>
        ) : (
          <p
            className="text-sm my-6 flex justify-center items-center gap-3 cursor-pointer hover:scale-[108%]"
            onClick={() => {
              set_hide_sticker(false);
              set_tag([]);
            }}
          >
            <BsFillTagsFill /> select your tag
          </p>
        )}
        <div className="flex justify-center items-center gap-3 h-10">
          <button
            onClick={() => form_active_func(false)}
            type="cancel"
            className="px-5 rounded-md bg-red-500 h-full text-white"
          >
            cancel
          </button>
          <button
            type="submit"
            className={`px-6 rounded-md h-full bg-white text-black`}
            onClick={handle_confirm}
          >
            Next
          </button>
        </div>
      </div>

      {/* Expenss Tag  */}
      <div
        className={`w-full max-h-screen h-screen absolute overflow-hidden bottom-0 left-0 bg-black ${
          hide_sticker && "hidden"
        }`}
      >
        <div
          className="w-full h-[60vh]"
          onClick={() => set_hide_sticker(true)}
        ></div>
        <div className="w-full h-[40vh] border-t rounded-xl border-slate-400">
          <h2 className="text-sm text-center py-2 font-light text-slate-400">
            EXPENSES
          </h2>
          <div
            className="flex flex-wrap px-6 items-center gap-10 py-3"
            onClick={(e) => {
              const div = e.target.closest(".emoji");
              const result = [
                div?.firstChild.innerHTML,
                div?.lastChild.innerHTML,
              ];
              if (result.length > 0 && result[0] != undefined) {
                set_tag(result);
                set_hide_sticker(true);
              }
            }}
          >
            <div className="p-3 border w-fit rounded-full">
              <AiOutlinePlus size={"1.3em"} />
            </div>
            {stickers.map((stk) => (
              <div className="text-center w-fit emoji" key={stk.text}>
                <h2>{stk.sticker}</h2>
                <h2 className="text-xs">{stk.text}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* conformation form  */}
      <div
        className={`w-full flex justify-center items-end h-screen bg-black absolute bottom-0 left-0 ${
          confirm_hide && "hidden"
        }`}
      >
        <div className="w-full h-72 p-5 border-slate-500 border-t rounded-xl ">
          <h2 className="text-2xl">Confirm</h2>
          <div className="my-5 flex items-center gap-3">
            <div className="p-2 rounded-full bg-slate-600 w-fit">
              <CiLock />
            </div>
            <p className="text-xs text-slate-500">
              Help us ensure accuracy by reviewing your expense before
              confirming because you can not edit it later.
            </p>
          </div>
          <div className="flex justify-center items-center gap-8 text-2xl font-semibold py-3">
            <h2 className="text">${exp_amount}</h2>
            <BsArrowRight />
            <h2>{tag[0]}</h2>
          </div>
          <div className="flex justify-center items-center h-12 gap-8 mt-5">
            <button
              className="w-1/2 h-full bg-red-500 rounded-lg"
              onClick={() => set_confirm_hide(true)}
            >
              Cancel
            </button>
            <button
              className={`w-1/2 h-full bg-white text-black rounded-lg`}
              onClick={set_exp_data}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainSec;
