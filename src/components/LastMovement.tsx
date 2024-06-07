import { getLastestMovement } from "@/api/movementsServiceHandler";
import Divider from "./Divider";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Movement } from "@/types/movementTypes";

function LastMovement() {
  const { user } = useStore(({ user }) => ({ user }));
  const [lastMovement, setLastMovement] = useState<Movement>();

  function init() {
    getLastestMovement(user.token!).then((mov) => {
      console.log(mov);
      setLastMovement(mov);
    });
  }

  useEffect(() => {
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <div
        className="flex flex-col justify-center items-center border-solid border-2 border-gray-200 rounded-2xl gap-3
    p-3"
      >
        <h1 className="text-xl">Ultimo movimiento</h1>
        <Divider className="mb-0" />
        <div className="flex flex-col w-52 p-0">
          <div className="flex flex-col">
            <span>Servicio: </span>
            <span className="text-slate-500 border-slate-400 pl-3 text-ellipsis">{`(${lastMovement?.service?.code}) ${lastMovement?.service?.description}`}</span>
          </div>
          <div className="flex flex-col">
            <span>Cama:</span>
            <span className="text-slate-500 border-slate-400 pl-3 text-ellipsis">
              {`(${lastMovement?.bed?.bedCode}) ${lastMovement?.bed?.description}`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LastMovement;
