import db_connect from "@/DB/db_connect";
import { User } from "@/models/user/user";
import axios from "axios";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export default async function get_user_details(token) {
  const me = await axios.post("http://localhost:3000/api/me", { token });
  return me;
}
