import { FunctionComponent } from "react";
import { Link, LinkProps } from "react-router-dom";

interface CustomLinkProps {}

const CustomLink: FunctionComponent<CustomLinkProps & LinkProps> = (props) => {
  const mainClass = "text-secondary underline font-semibold text-sm";

  return (
    <Link {...props} className={mainClass + " " + props?.className}></Link>
  );
};

export default CustomLink;
