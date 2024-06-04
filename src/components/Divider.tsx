import { FunctionComponent, HTMLAttributes } from "react";

interface DividerProps {}

const Divider: FunctionComponent<
  HTMLAttributes<HTMLHRElement> & DividerProps
> = (props) => {
  return <hr {...props} className={`text-gray-200 mb-4 w-full ${props.className}`} />;
};

export default Divider;
