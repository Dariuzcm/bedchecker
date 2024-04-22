import { Divider } from "@nextui-org/react";

function LastMovement() {
  
  return (<>
    <div className="flex flex-col justify-center items-center border-solid border-1 border-zinc-400 rounded-2xl gap-3
    p-3">
      <h1 className="text-xl">Ultimo movimiento</h1>
      <Divider />
      <div className="flex flex-col w-52 p-3">
        <div className="flex justify-between"><span>Servicio: </span> <span className="text-zinc-400">Servicio</span></div>
        <div className="flex justify-between"><span>Cama:</span> <span className="text-zinc-400">Servicio</span></div>
      </div>
    </div>
  </>);
}

export default LastMovement;