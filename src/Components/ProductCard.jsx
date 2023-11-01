import Link from "next/link";
import Rating from "./Rating";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addItem } = useShoppingCart();
 
  function addtoCart(event) {
    event.preventDefault();
    const id = toast.loading("added one item...");
    addItem(product);
    toast.success(`${product.name} added`, { id });
  }
  
  return (
    <Link
      href={`/products/${product.id}`}
      className=" border-2 rounded-md  group
     overflow-hidden"
    >
      <div className="relative w-full h-64">
        <img src={product.image} alt={product.name} className="h-64 w-full" />
      </div>
      <div className="p-6 bg-white">
        <p className=" font-semibold text-lg">
          {product.name}
          <span className="text-sm p-1 text-gray-600">
            ({product.quantity})
          </span>
        </p>
        <Rating />
        <div className="mt-4 flex items-center justify-between space-x-2">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-lg font-semibold">
              {formatCurrencyString({
                currency: product.currency,
                value: product.price,
              })}{" "}
            </p>
          </div>
          <button
            onClick={addtoCart}
            className="border rounded-lg  py-1 px-4 hover:bg-orange-700 hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
