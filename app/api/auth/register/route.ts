import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { createUser, getUserByEmail } from "@/lib/users";

const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase()) ?? [];

export async function POST(request: Request) {
  const body = await request.json();
  const name = body?.name?.toString().trim();
  const email = body?.email?.toString().toLowerCase().trim();
  const password = body?.password?.toString() ?? "";

  const complexity = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!name || !email || password.length < 8 || !complexity.test(password)) {
    return NextResponse.json(
      {
        error:
          "Name and email are required. Password must be at least 8 characters with upper/lowercase letters and a number.",
      },
      { status: 400 }
    );
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const hashed = await hash(password, 10);
  await createUser({
    name,
    email,
    password: hashed,
    role: adminEmails.includes(email) ? "admin" : "user",
  });

  return NextResponse.json({ ok: true });
}
