import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useStore } from "../store/store";
import { SettingsIcon } from "../icons/SettingsIcon";
import { Logout } from "../icons/Logout";
import { logoutAction } from "../api/apiHandler";
import { Link } from "react-router-dom";

export function AvatarSettings() {
  const { user, restartUser } = useStore((state) => ({
    user: state.user,
    restartUser: state.restartUser,
  }));
  
  const handleOnLogout = () => {
    logoutAction(user.token!).then(() => {
      restartUser();
      window.location.replace('/login')
    });
  };

  return (
    <>
      {user.token && (
        <Dropdown>
          <DropdownTrigger>
            <Avatar src={user.photo || "/avatarEmpty.svg"} />
          </DropdownTrigger>
          <DropdownMenu
            className="flex flex-col gap-3"
            aria-label="Config options"
            disabledKeys={!user.verificated ? ['config']: undefined}
          >
            <DropdownItem key={"avatar"} closeOnSelect={false}>
              <User
                classNames={{
                  name: "text-ellipsis overflow-hidden max-w-32",
                }}
                name={user.name}
                description={user.email}
                avatarProps={{
                  src: user.photo || "/avatarEmpty.svg",
                }}
              />
            </DropdownItem>
            <DropdownItem key="config">
              <Link to={'/profile'}>
                <div className="flex text-slate-800 justify-between px-5">
                  <SettingsIcon className="size-6" />
                  <span>Configuración</span>
                </div>
              </Link>
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="text-crayola"
              onClick={handleOnLogout}
            >
              <div className="flex justify-center gap-3 px-7">
                <Logout className="size-6" />
                <span>Logout</span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
