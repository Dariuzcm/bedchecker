import { Card, CardContent, CardHeader } from "@/shadcdn/ui/card";
import { FunctionComponent } from "react";
import Divider from "./Divider";
import BarcodeScannerComponent, { ScanResponse } from "./BarcodeScannerComponent";
import { Button } from "@/shadcdn/ui/button";
import { useStore } from "@/store/store";
import { Bed, Status } from "@/types/movementTypes";
import { useToast } from "@/shadcdn/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface OnReturningProps {}

const OnReturning: FunctionComponent<OnReturningProps> = () => {
  const { movement, bed, setMovement, service } = useStore(
    (state) => ({
      movement: state.movement,
      bed: state.bed,
      service: state.service,
      setMovement: state.setMovement,
      setService: state.setService,
    })
  );

  const { toast } = useToast();
  const navigation = useNavigate()

  function handleOnStartScan(content: ScanResponse<Bed> ) {
    if(content.type !== 'bed') {
      toast({
        title: "Error: Escaner",
        description: `Tipo de escaneo no es tipo bed (Cama)`,
        variant: "destructive",
      });
      return 
    }

    const scanned: Bed = content as Bed;

    if (scanned.bedCode !== bed?.bedCode) {
      toast({
        title: "Alert: Escaneando",
        description: `Cama distinta, el moviemiento tiene que volver a la cama: ${bed?.bedCode} ${bed?.description}`,
        variant: "destructive",
      });
      return;
    }
    setMovement({
      end: new Date().toISOString(),
      status: Status.FINISH,
    });
  }

  function handleOnCancel(): void {
    navigation('/movements/cancel')
  }

  return (
    <>
      <section>
        <Card className="h-auto overflow-x-visible">
          <CardHeader>
            <h2 className="text-center w-full font-semibold text-2xl">
              Regresando a Habitación
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
                title="Escanear Habitación"
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

export default OnReturning;
