import { useRef, useState } from "react";
import { logoutAction } from "../api/userServiceHandler";
import { useStore } from "../store/store";
import { Link } from "react-router-dom";
import { MenuIcon } from "@/icons/MenuIcon";
import { Button } from "@/shadcdn/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcdn/ui/accordion";
import { CloseIcon } from "@/icons/Close";
import { AvatarSettings } from "./AvatarSettings";
import "./styles/dialog.css";

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
          <Accordion
            key={`${item.name}-${index}`}
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value={`accordion-${item.name}-${index}`}>
              <AccordionTrigger>{item.name}</AccordionTrigger>
              <AccordionContent>{menuChildren(item.childs)}</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      } else
        childrens.push(
          <li id={`li-${item.name}-${index}`} key={`li-${item.name}-${index}`}>
            <Link to={item.url!} onClick={handleOnClickMenu}>
              {item.name}
            </Link>
          </li>
        );
    }
    return childrens;
  };

  function handleOnClickMenu(): void {
    const { current } = dialogRef;
    if (current) {
      setTimeout(() => {
        if (!isMenuOpen) {
          current.classList.remove("dialog-inactive");
          current.classList.add("dialog-active");
        } else {
          current.classList.remove("dialog-active");
          current.classList.add("dialog-inactive");
        }
      }, 200);
      if (isMenuOpen) {
        setTimeout(() => {
          setIsMenuOpen(!isMenuOpen)
        }, 400)
      } else {
        setIsMenuOpen(!isMenuOpen)
      }
    }
  }

  const dialogRef = useRef<HTMLDivElement>(null);

  return (<>
    <header>
      <nav className={`grid grid-flow-col h-14 w-full bg-white z-[9999]`}>
        <div data-open={isMenuOpen} className={`flex justify-between items-center`}>
          <Button
            disabled={!user.token}
            variant={"ghost"}
            id="menu-icon"
            onClick={handleOnClickMenu}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </Button>
        </div>
        <h1 className="text-center text-2xl font-semibold my-auto">
          BedChecker
        </h1>
        <div className="flex items-center justify-end pr-3">
          <AvatarSettings />
        </div>
      </nav>

    </header>
      { <div
        ref={dialogRef}
        data-open={isMenuOpen}
        id="menu-dialog"
        className="bg-white w-full h-full fixed z-[99999] dialog"
      >
        <ul
          id="nav-min-buttons"
          className="flex flex-col justify-between gap-10 text-2xl font-semibold h-16 p-10"
        >
          {menuChildren(menuItems)}
          <li>
            <Button
              onClick={handleOnLogout}
              className="w-full p-3 font-semibold mt-10"
              size={"lg"}
              variant={"destructive"}
            >
              Log out
            </Button>
          </li>
        </ul>
      </div>
    }
    </>
  );
}
