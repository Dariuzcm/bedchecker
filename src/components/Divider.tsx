import { FunctionComponent, HTMLAttributes } from "react";

interface DividerProps {}

const Divider: FunctionComponent<
  HTMLAttributes<HTMLHRElement> & DividerProps
> = () => {
  return <hr className="text-gray-200 mb-4" />;
};

export default Divider;
