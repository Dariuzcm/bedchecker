import { useStore } from "../store/store";
import { SettingsIcon } from "../icons/SettingsIcon";
import { Logout } from "../icons/Logout";
import { logoutAction } from "../api/userServiceHandler";
import { Link, useNavigate } from "react-router-dom";
import User from "./User";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcdn/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcdn/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

export function AvatarSettings() {
  const { user, restartUser } = useStore((state) => ({
    user: state.user,
    restartUser: state.restartUser,
  }));
  const navigation = useNavigate();
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
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={user.photo || "/avatarEmpty.svg"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white p-3 rounded-lg shadow-md border-2 border-slate-300 mt-2 z-[9999]">
            <DropdownMenuItem key={"avatar"}>
              <User
                classNames={{
                  name: "text-ellipsis overflow-hidden max-w-32",
                }}
                name={user.name}
                description={user.email}
                src={user.photo || "/avatarEmpty.svg"}
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
              className="text-danger"
              onClick={handleOnLogout}
            >
              <div className="flex justify-left gap-3 w-full px-5">
                <Logout className="size-6" />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
          {/* <DropdownMenu
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
          </DropdownMenu> */}
        </DropdownMenu>
      )}
    </>
  );
}
