import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://sandbox.api.getsafepay.com/order/v1/init", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_SECRET,
    },
    body: JSON.stringify({
      client:      process.env.NEXT_PUBLIC_SAFEPAY_KEY,
      intent:      "CYBERSOURCE",
      mode:        "payment",
      currency:    "PKR",
      amount:      10000,
      environment: "sandbox",
    }),
  });

  const raw = await res.text();
  let parsed = null;
  try { parsed = JSON.parse(raw); } catch {}

  return NextResponse.json({
    http_status:  res.status,
    raw_response: raw,
    token_found:  parsed?.data?.tracker?.token || null,
  });
}