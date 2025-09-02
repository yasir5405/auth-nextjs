import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/validations/user";

export const GET = () => {
  return NextResponse.json({
    message: "hello",
  });
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const parsedBody = signupSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          status: false,
          message: parsedBody.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = parsedBody.data;

    const doesUserExist = await client.users.findFirst({
      where: {
        email: email,
      },
    });

    if (doesUserExist) {
      return NextResponse.json(
        {
          status: false,
          message: "Email already registered.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await client.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return NextResponse.json({
      status: true,
      message: "Signed up successfully.",
      data: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
};
