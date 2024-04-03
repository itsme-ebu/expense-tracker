import db_connect from "@/DB/db_connect";
import { Expense } from "@/models/expense/expense";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(req) {
  db_connect();
  const { expense_title, amount, emoji } = await req.json();
  try {
    const token = (await req.cookies.get("token").value) || "";
    const user_id = jwt.verify(token, process.env.SECRET_KEY).user;
    const expense = await Expense.create({
      expense_title,
      amount,
      emoji,
      user: user_id,
    });
    const user = await User.findById(user_id);
    user.expenses.push(expense._id);
    user.save();
    return NextResponse.json({
      msg: "sucess",
      expense,
      user,
    });
  } catch (error) {
    return NextResponse.json({ msg: error });
  }
}
