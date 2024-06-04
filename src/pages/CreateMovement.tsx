import BarcodeScannerComponent from "@/components/BarcideScannerComponent";
import Divider from "@/components/Divider";
import { Card, CardContent, CardHeader } from "@/shadcdn/ui/card";
import { Textarea } from "@/shadcdn/ui/textarea";
import { useStore } from "@/store/store";
import { Bed, Service, Status } from "@/types/movementTypes";
import { ChangeEvent, FunctionComponent, useState } from "react";

interface CreateMovementProps {}

const CreateMovement: FunctionComponent<CreateMovementProps> = () => {
  const { setMovement, setBed, setService, user, movement } = useStore(
    (state) => ({
      setMovement: state.setMovement,
      movement: state.movement,
      ResetMovement: state.resetMovement,
      setService: state.setService,
      setBed: state.setBed,
      user: state.user,
    })
  );

  const [Notes, setNotes] = useState("");

  function handleOnChangeNotes(e: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = e.target;
    setNotes(value);
  }

  function handleOnStartScan(content: string) {
    const jsonResponse = JSON.parse(content);
    console.log(jsonResponse)
    switch (movement.status) {
      case Status.PREPARE:
        setMovement({ begin: new Date(), status: Status.PREPARE, notes: Notes });
        setBed(jsonResponse as Bed);
        break;
      case Status.ON_TRANSIT:
        setMovement({ status: Status.ON_TRANSIT });
        setService(jsonResponse as Service);
        break;
      case Status.FINISH:
        setMovement({ status: Status.FINISH });
        setMovement({ end: new Date() });
        break;
      default:
        break;
    }
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
            <div className="px-9 text-lg pb-9">
              <p>Hola, {user.name}.</p>
              <p>
                Los registros se guardaran automaticamente una vez termines el
                movimiento de la cama.
              </p>
            </div>
            <Divider className="mb-0" />
            <div className="px-6 py-10 flex flex-col gap-6">
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
