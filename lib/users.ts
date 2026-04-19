import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/lib/models/User";

export async function getUserByEmail(email: string) {
  await connectToDatabase();
  return UserModel.findOne({ email }).lean();
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  provider?: string;
}) {
  await connectToDatabase();
  return UserModel.create({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role ?? "user",
    provider: data.provider ?? "credentials",
  });
}
