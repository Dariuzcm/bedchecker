import Divider from "./Divider";

function LastMovement() {
  
  return (<>
    <div className="flex flex-col justify-center items-center border-solid border-2 border-gray-200 rounded-2xl gap-3
    p-3">
      <h1 className="text-xl">Ultimo movimiento</h1>
      <Divider className="mb-0"/>
      <div className="flex flex-col w-52 p-3">
        <div className="flex justify-between"><span>Servicio: </span> <span className="text-slaborder-slate-400">Servicio</span></div>
        <div className="flex justify-between"><span>Cama:</span> <span className="text-slaborder-slate-400">Cama</span></div>
      </div>
    </div>
  </>);
}

export default LastMovement;