import db_connect from "@/DB/db_connect";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request) {
  const { name, email, password, profession } = await request.json();

  try {
    db_connect();
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hash_password,
      profession,
    });
    const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY);
    const response = NextResponse.json({ msg: "successfully register" });
    response.cookies.set("token", token);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
