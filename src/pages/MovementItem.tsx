import RelativeTimeComponent from "@/components/RelativeTimeComponent";
import { Button } from "@/shadcdn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcdn/ui/card";
import { useStore } from "@/store/store";
import { Divider } from "@tremor/react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface MovementItemProps {
  
}

const MovementItem: FunctionComponent<MovementItemProps> = () => {
  const { movement } = useStore(({ movement }) => ({ movement }))
  const { bed, service } = movement

  const navigate = useNavigate()

  function handleOnReturn() {
    navigate('/movements')
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
            <div className="px-3 text-lg pb-9 flex flex-col gap-3">
              <div className="flex flex-col">
                <h1>Cama:</h1> <h3 className="text-slate-400">{`(${bed?.bedCode}) ${bed?.description}`}</h3>
              </div>
              <div className="flex flex-col">
                <h1>Servicio:</h1>
                <h3 className="text-slate-400">{`(${service?.code}) ${service?.description}`}</h3>
              </div>
              <div className="flex flex-col">
                <h1>Notas:</h1>
                <h3 className="text-slate-400">{movement?.notes ? movement?.notes : 'No hay notas'  }</h3>
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
            <div className="px-3 py-auto flex flex-col gap-6">
              <Button
                onClick={handleOnReturn}
                variant={"secondary"}
                size={"lg"}
              >
                Regresar
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

export default MovementItem;