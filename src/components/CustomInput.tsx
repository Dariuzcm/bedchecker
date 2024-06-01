import { Input, InputProps } from "@/shadcdn/ui/input";
import { Label } from "@/shadcdn/ui/label";
import { FunctionComponent } from "react";

interface CustomUmputProps {
  label?: string
}

const CustomUmput: FunctionComponent<CustomUmputProps & InputProps> = (props) => {
  const { label } = props
  return (
    <div className="flex flex-col w-full gap-2">
      {label && <Label htmlFor="input">{label}</ Label>}
      <Input
        id='input'
        className="border-0 hover:border-2 border-mint transition-[border-width] ease-soft-spring rounded-lg border-solid"
        {...props}
      />
    </div>
  );
} 
export default CustomUmput;
