import {CheckIcon,MinusSmallIcon,PlusSmallIcon} from "@heroicons/react/24/solid";
import { useState } from "react";
import toast from "react-hot-toast";
import Stripe from "stripe";
import axios from "axios";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import Link from "next/link";
const stripe = Stripe(process.env.STRIPE_SECRETE_KEY);

export default function ProductPage({ product }) {
    const [count,setCount]=useState(1);
    const {addItem}=useShoppingCart()
    
  function addtoCart(event) {
    event.preventDefault();
    const id = toast.loading(`Adding ${count} item${count >1 ?"s":""}`);
    addItem(product,{count});
    toast.success(`${count} ${product.name} added`, { id });
  }
  
  return (
    <div className=" container lg:max-w-screen-lg mx-auto py-12 px-6">
      <div
        className="flex flex-col md:flex-row justify-between items-center
     space-y-8 md:space-x-12"
      >
        <div className=" relative w-72 h-72 sm:w-96 sm:h-96 bg-[#f7f7f7] ">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full"
          />
        </div>
        <div
          className="w-full flex-1 max-w-sm border border-opacity-50 
     rounded-md shadow-lg p-6 bg-white items-center justify-center"
        >
          <h1 className=" text-3xl font-semibold">{product.name}</h1>
          <p className="pt-2 flex items-center space-x-2 ">
            <CheckIcon className="text-lime-400 w-5 h-5 " />
            <span className="font-semibold">In stock</span>
          </p>

          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">Price:</p>
            <p className="text-xl font-semibold">
              {formatCurrencyString({
                value: product.price,
                currency: product.currency,
              })}
            </p>
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">
              Quantity:{" "}
              <span className="text-gray-800">{product.quantity}</span>
            </p>
            <div className="mt-1 flex items-center space-x-3">
              <button disabled={count <=1} onClick={()=>setCount(count-1)} className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500">
                <MinusSmallIcon className="w-6 h-6 flex-shrink-0" />
              </button>
              <p className="font-semibold text-xl">{count}</p>
              <button onClick={()=>setCount(count+1)}  className="p-1 rounded-md hover:bg-green-100 hover:text-green-500">
                <PlusSmallIcon className="w-6 h-6 flex-shrink-0" />
              </button>
            </div>
          </div>
          <div className="flex justify-between p-2">
            <button onClick={addtoCart}
              className="  mt-4 border-orange-500  py-2 px-6 bg-orange-600 rounded-2xl
      hover:bg-orange-700 hover:border-orange-600 text-white focus:ring-opacity-50 focus:ring-orange-500  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to cart
            </button>
         <button onClick={addtoCart}
              className="  mt-4 border-lime-500  py-2 px-6 bg-lime-600 rounded-2xl
             hover:bg-lime-700 hover:border-lime-600 text-white focus:ring-opacity-50 focus:ring-lime-500  disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <Link href='/cart'> Buy Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export async function getStaticPaths() {
  const data = await stripe.products.list();

  const paths = data.data.map((product) => ({
    params: { id: product.id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const data = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = data.data.map((item) => {
    const price = item.default_price;
    return {
      currency: price.currency,
      id: item.id,
      name: item.name,
      price: price.unit_amount,
      quantity: item.unit_label,
      image: item.images[0],
    };
  });
  const product = products.find((product) => product.id === params.id);
  return {
    props: {
      product,
    },
    revalidate: 60 * 60,
  };
}
