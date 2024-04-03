import db_connect from "@/DB/db_connect";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request) {
  const token = request.cookies.get("token").value || "";
  const user_id = jwt.decode(token).user;
  const { budget_amount } = await request.json();
  try {
    const user = await User.findByIdAndUpdate(user_id, {
      budget: budget_amount,
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
