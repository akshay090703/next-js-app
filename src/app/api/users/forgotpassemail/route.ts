import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const { email } = reqBody;
  console.log(email);

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid User!" }, { status: 400 });
  }

  await sendEmail({ email, emailType: "RESET", userId: user._id });

  // ${process.env.domain}/verifyemail?token=${hashedToken}

  return NextResponse.json({ message: "User Found!", data: user });
}
