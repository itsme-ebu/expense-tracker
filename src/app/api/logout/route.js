import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = NextResponse.json({
      message: "logout success",
      sucess: true,
    });

    response.cookies.set("token", "");
    return response;
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
