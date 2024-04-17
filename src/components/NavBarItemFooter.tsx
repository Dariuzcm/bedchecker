import { Link, Tooltip } from "@nextui-org/react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

export interface NavBarItemFooterType {
  url: string;
  tooltip: string;
  children: React.ReactNode;
  isDisabled?: boolean;
}
export function NavBarItemFooter({
  url,
  tooltip,
  children,
  isDisabled,
}: NavBarItemFooterType) {
  const location = useLocation();
  
  const linkRef = useRef(null)


  return (
    <Tooltip content={tooltip}>
      <Link
        ref={linkRef}
        className={`flex flex-col rounded-full p-2 transition-all ease-out duration-500 text-${location.pathname === url ? 'primary scale-125': 'black'}`}
        isDisabled={isDisabled}
        href={url}
      >
        {children}
      </Link>
    </Tooltip>
  );
}
