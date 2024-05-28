
import { StateCreator } from "zustand";
import { MovementDataStore, MovementStoreType } from "../types/movementStore.type";

const initialState: MovementDataStore = {
};
export const userStore: StateCreator<MovementStoreType> = (
  set,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get
) => ({
  ...initialState,
  restartMovement: () => set({ })
});
