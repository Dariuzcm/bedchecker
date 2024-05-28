import {
  Accordion,
  AccordionItem,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import { AvatarSettings } from "./AvatarSettings";
import { logoutAction } from "../api/apiHandler";
import { useStore } from "../store/store";
import { MenuIcon } from "../icons/MenuIcon";
import { CloseIcon } from "../icons/Close";


type NavItemType = {
  name: string;
  url?: string;
  childs?: NavItemType[];
};

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { restartUser, user } = useStore((state) => ({
    restartUser: state.restartUser,
    user: state.user,
  }));

  const menuItems: NavItemType[] = [
    {
      name: "Inicio",
      url: "",
      // childs: [
      //   {
      //     name: "Dashboard",
      //     url: "",
      //     childs: [
      //       {
      //         name: "Hello",
      //         url: ""
      //       }
      //     ]
      //   },
      // ],
    },
    { name: "Perfil", url: "/profile" },
    { name: "Mis Movimientos", url: "/movements" },
    { name: "Crear Movimiento", url: "/movements/create" },
  ];

  const handleOnLogout = () => {
    logoutAction(user.token!).then(() => {
      restartUser();
    });
  };

  const menuChildren = (items: NavItemType[]) => {
    const childrens: React.ReactNode[] = [];
    for (const item of items) {
      const index = items.indexOf(item);
      if (item.childs !== undefined) {
        childrens.push(
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Accordion
              itemClasses={{
                trigger: "bg-transparent border-0",
                content: "bg-transparent",
                heading: "bg-transparent text-primary",
                title: "text-[18px] text-primary font-normal",
                base: "border-0",
              }}
              as={"div"}
            >
              <AccordionItem title={item.name}>
                <div className="pl-6">{menuChildren(item.childs)}</div>
              </AccordionItem>
            </Accordion>
          </NavbarMenuItem>
        );
      } else
        childrens.push(
          <NavbarMenuItem key={`${item.name}-${index}`} className="p-2">
            <Link href={item.url}>{item.name}</Link>
          </NavbarMenuItem>
        );
    }
    return childrens;
  };

  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="transition-all ease-in"
      >
        <NavbarContent>
          {(user.token && user.verificated) && (
            <NavbarMenuToggle
              icon={(isOpen) => (isOpen ? <CloseIcon /> : <MenuIcon />)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className={`bg-white p-0 w-12`}
            />
          )}
          <NavbarBrand className="justify-center transition-all ease-linear">
            <h1 className="font-bold text-inherit text-xl">BedChecker</h1>
          </NavbarBrand>
          <NavbarItem>
            <AvatarSettings />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuChildren(menuItems)}
          <NavbarMenuItem>
            <Button
              onClick={handleOnLogout}
              className="w-full p-3 bg-crayola text-white text-lg font-semibold mt-10"
            >
              Log out
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
}
