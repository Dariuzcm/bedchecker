import { Card, CardHeader, CardContent } from "@/shadcdn/ui/card";
import { FunctionComponent } from "react";
import Divider from "../components/Divider";
import { Button } from "@/shadcdn/ui/button";
import { useStore } from "@/store/store";
import { cancelMovement } from "@/api/movementsServiceHandler";
import { useNavigate } from "react-router-dom";

interface OnCancelProps {}

const OnCancel: FunctionComponent<OnCancelProps> = () => {
  const { bed, movement, service, user, resetMovement } = useStore((state) => ({
    bed: state.bed,
    user: state.user,
    movement: state.movement,
    service: state.service,
    resetMovement: state.resetMovement,
  }));
  const navigation = useNavigate()

  function handleOnFinish(): void {
    cancelMovement(user.token!, movement).then(() => {
      resetMovement()
    })
  }

  function handleOnBack(): void {
    navigation('/movements/create')
  }

  return (
    <section>
      <Card className="h-auto overflow-x-visible">
        <CardHeader>
          <h2 className="text-center w-full font-semibold text-2xl">
            Movimiento Cancelado
          </h2>
        </CardHeader>
        <CardContent>
          <Divider className="mt-0" />
          <div className="px-3 text-lg pb-9 flex flex-col">
            {bed?.bedId && (
              <div className="flex gap-3">
                <h1>Cama:</h1> <h3 className="text-slate-400">{bed?.bedId}</h3>
              </div>
            )}
            {bed?.description && (
              <div className="flex gap-3">
                <h1>Descripción:</h1>
                <h3 className="text-slate-400">{bed?.description}</h3>
              </div>
            )}
            <div className="flex gap-3">
              <h1>Notas:</h1>
              <h3 className="text-slate-400">{movement?.notes}</h3>
            </div>
            {service && (
              <div className="flex gap-3">
                <h1>Servicio:</h1>
                <h3 className="text-slate-400">{`(${service?.code}) ${service?.description}`}</h3>
              </div>
            )}
          </div>
          <Divider className="mb-24" />
          <div className="px-3 py-10 flex flex-col gap-6">
            <Button
              onClick={handleOnFinish}
              variant={"destructive"}
              size={"lg"}
            >
              Continuar con cancelación
            </Button>
            <Button
              onClick={handleOnBack}
              variant={"secondary"}
              size={"lg"}
            >
              Regresar
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default OnCancel;
