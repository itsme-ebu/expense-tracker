"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
  const [email, set_email] = useState();
  const [password, set_password] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  async function handle_login(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/user/login", { email, password });
      if (!res.data.error) {
        toast.success("login success");
        return router.push("/");
      }
      setLoading(false);
      return toast.error("Invalid Crentials");
    } catch (error) {
      toast.error("Invalid Crentials");
    }
  }

  return (
    <main className="w-full max-h-screen  bg-[#111827]">
      <Toaster />
      <section
        className={`lg:w-[33%] relative h-screen max-h-screen bg-black text-white mx-auto overflow-hidden`}
      >
        <Header />
        <div
          className={` relative w-full max-h-[80vh] lg:max-h-[76vh] overflow-y-scroll scroll-smooth`}
        >
          <h2 className="text-center font-medium text-2xl">Login</h2>
          <form onSubmit={(e) => handle_login(e)} className="px-8 mt-6 w-full">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="w-full my-6 p-2 bg-transparent outline-none border-slate-500 border-b text-lg"
              onChange={(e) => set_email(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full p-2 bg-transparent outline-none border-slate-500 border-b text-lg"
              onChange={(e) => set_password(e.target.value)}
            />
            <button
              type="submit"
              className="w-[60%] mt-6 text-white bg-orange-700 py-4 rounded-xl text-xl font-medium mx-auto block"
            >
              {loading ? "loging..." : "Login"}
            </button>
            <p className="my-4 text-center text-sm text-slate-400">
              Dont have an account{" "}
              <Link href="/signup" className="text-black">
                Register
              </Link>
            </p>
          </form>
        </div>
        <Footer />
      </section>
    </main>
  );
}

export default LoginPage;
