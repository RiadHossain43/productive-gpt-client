import { loadStripe } from "@stripe/stripe-js";
/**
 * this hook not recomended to use outside of this store in anny component directly.
 * the store exposes utility function based on this hook to maintain ui logics.
 */
export default function usePayment() {
  async function redirectToCheckout({ userEmail }) {
    try {
      const item = {
        price: process.env.REACT_APP_STRIPE_ALICE_PRICE,
        quantity: 1,
      };
      const checkoutOptions = {
        lineItems: [item],
        mode: "subscription",
        successUrl: window.location.origin + "/payments/success",
        cancelUrl: window.location.origin + "/payments/subscription-history",
        customerEmail: userEmail,
      };
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      let { error } = await stripe.redirectToCheckout(checkoutOptions);
    } catch (err) {
      console.log(err);
    }
  }
  return {
    redirectToCheckout,
  };
}
