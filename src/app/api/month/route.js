import db_connect from "@/DB/db_connect";
import { Expense } from "@/models/expense/expense";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(request) {
  // const { token } = await request.json();
  try {
    db_connect();
    const token = await request.cookies.get("token").value;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const timeElapsed = new Date();
    const month = timeElapsed.getMonth() + 1;
    const year = timeElapsed.getFullYear();
    const expenses = await Expense.find({
      user: decoded.user,
      createdAt: { $gte: `${year}-${month}-01` },
    });

    // currentmonth callculation
    let total = 0;
    expenses.map((exp) => (total += exp.amount));

    return NextResponse.json({
      msg: "also works..",
      expenses,
      total,
    });
  } catch (error) {
    return NextResponse.json({ errr: "error" });
  }
}
