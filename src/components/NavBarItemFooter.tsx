import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export interface NavBarItemFooterType {
  url: string;
  tooltip: string;
  children: React.ReactNode;
  isDisabled?: boolean;
}
export function NavBarItemFooter({
  url,
  children,
  isDisabled,
}: NavBarItemFooterType) {
  const location = useLocation();
  
  const linkRef = useRef(null)


  return (
      <Link
        ref={linkRef}
        className={`flex flex-col rounded-full p-2 transition-all ease-out duration-500 text-${location.pathname === url ? 'primary scale-125': 'black'}`}
        hidden={isDisabled}
        to={url}
      >
        {children}
      </Link>
  );
}
