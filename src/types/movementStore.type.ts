import { Bed, Movement, Service } from "./movementTypes"

export interface MovementDataStore {
  movements: Movement[]
  services: Service[]
  beds: Bed[]
  movement: Movement
  service?: Service,
  bed?: Bed,
}

export interface MovementActionStore {
  setMovements: (movements: Movement[]) => void
  setServices: (services: Service[]) => void
  setMovement: (movement: Partial<Movement>) => void
  setService: (service: Partial<Service>) => void
  setBed: (bed: Partial<Bed>) => void
  resetMovement: () => void
  setOnList: (movement: Movement) => void
}



export type MovementStoreType = MovementDataStore & MovementActionStore