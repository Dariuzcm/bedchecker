import { FunctionComponent, useEffect } from "react";
import DataTable from "./data-table";
import { columns } from "./columns";
import { useStore } from "@/store/store";
import { getMovements } from "@/api/movementsServiceHandler";

interface MovementsTableProps {}

const MovementsTable: FunctionComponent<MovementsTableProps> = () => {
  const { movements, user, paginator, setPaginator, setMovements } = useStore((state) => ({ 
    movements: state.movements,
    paginator: state.paginatorMovement,
    user: state.user,
    setPaginator: state.setPaginatorMovement,
    setMovements: state.setMovements,
  }))

  const getMovementsTable = () => {
    getMovements(user.token!).then(({ meta, data }) => {
      setPaginator(meta)
      setMovements(data)
    })
  }

  useEffect(() => {
    getMovementsTable()  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    <DataTable pagination={paginator} columns={columns} data={movements} />
  </>;
};

export default MovementsTable;
