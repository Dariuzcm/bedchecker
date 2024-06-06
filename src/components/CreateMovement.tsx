import { createMovement } from "@/api/movementsServiceHandler";
import BarcodeScannerComponent, { ScanResponse } from "@/components/BarcodeScannerComponent";
import Divider from "@/components/Divider";
import { Card, CardContent, CardHeader } from "@/shadcdn/ui/card";
import { Textarea } from "@/shadcdn/ui/textarea";
import { useToast } from "@/shadcdn/ui/use-toast";
import { useStore } from "@/store/store";
import { Bed, Status } from "@/types/movementTypes";
import { ChangeEvent, FunctionComponent, useState } from "react";

interface CreateMovementProps {}

const CreateMovement: FunctionComponent<CreateMovementProps> = () => {
  const { toast } = useToast()
  const { setMovement, setBed, user, movement } = useStore(
    (state) => ({
      setMovement: state.setMovement,
      movement: state.movement,
      ResetMovement: state.resetMovement,
      setService: state.setService,
      setBed: state.setBed,
      setOnList: state.setOnList,
      user: state.user,
    })
  );
  
  const [Notes, setNotes] = useState( movement.notes || "");

  function handleOnChangeNotes(e: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = e.target;
    setNotes(value);
  }

  function handleOnStartScan(content: ScanResponse<Bed> ) {
    if(content.type !== 'bed') {
      toast({
        title: "Error: Escaner",
        description: `Tipo de escaneo no es tipo bed (Cama)`,
        variant: "destructive",
      });
      return 
    }

    setBed(content as Bed);
    
    const movem = { begin: new Date().toISOString(), status: Status.ON_TRANSIT, notes: Notes, bedId: content.bedId }
    
    setMovement(movem);
    createMovement(user.token!, movem).then((mov) => {
      setMovement(mov)
    }).catch((err) => {
      toast({
        title: "Error: Creando Movimiento",
        description: `${err.message}`,
        variant:'destructive'
      })
      setMovement({ status: Status.PREPARE })
    })
  }

  return (
    <>
      <section>
        <Card className="h-auto overflow-x-visible">
          <CardHeader>
            <h2 className="text-center w-full font-semibold text-2xl">
              Comenzar movimiento
            </h2>
          </CardHeader>
          <CardContent>
            <Divider className="mt-0" />
            <div className="px-3 text-lg pb-9">
              <p>Hola, {user.name}.</p>
              <p>
                Los registros se guardaran automaticamente una vez termines el
                movimiento de la cama.
              </p>
            </div>
            <Divider className="mb-0" />
            <div className="px-3 py-10 flex flex-col gap-6">
              <Textarea
                className="bg-slate-100 text-lg"
                value={Notes}
                rows={6}
                onChange={handleOnChangeNotes}
                placeholder="(Opcional) Agrega algunas notas..."
              />
              <BarcodeScannerComponent
                onScanData={handleOnStartScan}
                title="Escanear habitación"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default CreateMovement;
