import MovementsTable from "@/components/MovementsTable";
import { Card, CardContent } from "@/shadcdn/ui/card";
import { FunctionComponent } from "react";

interface MovementListProps {}

const MovementList: FunctionComponent<MovementListProps> = () => {
  return <>
    <section>
      <Card className="h-[80vh] overflow-x-visible">
        <CardContent className="h-full">
          <div className="flex flex-col justify-center content-center items-center w-full pt-6 gap-4 h-full">
            <MovementsTable />
          </div>
        </CardContent>
      </Card>
    </section>
  </>
}

export default MovementList;
