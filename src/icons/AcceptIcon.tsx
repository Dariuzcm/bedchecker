import { FunctionComponent, SVGProps } from "react";

const AcceptIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
        d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
        clip-rule="evenodd"
      />
    </svg>
  );
};

export default AcceptIcon;
