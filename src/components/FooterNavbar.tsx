import { Link } from "@nextui-org/react";

export function FooterNavBar() {
  
  return(<>
    <div className="w-full bg-white h-16 sticky bottom-0">
      <ul className="flex justify-between p-3 items-center h-full">
        <li><Link href="/login">profile</Link></li>
        <li>house</li>
        <li>user Reg</li>
        <li>libreta</li>
        <li>logout</li>
      </ul>
    </div>
  </>)
}