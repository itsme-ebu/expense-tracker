import db_connect from "@/DB/db_connect";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(request) {
  // const { token } = await request.json();
  try {
    db_connect();
    const token = await request.cookies.get("token").value;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.user)
      .select("-password")
      .populate("expenses");
    return NextResponse.json({
      msg: "also works..",
      user,
    });
  } catch (error) {
    return NextResponse.json({ errr: "error" });
  }
}
