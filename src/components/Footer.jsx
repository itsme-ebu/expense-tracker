import React from "react";
import { GrAnalytics } from "react-icons/gr";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";

function Footer({ home }) {
  return (
    <footer
      className={`w-full flex justify-between items-center z-20 absolute bottom-0 left-0 border-t py-4 px-8 text-slate-200 bg-black`}
    >
      <div className=" text-sm w-fit flex items-center flex-col">
        <GrAnalytics size={"1.2em"} />
        <p>Analytic</p>
      </div>
      <Link
        href="/"
        className="p-2 flex justify-center items-center rounded-full text-black bg-[#FDE047]"
      >
        <button className=" hover:scale-125">
          <AiOutlinePlus size={"1.4em"} />
        </button>
      </Link>
      <Link
        href="/profile"
        className=" text-sm w-fit flex items-center flex-col cursor-pointer"
      >
        <AiOutlineUser size={"1.2em"} />
        <p>Profile</p>
      </Link>
    </footer>
  );
}

export default Footer;
