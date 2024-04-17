import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import { AvatarSettings } from "./AvatarSettings";
import { logoutAction } from "../api/apiHandler";
import { useStore } from "../store/store";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { restartUser, user } = useStore(state => ({ restartUser: state.restartUser, user: state.user}))

  const menuItems = [
    { name: "Inicio", url: "" },
    { name: "Perfil", url: "" },
    { name: "Mis Registros", url: "" },
    { name: "Registrar viaje", url: "" },
  ];

  const handleOnLogout = () => {
    logoutAction(user.token!)
      .then(() => {
        restartUser()
      })
  }
  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="transition-all ease-in">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={`bg-white ${!user.token && 'invisible'}`}
          />
          <NavbarBrand className="justify-center transition-all ease-linear">
            <h1 className="font-bold text-inherit text-xl">BedChecker</h1>
          </NavbarBrand>
          <NavbarItem>
            <AvatarSettings />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              className="hover:primary/60 transition-colors py-2"
            >
              <Link isDisabled={!user.token} color={"foreground"} className="w-full" href={item.url} size="lg">
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Button onClick={handleOnLogout} className="w-full p-3 bg-crayola text-white text-lg font-semibold mt-10">Log out</Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
}
