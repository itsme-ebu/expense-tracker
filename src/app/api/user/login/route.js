import db_connect from "@/DB/db_connect";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    db_connect();
    const user = await User.findOne({ email });
    const response = await bcrypt.compare(password, user.password);
    if (!response) {
      return NextResponse.json({ error: true });
    } else {
      const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      const response = NextResponse.json({ msg: "login sucessfully" });
      response.cookies.set("token", token);
      return response;
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
