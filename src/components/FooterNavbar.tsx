import { useEffect } from "react";
import { HomeIcon } from "../icons/HomeIcon";
import NotebookIcon from "../icons/NotebookIcon";
import { NavBarItemFooter, NavBarItemFooterType } from "./NavBarItemFooter";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import { BedIcon } from "../icons/BedIcon";

export function FooterNavBar() {
  const { user } = useStore(({ user }) => ({ user }));

  const navigation = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigation("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  const footBarItems: NavBarItemFooterType[] = [
    {
      url: "/home",
      tooltip: "Inicio",
      children: <HomeIcon className="size-9" />,
    },
    {
      url: "/list",
      tooltip: "Mis viajes",
      children: <NotebookIcon className="size-9" />,
    },
    {
      url: "/bedCapture",
      tooltip: "BedCapture",
      children: <BedIcon className="size-9" />,
    },
  ];
  return (
    <>
      <div className="w-full bg-white bottom-4 left-0 right-0 h-10 fixed">
        <ul className="flex justify-between p-3 items-center mx-5">
          {footBarItems.map((item, index) => (
            <li className="h-full" key={`footbar-${index}`}>
              <NavBarItemFooter {...item} />{" "}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
