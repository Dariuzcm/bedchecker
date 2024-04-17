import { Input, InputProps } from "@nextui-org/react";

export function CustomInput(props: InputProps) {
  return (
    <Input
      className="border-0 hover:border-2 border-mint transition-[border-width] ease-soft-spring rounded-lg border-solid"
      {...props}
    />
  );
}
