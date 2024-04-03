"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BiEdit } from "react-icons/bi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
function page() {
  const [form_active, set_form_active] = useState(false);
  function active_form(v) {
    set_form_active(v);
  }
  const router = useRouter();

  const [name, set_name] = useState();
  const [email, set_email] = useState();
  const [password, set_password] = useState();
  const [role, set_role] = useState();

  const theme = true;
  async function handle_regiester(e) {
    e.preventDefault();
    console.log("hello");
    await axios
      .post("/api/user/signup", { name, email, password, profession: role })
      .then(() => router.push("/"));
  }

  return (
    <main className={`w-full max-h-screen bg-[#111827]`}>
      <section
        className={`lg:w-[33%] relative h-screen max-h-screen bg-black text-white mx-auto overflow-hidden`}
      >
        <Header />
        <div
          className={` relative w-full max-h-[80vh] lg:max-h-[76vh] overflow-y-scroll scroll-smooth`}
        >
          <h2 className="text-center font-medium text-2xl">Register</h2>
          <form
            action=""
            onSubmit={(e) => handle_regiester(e)}
            className="px-8 mt-6 w-full"
          >
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => set_name(e.target.value)}
              className="w-full p-2 bg-transparent outline-none border-slate-500 border-b text-lg"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => set_email(e.target.value)}
              className="w-full my-6 p-2 bg-transparent outline-none border-slate-500 border-b text-lg"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => set_password(e.target.value)}
              className="w-full p-2 bg-transparent outline-none border-slate-500 border-b text-lg"
            />
            <input
              type="text"
              placeholder="Profession"
              onChange={(e) => set_role(e.target.value)}
              className="w-full my-6 p-2 bg-transparent outline-none border-slate-500 border-b text-lg"
            />
            <button
              type="submit"
              className="w-[60%] text-white mt-3 bg-orange-700 py-4 rounded-xl text-xl font-medium mx-auto block"
            >
              Submit
            </button>
            <p className="my-4 text-center text-sm text-slate-400">
              Alredy have an account{" "}
              <Link
                href="/login"
                className={`${theme ? "text-white" : "text-black"}`}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
        <Footer />
      </section>
    </main>
  );
}

export default page;
