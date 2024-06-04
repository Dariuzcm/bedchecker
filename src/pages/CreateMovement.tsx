import Divider from "@/components/Divider";
import { Button } from "@/shadcdn/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shadcdn/ui/card";
import { Textarea } from "@/shadcdn/ui/textarea";
import { useStore } from "@/store/store";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateMovementProps {}

const CreateMovement: FunctionComponent<CreateMovementProps> = () => {
  const { setMovement, user } = useStore((state) => ({
    setMovement: state.setMovement,
    ResetMovement: state.resetMovement,
    user: state.user,
  }));

  const navigation = useNavigate();
  const [Notes, setNotes] = useState("");

  function handleOnStartScan(): void {
    setMovement({
      notes: Notes,
    });
    navigation("/movements/scanner");
  }

  function handleOnChangeNotes(e: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = e.target;
    setNotes(value);
  }

  return (
    <>
      <section>
        <Card className="h-[80vh] overflow-x-visible">
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
              <Button onClick={handleOnStartScan} color="primary" size="lg">
                Escanear habitación
              </Button>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>
    </>
  );
};

export default CreateMovement;
