import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, currency, order_id, customer, payment_method } = await req.json();

    const isSandbox = process.env.NEXT_PUBLIC_SAFEPAY_ENV !== "production";
    const SAFEPAY_BASE = isSandbox
      ? "https://sandbox.api.getsafepay.com"
      : "https://api.getsafepay.com";

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // ── Step 1: Create tracked payment session (Payments 2.0) ─────────
    const sessionRes = await fetch(`${SAFEPAY_BASE}/client/payments/v2/session/`, {
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
        amount:           amount,        // in paisa (250 PKR = 25000)
      }),
    });

    const sessionData = await sessionRes.json();
    console.log("Safepay session response:", JSON.stringify(sessionData));

    // Try Payments 2.0 token path first, fall back to v1 path
    const token =
      sessionData?.data?.token ||
      sessionData?.token ||
      sessionData?.data?.tracker?.token ||
      null;

    if (!sessionRes.ok || !token) {
      // ── Fallback: try v1 endpoint ─────────────────────────────────
      console.log("Trying v1 endpoint fallback...");
      const v1Res = await fetch(`${SAFEPAY_BASE}/order/v1/init`, {
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

      const v1Data = await v1Res.json();
      console.log("Safepay v1 response:", JSON.stringify(v1Data));

      const v1Token = v1Data?.data?.token || v1Data?.token;

      if (!v1Res.ok || !v1Token) {
        return NextResponse.json(
          {
            error: "Safepay session failed",
            safepay_error: v1Data,
            session_error: sessionData,
          },
          { status: 500 }
        );
      }

      // Build URL with v1 token
      return buildRedirect(v1Token, order_id, customer, payment_method, siteUrl, isSandbox);
    }

    return buildRedirect(token, order_id, customer, payment_method, siteUrl, isSandbox);

  } catch (err) {
    console.error("Safepay route exception:", err?.message);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// ── Build Safepay redirect URL ────────────────────────────────────────
function buildRedirect(token, order_id, customer, payment_method, siteUrl, isSandbox) {
  const checkoutBase = isSandbox
    ? "https://sandbox.api.getsafepay.com/checkout/pay"
    : "https://getsafepay.com/checkout/pay";

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

  const redirect_url = `${checkoutBase}?${params.toString()}`;
  console.log("Safepay redirect:", redirect_url);

  return NextResponse.json({ token, redirect_url });
}