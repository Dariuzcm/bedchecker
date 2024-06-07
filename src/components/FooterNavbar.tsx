import { useEffect } from "react";
import { HomeIcon } from "../icons/HomeIcon";
import NotebookIcon from "../icons/NotebookIcon";
import { NavBarItemFooter, NavBarItemFooterType } from "./NavBarItemFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import { BedIcon } from "../icons/BedIcon";
import { refreshUser } from "@/api/userServiceHandler";
import { useToast } from "@/shadcdn/ui/use-toast";

export function FooterNavBar() {
  const { user, restartUser } = useStore(({ user, restartUser }) => ({ user, restartUser }));

  const { toast } = useToast()
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user.token && !["register"].includes(location.pathname)) {
      navigation("/login");
    }
    else if (!user.verificated && user.token) navigation("/validate");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    refreshUser(user).catch((error) => {
      toast({
        title: "Error: Usuario",
        description: `${error.message}`,
        variant: 'destructive'
      })
      restartUser()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const footBarItems: NavBarItemFooterType[] = [
    {
      url: "/movements",
      tooltip: "Mis viajes",
      children: <NotebookIcon className="size-9" />,
    },
    {
      url: "/home",
      tooltip: "Inicio",
      children: <HomeIcon className="size-9" />,
    },
    {
      url: "/movements/create",
      tooltip: "BedCapture",
      children: <BedIcon className="size-9" />,
    },
  ];
  return (
    <footer>
      <div className="w-full bg-white bottom-5 left-0 right-0 h-14 fixed">
        <ul className="flex justify-between p-3 items-center mx-5">
          {footBarItems.map((item, index) => (
            <li className="h-full" key={`footbar-${index}`}>
              <NavBarItemFooter
                isDisabled={!user.token || !user.verificated}
                {...item}
              />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
