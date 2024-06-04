import { Button } from "@/shadcdn/ui/button";
import { Link } from "react-router-dom";

function DashboardButtons() {
  return (<>
    <div className="flex flex-col w-full gap-3 items-center justify-center">
      <Link className="w-full" to="/movements">
        <Button variant="secondary" className="shadow-xl w-full" size={"lg"}>Mis Movimientos</Button>
      </Link>
      <Link className="w-full" to="/movements/create">
        <Button className="shadow-xl w-full" size={"lg"} >Crear Movimiento</Button>
      </Link>
    </div>
  </> );
}

export default DashboardButtons;