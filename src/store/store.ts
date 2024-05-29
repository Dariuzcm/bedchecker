import { create } from "zustand";
import { UserStoreType } from "../types/userStore.type";
import { userStore } from "./userStore";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist } from "zustand/middleware";
import { movementStore } from "./useMovements";
import { MovementStoreType } from "@/types/movementStore.type";

type StoreType = MovementStoreType & UserStoreType
export const useStore = create<StoreType, [["zustand/persist", StoreType]]>(
  persist(
    (...a) => ({
      ...userStore(...a),
      ...movementStore(...a),
    }),
    {
      name: "mainStore",
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useStore);
}
