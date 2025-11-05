console.log("🔍 SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("🔍 SERVICE_ROLE:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded ✅" : "Missing ❌");

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type CardRecord = {
  id: string;
  name: string;
  email: string;
  message?: string;
  createdAt: string;
};


function getSupabase(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Using NEXT_PUBLIC_SUPABASE_ANON_KEY on server; writes may fail under RLS.");
  }
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return supabase;
}

export async function getCard(id: string): Promise<CardRecord | null> {
  const { data, error } = await getSupabase()
    .from("cards")
    .select("id,name,email,message,created_at")
    .eq("id", id)
    .maybeSingle();
  if (error && error.code !== "PGRST116") throw error;
  if (!data) return null;
  return {
    id: data.id as string,
    name: data.name as string,
    email: data.email as string,
    message: (data as any).message ?? undefined,
    createdAt: (data as any).created_at as string,
  };
}

export async function setCard(
  id: string,
  payload: Omit<CardRecord, "id" | "createdAt"> & { message?: string }
): Promise<CardRecord> {
  const { data, error } = await getSupabase()
    .from("cards")
    .upsert(
      { id, name: payload.name, email: payload.email, message: payload.message ?? null },
      { onConflict: "id" }
    )
    .select("id,name,email,message,created_at")
    .single();
  if (error) throw error;
  return {
    id: data!.id as string,
    name: data!.name as string,
    email: data!.email as string,
    message: (data as any).message ?? undefined,
    createdAt: (data as any).created_at as string,
  };
}
