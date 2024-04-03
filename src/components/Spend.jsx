import React from "react";

function Spend({ exp }) {
  return (
    <div className=" flex items-center w-full justify-between py-5 border-b border-slate-700">
      <div className="flex items-center gap-5">
        <h2 className="text-2xl">{exp.emoji}</h2>
        <div>
          <h2 className="text-l font-medium ">{exp.expense_title}</h2>
          <p className="text-xs text-slate-500">5:24pm</p>
        </div>
      </div>
      <h2 className="text-[#EF4444]">-${exp.amount}</h2>
    </div>
  );
}

export default Spend;
