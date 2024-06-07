import GraphComponent from "../components/GraphComponent";
import LastMovement from "../components/LastMovement";
import DashboardButtons from "../components/DashboardButtons";
import { Card, CardContent } from "@/shadcdn/ui/card";

export function HomePage() {
  return (
    <>
      <section>
        <Card className="h-auto overflow-x-visible">
          <CardContent>
            <div className="flex flex-col px-0.5 py-2 gap-10">
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
