import { promises as fs } from "fs";
import path from "path";

export type CardRecord = {
  id: string;
  name: string;
  email: string;
  message?: string;
  createdAt: string;
};

const DB_PATH = path.join(process.cwd(), "data", "cards.json");

async function ensureFile() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, "{}", "utf8");
  }
}

export async function readDB(): Promise<Record<string, CardRecord>> {
  await ensureFile();
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    const data = JSON.parse(raw || "{}");
    if (typeof data !== "object" || Array.isArray(data)) return {} as any;
    return data as Record<string, CardRecord>;
  } catch {
    return {} as any;
  }
}

export async function writeDB(data: Record<string, CardRecord>) {
  await ensureFile();
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(DB_PATH, json, "utf8");
}

export async function getCard(id: string): Promise<CardRecord | null> {
  const db = await readDB();
  return db[id] ?? null;
}

export async function setCard(id: string, payload: Omit<CardRecord, "id" | "createdAt"> & { message?: string }): Promise<CardRecord> {
  const db = await readDB();
  const rec: CardRecord = {
    id,
    name: payload.name,
    email: payload.email,
    message: payload.message,
    createdAt: new Date().toISOString(),
  };
  db[id] = rec;
  await writeDB(db);
  return rec;
}

/*
How to connect a real DB later:
- Firebase: Replace readDB/writeDB/getCard/setCard with Firestore calls. Example:
  import { doc, getDoc, setDoc } from "firebase/firestore";
  const ref = doc(firestore, "cards", id);
  const snap = await getDoc(ref);
  await setDoc(ref, { name, email, message, createdAt });
- Supabase: Use supabase.from('cards').select('*').eq('id', id).single() and .upsert({ id, ...fields })
- Prisma + SQLite/Postgres: Define a Card model in schema.prisma and use prisma.card.upsert()
*/
