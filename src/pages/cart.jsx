import Link from "next/link";
import { useState } from "react";
import CartProduct from "src/Components/CartProduct";
import { useShoppingCart } from "use-shopping-cart";
import axios from "axios";

const Cart = () => {
  const {
    cartCount,
    clearCart,
    formattedTotalPrice,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();
  const [processing, setprocessing] = useState(false);

  const onCheckOut = async () => {
    if (cartCount > 0) {
      try {
        setprocessing(true);
        const { id } = await axios.post("/api/route", cartDetails)
          .then(res => res.data);
        const result = await redirectToCheckout(id);
        if (result?.error) {
          console.log("Error in result:", error);
        }
      } catch (error) {
        console.log("ERROR:", error);
      } finally {
        setprocessing(false);
      }
    }
  };

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
      {cartCount > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold">Your shopping cart</h2>
          <p className="mt-1 text-xl">
            {cartCount} items{" "}
            <button
              onClick={() => clearCart()}
              className=" opacity-50 hover:opacity-100 text-base capitalize"
            >
              (Clear all)
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold">
            Your shopping cart is empty
          </h2>
          <p className="mt-1 text-xl">
            check out our awesome products{" "}
            <Link href="/" className="text-red-500 underline">
              here!
            </Link>
          </p>
        </div>
      )}
      {cartCount > 0 && (
        <div className="mt-12 space-y-4">
          {Object.entries(cartDetails).map(([productId, product]) => (
            <CartProduct key={productId} product={product} />
          ))}
          <div className="flex flex-col items-end border-t py-4 mt-8">
            <p className="text-xl">
              Total:<span className="font-semibold">{formattedTotalPrice}</span>
            </p>
            <button
              onClick={onCheckOut}
              disabled={processing}
              className="border rounded py-2 px-6 bg-orange-700 hover:bg-orange-600
         hover:border-orange-500 border-orange-400 focus:ring-4
          focus:ring-opacity-50 focus:ring-orange-500 text-white
           transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500
            mt-4 max-w-max
         "
            >
              {processing ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
