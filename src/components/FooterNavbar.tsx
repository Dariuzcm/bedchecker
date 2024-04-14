import { useEffect } from "react";
import { HomeIcon } from "../icons/HomeIcon";
import NotebookIcon from "../icons/NotebookIcon";
import { NavBarItemFooter, NavBarItemFooterType } from "./NavBarItemFooter";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";

export function FooterNavBar() {
  const { user } = useStore(({ user }) => ({ user }));

  const navigation = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigation("/login");
    }
  }, [user]);

  useEffect(() => {
    if (!user.token) {
      navigation("/home");
    }
  }, []);

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
  ];
  return (
    <>
      <div className="w-full bg-white bottom-4 left-0 right-0 h-10 fixed">
        <ul className="flex justify-between p-3 items-center">
          {footBarItems.map((item, index) => (
            <li className="h-full" key={`footbar-${index}`}>
              <NavBarItemFooter {...item} />{" "}
            </li>
          ))}
          <li>user Reg</li>
          <li>libreta</li>
          <li>logout</li>
        </ul>
      </div>
    </>
  );
}
