import { getPhoto } from "@/api/userServiceHandler";
import { Avatar, AvatarImage } from "@/shadcdn/ui/avatar";
import { FunctionComponent } from "react";

interface UserProps {
  classNames: {
    name: string
  }
  name: string;
  description: string;
  src: string  
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const User: FunctionComponent<UserProps> = (props) => {
  const { classNames } = props
  return <div className="flex flex-col justify-center items-center px-5 pb-3 gap-1">
    <Avatar className="size-14">
      <AvatarImage src={getPhoto(props.src) || "/avatarEmpty.svg"} />
    </Avatar>
    <h1 className={`font-semibold ${classNames.name}`}>{props.name}</h1>
    <h2 className="text-white-300">{props.description}</h2>
  </div>;
};

export default User;
