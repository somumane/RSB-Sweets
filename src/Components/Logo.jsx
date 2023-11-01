import Link from "next/link"

const Logo = () => {
  return (
    <Link href='/' className="flex items-center space-x-2">
    <img src='https://www.logolynx.com/images/logolynx/9b/9bdea2cd3d05d1bf116e910bf84855ea.jpeg'
     alt='logo' width={50} height={50} className=" rounded-full" />
     <span className="sm:inline-block font-extrabold text-3xl text-orange-900">
     Sweets
     </span>
    </Link>
  )
}

export default Logo
