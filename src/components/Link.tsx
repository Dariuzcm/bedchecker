import { AnchorHTMLAttributes } from "react";

export function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const mainClass = "text-keppel underline font-semibold text-sm";
  return <a {...props} className={mainClass + ' ' +props?.className}></a>;
}
