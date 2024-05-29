export interface MovementDataStore {
  movements: Movement[]
  services: Service[]
  beds: Bed[]
  movement?: Movement
  service?: Service,
  bed?: Bed,
}

export interface MovementActionStore {
  setMovements: (movements: Movement[]) => void
  setServices: (services: Service[]) => void
  setMovement: (movement: Partial<Movement>) => void
  setService: (service: Partial<Service>) => void
  setbed: (bed: Partial<Bed>) => void
}

export type Movement = {
  notes?: string
  bed?: Bed
  service?: Service
  begin?: Date
  end?: Date
  status?: keyof typeof Status
}

export type Bed = {
  bedCode?: string
  bedId?: number
  description?: string
}

export type Service = {
  serviceId?: number
  description?: string
  code?: string
}

export const enum Status {
  PREPARE = 'PREPARE',
  ON_TRANSIT = 'ON_TRANSIT',
  FINISH = 'FINISH'
}

export type MovementStoreType = MovementDataStore & MovementActionStore