import { NextResponse } from "next/server";

const isSandbox = process.env.NEXT_PUBLIC_SAFEPAY_ENV !== "production";
const SAFEPAY_BASE = isSandbox
  ? "https://sandbox.api.getsafepay.com"
  : "https://api.getsafepay.com";

export async function POST(req) {
  try {
    const { amount, currency, order_id, customer, payment_method } = await req.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${SAFEPAY_BASE}/order/v1/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    const data = JSON.parse(raw);
    const token = data?.data?.tracker?.token;

    if (!token) {
      return NextResponse.json({ error: "No token", safepay_response: data }, { status: 500 });
    }

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

    return NextResponse.json({ token, redirect_url: `https://sandbox.api.getsafepay.com/checkout/pay?${params.toString()}` });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}