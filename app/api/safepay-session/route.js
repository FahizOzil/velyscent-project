import { NextResponse } from "next/server";

const BASE = "https://sandbox.api.getsafepay.com";

export async function POST(req) {
  try {
    const { amount, currency, order_id, customer, payment_method } = await req.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // ── Step 1: Create session ────────────────────────────────────────
    // Confirmed working format from debug: client in body + secret in header
    const res = await fetch(`${BASE}/order/v1/init`, {
      method: "POST",
      headers: {
        "Content-Type":          "application/json",
        "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_SECRET,
      },
      body: JSON.stringify({
        client:      process.env.NEXT_PUBLIC_SAFEPAY_KEY,
        intent:      "CYBERSOURCE",
        mode:        "payment",
        currency:    currency || "PKR",
        amount:      amount,
        environment: "sandbox",
      }),
    });

    const raw = await res.text();
    let data;
    try { data = JSON.parse(raw); }
    catch {
      return NextResponse.json({ error: "Safepay returned non-JSON", raw }, { status: 500 });
    }

    // Confirmed token path from debug response: data.token (not data.tracker.token)
    const token = data?.data?.token;

    if (!token) {
      return NextResponse.json(
        { error: "No token from Safepay", safepay_response: data },
        { status: 500 }
      );
    }

    // ── Step 2: Build checkout URL ────────────────────────────────────
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

    const redirect_url = `${BASE}/checkout/pay?${params.toString()}`;

    return NextResponse.json({ token, redirect_url });

  } catch (err) {
    console.error("Safepay error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}