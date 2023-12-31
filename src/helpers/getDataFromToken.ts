import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    const userId = (jwt.verify(token!, process.env.TOKEN_SECRET!) as any).id;

    return userId;
  } catch (error: any) {
    throw new Error(error);
  }
}
