
import { StateCreator } from "zustand";
import { Bed, Movement, MovementDataStore, MovementStoreType, Service } from "../types/movementStore.type";

const initialState: MovementDataStore = {
  movements: [],
  services: [],
  beds: []
};
export const movementStore: StateCreator<MovementStoreType> = (
  set,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get
) => ({
  ...initialState,
  restartMovement: () => set({ }),
  setMovements: (movements: Movement[]) => set({ movements }),
  setServices: (services: Service[]) => set({services}),
  setMovement: (movement: Partial<Movement>) => set((state) => ({
    movement: {
      ...state.movement,
      ...movement,
    }
  })),

  setService: (service: Partial<Service>) => set((state) => ({
    service: {
      ...state.service,
      ...service,
    }
  })),
  setbed: (bed: Partial<Bed>) => set((state) => ({
    bed: {
      ...state.bed,
      ...bed,
    }
  })),
});
