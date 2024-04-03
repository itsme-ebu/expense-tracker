"use client";
import Header from "@/components/Header";
import MainSec from "@/components/MainSec";
import React, { useState } from "react";
import HomeFooter from "@/components/HomeFooter";

function Page() {
  const [active_form, set_active_form] = useState(false);
  function form_active_func(v) {
    set_active_form(v);
  }

  return (
    <main className={`w-full max-h-screen bg-[#111827]`}>
      <section
        className={`lg:w-[33%] relative h-screen max-h-screenbg-black text-white mx-auto overflow-hidden`}
      >
        <Header />
        <MainSec
          active_form={active_form}
          form_active_func={form_active_func}
        />
        <HomeFooter form_active_func={form_active_func} />
      </section>
    </main>
  );
}

export default Page;
