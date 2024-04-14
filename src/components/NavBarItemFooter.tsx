import { Link, Tooltip } from "@nextui-org/react";

export interface NavBarItemFooterType {
  url: string,
  tooltip: string
  children: React.ReactNode
}
export function NavBarItemFooter({ url, tooltip, children }: NavBarItemFooterType) {
  return (
    <Tooltip content={tooltip}>
      <Link href={url} className="flex flex-col text-black">
        {children}
      </Link>
    </Tooltip>
  );
}
