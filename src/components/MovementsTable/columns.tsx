import { Movement } from "@/types/movementTypes";
import { ColumnDef } from "@tanstack/react-table";
import RelativeTimeComponent from "../RelativeTimeComponent";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export const columns: ColumnDef<Movement>[] = [
    {
      accessorKey: 'end',
      header: 'Fecha',
      cell: ({ row }) => {
        let value =  row.getValue('end')
        if(!value)
          value = row.original.begin
        return <RelativeTimeComponent datetime={value as string} lang="es" />
      }
    }, 
    {
      accessorKey: 'service',
      header: 'Servicio',
      accessorFn: (movement) => `(${movement.service?.code}) ${movement.service?.description}`,
      cell: ({ row }) => {
        const service = row.original
        return <div>{service.service?.description}</div>
      }      
    },
    {
      accessorKey:'notes',
      header: 'Notas',
      cell: ({ row }) => {
        const value = row.getValue('notes')
        return value? value : <p className="text-slate-400">No hay notas</p>
      }
    }
  ]
