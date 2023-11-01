import Link from "next/link";
import {
  MinusSmallIcon,
  PlusSmallIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useShoppingCart } from "use-shopping-cart";
const CartProduct = ({ product }) => {
    const {setItemQuantity,removeItem}=useShoppingCart()
  return (
    <div
      className="flex justify-between space-x-4 hover:shadow-lg 
    hover:border-opacity-50 border border-opacity-0 rounded-md p-4
    bg-white "
    >
      <Link
        href={`/products/${product.id}`}
        className=" flex items-center space-x-4 group"
      >
        <div className="realtive w-15 h-15 md:w-20 md:h-20 group-hover:scale-110 transition-transform">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full"
          />
        </div>
        <p className="font-semibold  text-sm md:text-lg group-hover:transition-transform p-1">
          {product.name}
        </p>
      </Link>
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          <button
            disabled={product.quantity <= 1}
            onClick={()=>setItemQuantity(product.id,product.quantity-1)}
            className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500"
          >
            <MinusSmallIcon className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0" />
          </button>
          <p className="font-semibold text-sm md:text-lg">{product.quantity}</p>
          <button onClick={()=>setItemQuantity(product.id,product.quantity+1)} className="p-1 rounded-md hover:bg-green-100 hover:text-green-500">
            <PlusSmallIcon className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0" />
          </button>
          <p className=" font-semibold text-sm md:text-xl ml-16">
            <XMarkIcon className=" hidden w-4 h-4 text-gray-50 sm:inline-block" />
            {product.formattedPrice}
          </p>
          <button onClick={()=>removeItem(product.id)} className="ml-4 hover:text-red-500">
            <XCircleIcon className="w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
