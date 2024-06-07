import { StateCreator } from "zustand";
import {
  MovementDataStore,
  MovementStoreType,
} from "../types/movementStore.type";
import {
  Bed,
  Movement,
  PaginatorType,
  Service,
  Status,
} from "@/types/movementTypes";

const initialState: MovementDataStore = {
  movements: [],
  services: [],
  beds: [],
  movement: {
    status: Status.PREPARE,
  },
  paginatorMovement: {
    currentPage: 0,
    firstPage: 0,
    firstPageUrl: "",
    lastPage: 0,
    lastPageUrl: "",
    nextPageUrl: null,
    perPage: 0,
    previousPageUrl: null,
    total: 0
  }
};
export const movementStore: StateCreator<MovementStoreType> = (
  set,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get
) => ({
  ...initialState,
  restartMovement: () => set({}),
  setMovements: (movements: Movement[]) => set({ movements }),
  setServices: (services: Service[]) => set({ services }),
  setMovement: (movement: Partial<Movement>) =>
    set((state) => ({
      movement: {
        ...state.movement,
        ...movement,
      },
    })),

  setService: (service: Partial<Service>) =>
    set((state) => ({
      service: {
        ...state.service,
        ...service,
      },
    })),
  setBed: (bed: Partial<Bed>) =>
    set((state) => ({
      bed: {
        ...state.bed,
        ...bed,
      },
    })),
  resetMovement: () => set({ movement: initialState.movement }),
  setOnList: (movement: Movement) =>
    set(({ movements }) => {
      const current = movements;
      current.unshift(movement);
      return {
        movements: current,
      };
    }),
  setPaginatorMovement: (paginator: PaginatorType) =>
    set({ paginatorMovement: paginator }),
});
