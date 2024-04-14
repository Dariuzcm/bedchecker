import { create } from "zustand";
import { UserStoreType } from "../types/userStore.type";
import { userStore } from "./userStore";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist } from "zustand/middleware";

export const useStore = create<UserStoreType, [["zustand/persist", UserStoreType]]>(
  persist(
    (...a) => ({
      ...userStore(...a),
    }),
    {
      name: "mainStore",
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useStore);
}
