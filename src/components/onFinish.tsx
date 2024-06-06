import BarcodeScannerComponent from "@/components/BarcodeScannerComponent";
import Divider from "@/components/Divider";
import { Button } from "@/shadcdn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcdn/ui/card";
import { useToast } from "@/shadcdn/ui/use-toast";
import { useStore } from "@/store/store";
import { Bed, Service } from "@/types/movementTypes";
import { FunctionComponent } from "react";

interface OnFinishProps {}

const OnFinish: FunctionComponent<OnFinishProps> = () => {
  const {
    movement,
    bed,
    service,
    setOnList,
    resetMovement,
    cancelMovement,
  } = useStore((state) => ({
    movement: state.movement,
    bed: state.bed,
    service: state.service,
    setOnList: state.setOnList,
    resetMovement: state.resetMovement,
    cancelMovement: state.cancelMovement,
  }));

  const { toast } = useToast()

  function handleOnStartScan(content: Service | Bed) {
    if((content as Bed)?.bedId != bed?.bedId) {
      toast({
        title: "Alert: Escaneando",
        description: `Cama distinta, el moviemiento tiene que volver a la cama: ${bed?.bedCode}`,
        variant:'destructive'
      })
      return 
    }
    setOnList({
      ...movement,
      bed,
      bedId: bed?.bedId,
      service,
      serviceId: service?.serviceId
    })
    resetMovement()
  }

  function handleOnCancel(): void {
    cancelMovement(movement).then(() => {
      resetMovement();
    });
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
            </div>
            <Divider className="mb-24" />
            <div className="px-3 py-10 flex flex-col gap-6">
              <BarcodeScannerComponent
                onScanData={handleOnStartScan}
                title="Escanear habitacion de vuelta"
              />
              <Button
                onClick={handleOnCancel}
                variant={"destructive"}
                size={"lg"}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default OnFinish;
