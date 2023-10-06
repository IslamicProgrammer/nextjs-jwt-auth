import { connectDB } from "@/connectDb";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log(userId);

    const user = await User.findOne({ _id: userId }).select("-password");
    console.log("user: ", user);

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    // console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
