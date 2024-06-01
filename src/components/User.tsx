import { FunctionComponent } from "react";

interface UserProps {
  classNames: {
    name: string
  }
  name: string;
  description: string;
  avatarProps: {
    src: string
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const User: FunctionComponent<UserProps> = (_props) => {
  return <></>;
};

export default User;
