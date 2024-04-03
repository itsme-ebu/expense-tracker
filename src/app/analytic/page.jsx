import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AnalyticPage() {
  return (
    <main className={`w-full max-h-screen bg-[#111827]`}>
      <Toaster />

      <section
        className={`lg:w-[33%] relative h-screen max-h-screen bg-black text-white mx-auto overflow-hidden`}
      >
        <Header />
        <main
          className={` w-full max-h-[80vh] lg:max-h-[76vh] overflow-y-scroll scroll-smooth`}
        ></main>
        <Footer />
      </section>
    </main>
  );
}
