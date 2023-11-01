import { CheckCircleIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import useSWR from "swr"
import { useShoppingCart } from "use-shopping-cart"
export default function SuccessPage(){
    const{clearCart}=useShoppingCart()
    const router=useRouter()
    const sessionId=router.query.session_id;
    const {data,error}=useSWR(()=>sessionId ?`/api/${sessionId}`:null,url=>axios.get(url).then(res=>res.data),
    {onSuccess(){
       clearCart()
        },
    }
    
    )
    const email=data?.customer_details?.email


    return(
        <div className="container xl:max-w-scrren-xl mx-auto py-12 px-6 text-center">
        {error?(
            <div className=" p-2 rounded-md bg-rose-50 text-red-500 max-w-md mx-auto">
            <p className="text-lg ">Sorry, something went wrong!</p>
            </div>
            ): !data?(
                <div className="p-2 rounded-md text-gray-500 max-w-md mx-auto">
                <p className="text-lg">Loading... </p>
                </div>
                ):(
                    <div className="py-4 px-8 space-md max-w-lg mx-auto">
                    <CheckCircleIcon className="w-24 h-24 mx-auto flex-shrink-0 text-lime-600"/>
                    <h2 className="text-4xl font-semibold flex flex-col items-center spacex-1">
                    Thanks for your order!
                    </h2>
                    <p className="text-lg">
                    Check your email ({email}) for your orders. 
                    </p>
                    </div>)

        }
        
        </div>
    )
}