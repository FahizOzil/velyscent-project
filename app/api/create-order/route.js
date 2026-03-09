import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY  // ← service key (not anon)
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from("orders")
      .insert([body])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ order: data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}