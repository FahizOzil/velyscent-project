import OrderConfirmationPage from "@/app/Components/OrderConfirmationPage";

export default function OrderConfirmation() {
  return <OrderConfirmationPage />;
}
// ```

// **3. Move Safepay route to `app/api/safepay-session/route.js`:**
// ```
// app/
// └── api/
//     ├── create-order/
//     │   └── route.js   ← already done
//     └── safepay-session/
//         └── route.js   ← paste safepay-session-route.js content here