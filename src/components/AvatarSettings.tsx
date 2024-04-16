import {
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

export function AvatarSettings() {
  const { user, restartUser } = useStore((state) => ({
    user: state.user,
    restartUser: state.restartUser,
  }));

  const handleOnLogout = () => {
    logoutAction(user.token!).then(() => {
      restartUser();
    });
  };

  return (
    <>
      {user.token && (
        <Dropdown>
          <DropdownTrigger>
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
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">
              <div className="flex text-slate-800 justify-between px-5">
                <SettingsIcon className="size-6" />
                <span>Configuración</span>
              </div>
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
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
