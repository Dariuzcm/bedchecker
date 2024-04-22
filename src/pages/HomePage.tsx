import { useEffect } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import GraphComponent from "../components/GraphComponent";
import LastMovement from "../components/LastMovement";
import DashboardButtons from "../components/DashboardButtons";

export function HomePage() {
  const { user } = useStore(({ user }) => ({ user }));
  const navigation = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigation("/login");
    }
  }, []);
  return (
    <>
      <section>
        <Card className="h-[80vh] overflow-x-visible">
          <CardBody>
            <div className="flex flex-col gap-3 px-0.5 py-2">
              <GraphComponent />
              <LastMovement />
              <DashboardButtons />
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
