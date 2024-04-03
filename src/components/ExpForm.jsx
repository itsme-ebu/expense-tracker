"use client";
import React from "react";
import { useEffect, useState } from "react";
import { BsArrowDown, BsFillTagsFill, BsArrowRight } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { stickers } from "@/constents/const";
function ExpForm({ theme, form_active, active_form }) {
  const [tag, set_tag] = useState([]);
  const [hide_sticker, set_hide_sticker] = useState(true);
  const [confirm_hide, set_confirm_hide] = useState(true);
  const [exp_amount, set_exp_amount] = useState();

  function handle_confirm() {
    if (exp_amount > 0 && tag.length > 0) set_confirm_hide(false);
  }

  return <p>hh</p>;
}

export default ExpForm;
