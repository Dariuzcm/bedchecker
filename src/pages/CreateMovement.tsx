import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Textarea } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface CreateMovementProps {}

const CreateMovement: FunctionComponent<CreateMovementProps> = () => {
  const navigation = useNavigate()

  function handleOnStartScan(): void {
    navigation('/movements/scanner')
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
          <Divider />
          <CardBody>
            <div className="px-9 text-lg pb-9">
              <p>Hola, Jhon Doe.</p>
              <p>
                Los registros se guardaran automaticamente una vez termines el
                movimiento de la cama.
              </p>
            </div>
            <Divider />
            <div className="px-6 py-10 flex flex-col gap-6">
              <Textarea minRows={6} label="Notas" placeholder="(Opcional) Agrega algunas notas..."/>
              <Button onClick={handleOnStartScan} color="primary" size="lg" fullWidth>Escanear habitación</Button>
            </div>
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default CreateMovement;
