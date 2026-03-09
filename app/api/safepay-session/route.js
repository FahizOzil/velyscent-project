import { NextResponse } from "next/server";

const SAFEPAY_BASE =
  process.env.NEXT_PUBLIC_SAFEPAY_ENV === "production"
    ? "https://api.getsafepay.com"
    : "https://sandbox.api.getsafepay.com";

export async function POST(req) {
  try {
    const { amount, currency, order_id, customer, payment_method } = await req.json();

    // ── Step 1: Create payment session token ──────────────────────────
    const sessionRes = await fetch(`${SAFEPAY_BASE}/order/v1/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_SECRET,
      },
      body: JSON.stringify({
        merchant_api_key: process.env.NEXT_PUBLIC_SAFEPAY_KEY,
        intent:           "CYBERSOURCE",
        mode:             "payment",
        currency:         currency || "PKR",
        amount:           amount,
      }),
    });

    const sessionData = await sessionRes.json();

    if (!sessionRes.ok) {
      console.error("Safepay init error:", sessionData);
      return NextResponse.json(
        { error: sessionData?.message || sessionData?.error || "Safepay session failed" },
        { status: sessionRes.status }
      );
    }

    const token = sessionData?.data?.token;
    if (!token) {
      console.error("No token in Safepay response:", sessionData);
      return NextResponse.json(
        { error: "No token returned from Safepay" },
        { status: 500 }
      );
    }

    // ── Step 2: Build Safepay hosted checkout URL ─────────────────────
    // sandbox checkout lives at a different URL than the API base
    const checkoutBase =
      process.env.NEXT_PUBLIC_SAFEPAY_ENV === "production"
        ? "https://getsafepay.com/checkout/pay"
        : "https://sandbox.api.getsafepay.com/checkout/pay";

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const params = new URLSearchParams();
    // ✅ correct param is "beacon" not "token"
    params.set("beacon",           token);
    params.set("merchant_api_key", process.env.NEXT_PUBLIC_SAFEPAY_KEY);
    params.set("source",           "custom");
    // ✅ correct param is "order_id" not "orderId"
    params.set("order_id",         order_id);
    params.set("redirect_url",     `${siteUrl}/order-confirmation`);
    params.set("cancel_url",       `${siteUrl}/checkout`);

    // Customer info
    if (customer?.email) params.set("email",         customer.email);
    if (customer?.name)  params.set("customer_name", customer.name);
    if (customer?.phone) params.set("phone",          customer.phone);

    // ✅ Payment method
    if (payment_method === "easypaisa") params.set("payment_method", "EASYPAISA");
    if (payment_method === "jazzcash")  params.set("payment_method", "JAZZCASH");
    // card → no override, Safepay shows card UI by default

    const redirect_url = `${checkoutBase}?${params.toString()}`;

    console.log("Safepay redirect URL:", redirect_url);

    return NextResponse.json({ token, redirect_url });

  } catch (err) {
    console.error("Safepay route exception:", err?.message);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}