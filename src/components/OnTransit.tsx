import BarcodeScannerComponent from "@/components/BarcodeScannerComponent";
import Divider from "@/components/Divider";
import { Button } from "@/shadcdn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcdn/ui/card";
import { useStore } from "@/store/store";
import { Bed, Service, Status } from "@/types/movementTypes";
import { FunctionComponent } from "react";

interface OnTransitProps {
  
}
 
const OnTransit: FunctionComponent<OnTransitProps> = () => {

  const { movement, bed, setMovement, setService, resetMovement, cancelMovement } = useStore(state => ({
    movement: state.movement,
    bed: state.bed,
    setMovement: state.setMovement,
    setService: state.setService,
    resetMovement: state.resetMovement,
    cancelMovement: state.cancelMovement,
  }))
  function handleOnStartScan(content: Service | Bed) {
    setMovement({ status: Status.FINISH, end: new Date() });
    setService(content as Service);
  }

  function handleOnCancel(): void {
    cancelMovement(movement).then(() => {
      resetMovement()
    })
  }

  return (
    <>
      <section>
        <Card className="h-auto overflow-x-visible">
          <CardHeader>
            <h2 className="text-center w-full font-semibold text-2xl">
              En Transito
            </h2>
          </CardHeader>
          <CardContent>
            <Divider className="mt-0" />
            <div className="px-3 text-lg pb-9 flex flex-col">
              <div className="flex gap-3">
                <h1>Cama:</h1> <h3 className="text-slate-400">{bed?.bedId}</h3>
              </div>
              <div className="flex gap-3">
                <h1>Descripción:</h1> <h3 className="text-slate-400">{bed?.description}</h3>
              </div>
              <div className="flex gap-3">
                <h1>Notas:</h1> <h3 className="text-slate-400">{movement?.notes}</h3>
              </div>
            </div>
            <Divider className="mb-24" />
            <div className="px-3 py-10 flex flex-col gap-6">
              
              <BarcodeScannerComponent
                onScanData={handleOnStartScan}
                title="Escanear servicio"
              />
              <Button onClick={handleOnCancel} variant={'destructive'} size={'lg'}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
 
export default OnTransit;