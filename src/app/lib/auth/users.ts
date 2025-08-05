import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

// create json file for user
const filePath = path.join(process.cwd(), "data/users.json");

//get users
export async function getUsers() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveUsers(users: any[]) {
  // Ensure directory exists
  const dir = path.dirname(filePath);
  try {
    await fs.mkdir(dir, { recursive: true }); // ✅ Creates "data" folder if missing
  } catch {}

  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

// add user
export async function addUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const users = await getUsers();

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(user);
  await saveUsers(users);
  return user;
}

// find user
export async function findUser(email: string) {
  const users = await getUsers();
  return users.find((user: any) => user.email === email);
}
