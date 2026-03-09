import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, currency, order_id, customer, payment_method } = await req.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create session
    const res = await fetch("https://sandbox.api.getsafepay.com/order/v1/init", {
      method: "POST",
      headers: {
        "Content-Type":           "application/json",
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

    const data = await res.json();
    const token = data?.data?.token;

    if (!token) {
      return NextResponse.json({ error: "No token", data }, { status: 500 });
    }

    // Build the Safepay checkout URL exactly as their docs show
    const url = new URL("https://sandbox.api.getsafepay.com/checkout/pay");
    url.searchParams.append("env",             "sandbox");
    url.searchParams.append("beacon",          token);
    url.searchParams.append("order_id",        order_id);
    url.searchParams.append("source",          "custom");
    url.searchParams.append("redirect_url",    `${siteUrl}/order-confirmation`);
    url.searchParams.append("cancel_url",      `${siteUrl}/checkout`);
    url.searchParams.append("phone",           customer?.phone  || "");
    url.searchParams.append("email",           customer?.email  || "");
    url.searchParams.append("full_name",       customer?.name   || "");

    if (payment_method === "easypaisa") url.searchParams.append("payment_method", "EASYPAISA");
    if (payment_method === "jazzcash")  url.searchParams.append("payment_method", "JAZZCASH");

    return NextResponse.json({ token, redirect_url: url.toString() });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}