import { useStore } from "../store/store";
import { SettingsIcon } from "../icons/SettingsIcon";
import { Logout } from "../icons/Logout";
import { logoutAction } from "../api/apiHandler";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import User from "./User";

export function AvatarSettings() {
  const { user, restartUser } = useStore((state) => ({
    user: state.user,
    restartUser: state.restartUser,
  }));
  const navigation = useNavigate()
  const handleOnLogout = () => {
    logoutAction(user.token!)
      .then(() => {
        restartUser();
        navigation("/login");
      })
      .catch(() => {
        restartUser();
        navigation("/login");
      });
  };

  return (
    <>
      {user.token && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
            <AvatarImage src={user.photo || "/avatarEmpty.svg"} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenu
            aria-label="Config options"
          >
            <DropdownMenuItem key={"avatar"}>
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
            </DropdownMenuItem>
            <DropdownMenuItem key="config">
              <Link to={"/profile"}>
                <div className="flex text-slate-800 justify-left gap-3 w-full px-5">
                  <SettingsIcon className="size-6" />
                  <span>Configuración</span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              key="logout"
              className="text-crayola"
              onClick={handleOnLogout}
            >
              <div className="flex justify-left gap-3 w-full px-5">
                <Logout className="size-6" />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenu>
      )}
    </>
  );
}
