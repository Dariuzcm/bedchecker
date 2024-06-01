/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useStore } from "../store/store";
//import { useNavigate } from "react-router-dom";
import GraphComponent from "../components/GraphComponent";
import LastMovement from "../components/LastMovement";
import DashboardButtons from "../components/DashboardButtons";
import { Card, CardContent } from "@/shadcdn/ui/card";

export function HomePage() {
  const { user } = useStore(({ user }) => ({ user }));
  //const navigation = useNavigate();

  useEffect(() => {
    if (!user.token) {
      //navigation("/login");
    }
  }, []);
  return (
    <>
      <section>
        <Card className="h-[80vh] overflow-x-visible">
          <CardContent>
            <div className="flex flex-col gap-3 px-0.5 py-2">
              <GraphComponent />
              <LastMovement />
              <DashboardButtons />
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
