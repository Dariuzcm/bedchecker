import Divider from "@/components/Divider";
import { Button } from "@/shadcdn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcdn/ui/card";
import { useStore } from "@/store/store";
import { FunctionComponent } from "react";
import RelativeTimeComponent from "./RelativeTimeComponent";
import { updateMovement } from "@/api/movementsServiceHandler";
import { Status } from "@/types/movementTypes";

interface OnFinishProps {}

const OnFinish: FunctionComponent<OnFinishProps> = () => {
  const {
    movement,
    bed,
    service,
    user,
    setOnList,
    resetMovement,
  } = useStore((state) => ({
    movement: state.movement,
    bed: state.bed,
    service: state.service,
    user: state.user,
    setOnList: state.setOnList,
    resetMovement: state.resetMovement,
  }));

  function handleOnFinish() {
    updateMovement(user.token!, { ...movement, status: Status.FINISH} )
    setOnList({
      ...movement,
      bed,
      bedId: bed?.bedId,
      service,
      serviceId: service?.serviceId
    })
    resetMovement()
  }

  return (
    <>
      <section>
        <Card className="h-auto overflow-x-visible">
          <CardHeader>
            <h2 className="text-center w-full font-semibold text-2xl">
              Movimiento de vuelta
            </h2>
          </CardHeader>
          <CardContent>
            <Divider className="mt-0" />
            <div className="px-3 text-lg pb-9 flex flex-col">
              <div className="flex gap-3">
                <h1>Cama:</h1> <h3 className="text-slate-400">{bed?.bedId}</h3>
              </div>
              <div className="flex gap-3">
                <h1>Descripción:</h1>
                <h3 className="text-slate-400">{bed?.description}</h3>
              </div>
              <div className="flex gap-3">
                <h1>Notas:</h1>
                <h3 className="text-slate-400">{movement?.notes}</h3>
              </div>
              <div className="flex gap-3">
                <h1>Servicio:</h1>
                <h3 className="text-slate-400">{`(${service?.code}) ${service?.description}`}</h3>
              </div>
              <div className="flex gap-3">
                <h1>Fecha de Inicio:</h1>
                <div className="text-slate-400">
                  <RelativeTimeComponent lang="es" datetime={movement.begin}></RelativeTimeComponent>
                </div>
              </div>
              <div className="flex gap-3">
                <h1>Fecha final:</h1>
                <div className="text-slate-400">
                  <RelativeTimeComponent lang="es" datetime={movement.end!}></RelativeTimeComponent>
                </div>
              </div>
            </div>
            <Divider className="mb-24" />
            <div className="px-3 py-10 flex flex-col gap-6">
              <Button
                onClick={handleOnFinish}
                variant={"secondary"}
                size={"lg"}
              >
                Terminar
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default OnFinish;
