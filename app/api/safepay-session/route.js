import { NextResponse } from "next/server";

const SAFEPAY_BASE = process.env.NEXT_PUBLIC_SAFEPAY_ENV === "production"
  ? "https://api.getsafepay.com"
  : "https://sandbox.api.getsafepay.com";

// Helper — fetch and safely parse JSON, return raw text on failure
async function safeFetch(url, options) {
  const res = await fetch(url, options);
  const raw = await res.text();
  let data = null;
  try { data = JSON.parse(raw); } catch { data = { _raw: raw }; }
  return { ok: res.ok, status: res.status, data };
}

export async function POST(req) {
  try {
    const { amount, currency, order_id, customer, payment_method } = await req.json();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const body = JSON.stringify({
      merchant_api_key: process.env.NEXT_PUBLIC_SAFEPAY_KEY,
      intent:           "CYBERSOURCE",
      mode:             "payment",
      currency:         currency || "PKR",
      amount:           amount,
    });

    const headers = {
      "Content-Type": "application/json",
      "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_SECRET,
    };

    // ── Try Payments 2.0 first ────────────────────────────────────────
    let token = null;
    const v2 = await safeFetch(`${SAFEPAY_BASE}/client/payments/v2/session/`, { method: "POST", headers, body });
    console.log("v2 response:", JSON.stringify(v2));

    token = v2.data?.data?.token || v2.data?.token || v2.data?.data?.tracker?.token;

    // ── Fall back to v1 ───────────────────────────────────────────────
    if (!token) {
      const v1 = await safeFetch(`${SAFEPAY_BASE}/order/v1/init`, { method: "POST", headers, body });
      console.log("v1 response:", JSON.stringify(v1));

      token = v1.data?.data?.token || v1.data?.token;

      if (!token) {
        return NextResponse.json({
          error: "Could not get Safepay token",
          v2_response: v2.data,
          v1_response: v1.data,
        }, { status: 500 });
      }
    }

    // ── Build redirect URL ────────────────────────────────────────────
    const checkoutBase = process.env.NEXT_PUBLIC_SAFEPAY_ENV === "production"
      ? "https://getsafepay.com/checkout/pay"
      : "https://sandbox.api.getsafepay.com/checkout/pay";

    const params = new URLSearchParams();
    params.set("beacon",           token);
    params.set("merchant_api_key", process.env.NEXT_PUBLIC_SAFEPAY_KEY);
    params.set("source",           "custom");
    params.set("order_id",         order_id);
    params.set("redirect_url",     `${siteUrl}/order-confirmation`);
    params.set("cancel_url",       `${siteUrl}/checkout`);
    if (customer?.email) params.set("email",         customer.email);
    if (customer?.name)  params.set("customer_name", customer.name);
    if (customer?.phone) params.set("phone",          customer.phone);
    if (payment_method === "easypaisa") params.set("payment_method", "EASYPAISA");
    if (payment_method === "jazzcash")  params.set("payment_method", "JAZZCASH");

    return NextResponse.json({ token, redirect_url: `${checkoutBase}?${params.toString()}` });

  } catch (err) {
    console.error("Safepay exception:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}