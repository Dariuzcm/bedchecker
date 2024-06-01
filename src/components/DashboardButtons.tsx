import { Button } from "@/shadcdn/ui/button";
import { Link } from "react-router-dom";

function DashboardButtons() {
  return (<>
    <div className="flex flex-col w-full gap-3">
      <Link to="/movements">
        <Button color="secondary" className="shadow-xl" size={"lg"}>Mis Movimientos</Button>
      </Link>
      <Link to="/movements/create">
        <Button color="primary" className="shadow-xl" size={"lg"} >Crear Movimiento</Button>
      </Link>
    </div>
  </> );
}

export default DashboardButtons;