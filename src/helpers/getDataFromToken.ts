import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encoddedToken = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(
      encoddedToken,
      process.env.TOKEN_SECRET!
    ); // Throw error if token is expired

    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
