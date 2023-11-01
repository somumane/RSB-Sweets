import Stripe from "stripe";
import ProductCard from "src/Components/ProductCard";
export const stripe=Stripe(process.env.STRIPE_SECRETE_KEY);

export default function Home({products}) {
  return (
   <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
   <div className=" grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">{
    products.map(product=>(<ProductCard key={product.id} product={product}/>))
   }
   </div></div>
  )
}


// data fetching in strip using bellow code
export async function getStaticProps(){
  const data=await stripe.products.list({
    expand:["data.default_price"],
    limit:30,
  });
 const products=data.data.map(item=>{
  const price=item.default_price
  return{
    currency:price.currency,
    id:item.id,
    name:item.name,
    price:price.unit_amount,
    quantity:item.unit_label,
    image:item.images[0],
  }
 })
  return{props:{products}}
}