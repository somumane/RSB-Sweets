import Link from "next/link"
import Logo from "./Logo"
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useShoppingCart } from "use-shopping-cart"

const Header = () => {
  const {cartCount}=useShoppingCart()
  return (
    <header className=" sticky top-0 bg-white z-10 shadow">
     <div className=" container mx-auto p-6 flex  justify-between">
     <Logo/>
     <Link href='/cart' className='flex items-center space-x-1 text-gray-900 hover:text-gray-700'>
     <div className=" relative"><ShoppingCartIcon className="w-7 h-7 flex-shrink-0"/>
     <p className="w-[17px] h-[17px] flex justify-center items-center my-[-34px] mx-[15px] rounded-full text-[10px] bg-red-600 text-white font-bold">{cartCount}</p>
     </div>
     </Link>
     </div>
    </header>
  )
}

export default Header
