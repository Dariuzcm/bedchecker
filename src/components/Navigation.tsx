/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from "react";
// import { AvatarSettings } from "./AvatarSettings";
// import { logoutAction } from "../api/apiHandler";
// import { useStore } from "../store/store";
// import { MenuIcon } from "../icons/MenuIcon";
// import { CloseIcon } from "../icons/Close";
// import { Link } from "react-router-dom";
// import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";


// type NavItemType = {
//   name: string;
//   url?: string;
//   childs?: NavItemType[];
// };

export function Navigation() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { restartUser, user } = useStore((state) => ({
  //   restartUser: state.restartUser,
  //   user: state.user,
  // }));

  // const menuItems: NavItemType[] = [
  //   {
  //     name: "Inicio",
  //     url: "",
  //     // childs: [
  //     //   {
  //     //     name: "Dashboard",
  //     //     url: "",
  //     //     childs: [
  //     //       {
  //     //         name: "Hello",
  //     //         url: ""
  //     //       }
  //     //     ]
  //     //   },
  //     // ],
  //   },
  //   { name: "Perfil", url: "/profile" },
  //   { name: "Mis Movimientos", url: "/movements" },
  //   { name: "Crear Movimiento", url: "/movements/create" },
  // ];

  // const handleOnLogout = () => {
  //   logoutAction(user.token!).then(() => {
  //     restartUser();
  //   });
  // };

  // const handleClose = () => {
  //   console.log('closing')
  //   setIsMenuOpen(false)
  // }

  // const menuChildren = (items: NavItemType[]) => {
  //   const childrens: React.ReactNode[] = [];
  //   for (const item of items) {
  //     const index = items.indexOf(item);
    
  //     if (item.childs !== undefined) {
  //       childrens.push(
  //         <NavigationMenuTrigger key={`${item.name}-${index}`}>
  //           <NavigationMenuContent>
  //             <NavigationMenuLink asChild title={item.name}>
  //               <div className="pl-6">{menuChildren(item.childs)}</div>
  //             </NavigationMenuLink>
  //           </ NavigationMenuContent >
  //         </NavigationMenuTrigger>
  //       );
  //     } else
  //       childrens.push(
  //         <NavigationMenuItem key={`${item.name}-${index}`} className="p-2">
  //           <Link onClick={handleClose} to={item.url!}>{item.name}</Link>
  //         </NavigationMenuItem>
  //       );
  //   }
  //   return childrens;
  // };

  return (
    <header>
    </header>
  );
}
