// API route for receiving data
import { NextResponse } from "next/server";
import { addUser, findUser } from "@/app/lib/auth/users";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await findUser(email);
    if (await existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const user = await addUser(name, email, password);
    console.log(await addUser("Test", "test@email.com", "Password123!"));

    return NextResponse.json(
      { message: "User successfully registered", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("error adding test user:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
