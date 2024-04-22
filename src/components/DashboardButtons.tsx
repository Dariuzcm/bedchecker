import { Button } from "@nextui-org/react";

function DashboardButtons() {
  return (<>
    <div className="flex flex-col w-full gap-3">
      <Button href="/movements" color="secondary" className="shadow-xl" size={"lg"} as={'a'}>Mis Movimientos</Button>
      <Button href="/movements/create" color="primary" className="shadow-xl" size={"lg"} as={'a'}>Crear Movimiento</Button>
    </div>
  </> );
}

export default DashboardButtons;