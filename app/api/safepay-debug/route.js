import { NextResponse } from "next/server";

export async function GET() {
  const results = {};

  // Test 1 — Payments 2.0 endpoint
  try {
    const res = await fetch("https://sandbox.api.getsafepay.com/client/payments/v2/session/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_SECRET,
      },
      body: JSON.stringify({
        merchant_api_key: process.env.NEXT_PUBLIC_SAFEPAY_KEY,
        intent:   "CYBERSOURCE",
        mode:     "payment",
        currency: "PKR",
        amount:   10000,
      }),
    });

    // Read raw text first — don't assume JSON
    const raw = await res.text();
    results.v2 = {
      status: res.status,
      statusText: res.statusText,
      raw,                          // ← exact response string
      isJson: raw.trim().startsWith("{") || raw.trim().startsWith("["),
    };
  } catch (e) {
    results.v2 = { error: e.message };
  }

  // Test 2 — v1 endpoint
  try {
    const res = await fetch("https://sandbox.api.getsafepay.com/order/v1/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_SECRET,
      },
      body: JSON.stringify({
        merchant_api_key: process.env.NEXT_PUBLIC_SAFEPAY_KEY,
        intent:   "CYBERSOURCE",
        mode:     "payment",
        currency: "PKR",
        amount:   10000,
      }),
    });

    const raw = await res.text();
    results.v1 = {
      status: res.status,
      statusText: res.statusText,
      raw,
      isJson: raw.trim().startsWith("{") || raw.trim().startsWith("["),
    };
  } catch (e) {
    results.v1 = { error: e.message };
  }

  // Test 3 — Check env vars are loaded (masked)
  results.env = {
    SAFEPAY_KEY_set:    !!process.env.NEXT_PUBLIC_SAFEPAY_KEY,
    SAFEPAY_KEY_prefix: process.env.NEXT_PUBLIC_SAFEPAY_KEY?.slice(0, 8),
    SECRET_set:         !!process.env.SAFEPAY_SECRET,
    SECRET_prefix:      process.env.SAFEPAY_SECRET?.slice(0, 6),
    ENV:                process.env.NEXT_PUBLIC_SAFEPAY_ENV,
  };

  return NextResponse.json(results, { status: 200 });
}