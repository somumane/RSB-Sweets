import Layout from "src/Components/Layout";
import "src/styles/globals.css";
import {Toaster} from "react-hot-toast";
import { CartProvider } from "use-shopping-cart";
const stripekey=process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export default function App({ Component, pageProps }) {
  return (
    <CartProvider stripe={stripekey} cartMode="checkout-session" currency="INR">
    <Layout>
      <Component {...pageProps} />
      <Toaster/>
    </Layout>
    </CartProvider>
  );
}
