import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { BsSun } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";
function Header({ user }) {
  const router = useRouter();
  async function logout() {
    await axios.post("/api/logout");
    return router.push("/");
  }

  return (
    <nav className={`w-full flex justify-between px-5 py-6 bg-black`}>
      <div className="cursor-pointer">
        <BsSun size={"1.3em"} />
      </div>
      <h2>EXPENSES</h2>
      <div className=" cursor-pointer" onClick={logout}>
        <IoLogOutOutline size={"1.3em"} />
      </div>
    </nav>
  );
}

export default Header;
