import { useEffect } from "react";
import { HomeIcon } from "../icons/HomeIcon";
import NotebookIcon from "../icons/NotebookIcon";
import { NavBarItemFooter, NavBarItemFooterType } from "./NavBarItemFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import { BedIcon } from "../icons/BedIcon";

export function FooterNavBar() {
  const { user } = useStore(({ user }) => ({ user }));

  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user.token && ["register"].includes(location.pathname)) {
      navigation("/login");
    }
    else if (!user.verificated && user.token) navigation("/validate");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const footBarItems: NavBarItemFooterType[] = [
    {
      url: "/list",
      tooltip: "Mis viajes",
      children: <NotebookIcon className="size-9" />,
    },
    {
      url: "/home",
      tooltip: "Inicio",
      children: <HomeIcon className="size-9" />,
    },
    {
      url: "/bedCapture",
      tooltip: "BedCapture",
      children: <BedIcon className="size-9" />,
    },
  ];
  return (
    <footer>
      <div className="w-full bg-white bottom-5 left-0 right-0 h-10 fixed">
        <ul className="flex justify-between p-3 items-center mx-5">
          {footBarItems.map((item, index) => (
            <li className="h-full" key={`footbar-${index}`}>
              <NavBarItemFooter
                isDisabled={!user.token || !user.verificated}
                {...item}
              />{" "}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
