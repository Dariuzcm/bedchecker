import { create } from "zustand";
import { UserStoreType } from "../types/userStore.type";
import { userStore } from "./userStore";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useStore = create<UserStoreType>((...a) => ({
  ...userStore(...a),
}))