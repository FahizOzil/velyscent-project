import { NextResponse } from "next/server";

const BASE = "https://sandbox.api.getsafepay.com";
const KEY  = process.env.NEXT_PUBLIC_SAFEPAY_KEY;
const SEC  = process.env.SAFEPAY_SECRET;

async function tryRequest(label, body, headers) {
  try {
    const res = await fetch(`${BASE}/order/v1/init`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body:    JSON.stringify(body),
    });
    const raw = await res.text();
    let parsed = null;
    try { parsed = JSON.parse(raw); } catch {}
    return {
      label,
      status: res.status,
      raw,
      token: parsed?.data?.tracker?.token || parsed?.data?.token || parsed?.token || null,
    };
  } catch (e) {
    return { label, error: e.message };
  }
}

export async function GET() {
  const results = await Promise.all([

    // Format 1 — client field + secret in header
    tryRequest("format1_client_in_body", {
      client:      KEY,
      intent:      "CYBERSOURCE",
      mode:        "payment",
      currency:    "PKR",
      amount:      10000,
      environment: "sandbox",
    }, { "X-SFPY-MERCHANT-SECRET": SEC }),

    // Format 2 — merchant_api_key in body + secret in header
    tryRequest("format2_merchant_api_key_in_body", {
      merchant_api_key: KEY,
      intent:           "CYBERSOURCE",
      mode:             "payment",
      currency:         "PKR",
      amount:           10000,
      environment:      "sandbox",
    }, { "X-SFPY-MERCHANT-SECRET": SEC }),

    // Format 3 — key in Authorization header as Bearer
    tryRequest("format3_bearer_auth", {
      intent:      "CYBERSOURCE",
      mode:        "payment",
      currency:    "PKR",
      amount:      10000,
      environment: "sandbox",
    }, {
      "X-SFPY-MERCHANT-SECRET": SEC,
      "Authorization": `Bearer ${KEY}`,
    }),

    // Format 4 — secret as Basic auth
    tryRequest("format4_basic_auth", {
      client:      KEY,
      intent:      "CYBERSOURCE",
      mode:        "payment",
      currency:    "PKR",
      amount:      10000,
      environment: "sandbox",
    }, {
      "Authorization": `Basic ${Buffer.from(`${KEY}:${SEC}`).toString("base64")}`,
    }),

  ]);

  const working = results.find(r => r.token);

  return NextResponse.json({
    winner: working ? working.label : "none_worked",
    token:  working?.token || null,
    results,
    env: {
      KEY_prefix: KEY?.slice(0, 12),
      SEC_prefix: SEC?.slice(0, 8),
      KEY_length: KEY?.length,
      SEC_length: SEC?.length,
    },
  });
}