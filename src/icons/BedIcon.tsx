import { SVGProps } from "react";

export function BedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-bed"
      width="72"
      height="72"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M22 17v-3h-20" />
      <path d="M2 8v9" />
      <path d="M12 14h10v-2a3 3 0 0 0 -3 -3h-7v5z" />
    </svg>
  );
}
