import CreateMovement from "@/components/CreateMovement";
import { useStore } from "@/store/store";
import { Status } from "@/types/movementTypes";
import { FunctionComponent } from "react";
import OnTransit from "../components/OnTransit";
import OnFinish from "@/components/onFinish";
import OnCancel from "@/pages/OnCancel";
import OnReturning from "@/components/OnReturning";

interface MovementProcessProps {}
type StepsType = keyof typeof Status;
type StepsComponentMap = {
  [K in StepsType]: React.ReactNode;
}
const MovementProcess: FunctionComponent<MovementProcessProps> = () => {
  const { movement } = useStore((state) => ({
    movement: state.movement,
  }));

  const Steps: StepsComponentMap = {
    PREPARE: <CreateMovement />,
    ON_TRANSIT: <OnTransit />,
    ON_RETURNING: <OnReturning />,
    FINISH: <OnFinish />,
    CANCELED: <OnCancel />,
  };

  return (
    <div className="transition-transform">
      {Steps[movement.status]}
    </div>
  );
};

export default MovementProcess;
