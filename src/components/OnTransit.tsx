import { updateMovement } from "@/api/movementsServiceHandler";
import BarcodeScannerComponent, { ScanResponse } from "@/components/BarcodeScannerComponent";
import Divider from "@/components/Divider";
import { Button } from "@/shadcdn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcdn/ui/card";
import { useToast } from "@/shadcdn/ui/use-toast";
import { useStore } from "@/store/store";
import { Movement, Service, Status } from "@/types/movementTypes";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface OnTransitProps {
  
}

const OnTransit: FunctionComponent<OnTransitProps> = () => {

  const { movement, bed, user, setMovement, setService } = useStore(state => ({
    movement: state.movement,
    bed: state.bed,
    user: state.user,
    setMovement: state.setMovement,
    setService: state.setService,
  }))
  const navigation = useNavigate()
  const { toast } = useToast()

  function handleOnStartScan(content: ScanResponse<Service> ) {
    if (content.type !== 'service') {
      toast({
        title: "Error: Escaner",
        description: `Tipo de escaneo no es tipo service`,
        variant: "destructive",
      });
      return 
    }
      
    setService(content);
    const mov: Partial<Movement> = { serviceId: content.serviceId, status: Status.ON_RETURNING,  }
    setMovement({ status: Status.ON_RETURNING });
    updateMovement(user.token!, { ...movement, ...mov}).then(mov => {
      setMovement(mov);
    })
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
              En Transito
            </h2>
          </CardHeader>
          <CardContent>
            <Divider className="mt-0" />
            <div className="px-3 text-lg pb-9 flex flex-col">
              <div className="flex gap-3">
                <h1>Cama:</h1> <h3 className="text-slate-400">{bed?.bedCode}</h3>
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