"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
function ProfilePage() {
  const [user, setUser] = useState({});
  const [budget_amount, set_budget_amount] = useState();
  const [model, setModel] = useState(false);
  async function user_fet() {
    const { data } = await axios.post("/api/me");
    const { user } = data;
    setUser(user);
  }

  async function update_budget() {
    await axios.post("/api/user/budget", { budget_amount }).then(() => {
      return toast.success("Budget Updated");
    });
  }

  useEffect(() => {
    user_fet();
  }, []);
  return (
    <main className={`w-full max-h-screen bg-[#111827]`}>
      <Toaster />

      <section
        className={`lg:w-[33%] relative h-screen max-h-screen bg-black text-white mx-auto overflow-hidden`}
      >
        <Header />
        <main
          className={` w-full max-h-[80vh] lg:max-h-[76vh] overflow-y-scroll scroll-smooth`}
        >
          <div className="w-full h-full px-5 ">
            <div className="flex items-center gap-10 mt-5">
              <div className="avatar">
                <div className="w-24 rounded-full relative ring ring-primary ring-offset-base-100 ring-offset-2">
                  <Image src="/imgs/ebu.jpg" fill />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user?.name}</h2>
                <p className="text-sm text-slate-500">{user?.profession}</p>
              </div>
            </div>
          </div>
          <div className="py-8 text-slate-400 text-sm">
            <div
              className={`p-4 border-y ${
                model ? "h-32" : "h-14"
              } transition-all overflow-hidden border-slate-700 `}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => {
                  setModel(!model);
                }}
              >
                <p>Set Monthly Budget</p>
                <MdOutlineArrowForwardIos size={"1.2em"} />
              </div>
              <div className="flex items-center mt-5 h-12 gap-5">
                <input
                  type="number"
                  placeholder="Budget"
                  value={budget_amount}
                  onChange={(e) => set_budget_amount(e.target.value)}
                  className="h-full bg-transparent outline-none border text-base border-slate-700 px-2 text-white"
                />
                <button
                  className="px-6 text-white outline-none text-lg bg-orange-700 h-full"
                  onClick={update_budget}
                >
                  {" "}
                  save
                </button>
              </div>
            </div>
          </div>

          {/* budget popup */}
        </main>
        <Footer />
      </section>
    </main>
  );
}

export default ProfilePage;
