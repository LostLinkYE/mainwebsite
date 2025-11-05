import { NextRequest, NextResponse } from "next/server";
import { getCard, setCard } from "@/lib/cards-db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await context.params;
  const fromParams = idParam ?? "";
  const fromPath = (() => {
    try {
      const u = new URL(req.url);
      const m = u.pathname.match(/\/api\/card\/([^/]+)/);
      return m?.[1] ?? "";
    } catch {
      return "";
    }
  })();
  const id = decodeURIComponent((fromParams || fromPath || "").trim());
  if (!id || id === "undefined" || id === "[id]") {
    return NextResponse.json({ error: "Invalid card id" }, { status: 400 });
  }
  const rec = await getCard(id);
  if (!rec) {
    return NextResponse.json({ registered: false }, { status: 200 });
  }
  return NextResponse.json({ registered: true, data: rec }, { status: 200 });
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await context.params;
  const fromParams = idParam ?? "";
  const fromPath = (() => {
    try {
      const u = new URL(req.url);
      const m = u.pathname.match(/\/api\/card\/([^/]+)/);
      return m?.[1] ?? "";
    } catch {
      return "";
    }
  })();
  const id = decodeURIComponent((fromParams || fromPath || "").trim());
  if (!id || id === "undefined" || id === "[id]") {
    return NextResponse.json({ error: "Invalid card id" }, { status: 400 });
  }
  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.email) {
    return NextResponse.json({ error: "Missing required fields: name, email" }, { status: 400 });
  }
  const rec = await setCard(id, { name: body.name, email: body.email, message: body.message });
  return NextResponse.json({ ok: true, data: rec }, { status: 201 });
}

/*
To connect a real database later:
- Firebase/Firestore: Replace getCard/setCard with Firestore document reads/writes.
- Supabase: Replace calls with supabase.from('cards').select().eq('id', id) and .upsert().
- Prisma (SQLite/Postgres): Implement getCard/setCard using prisma client.
*/
