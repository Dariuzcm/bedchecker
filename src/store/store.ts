import { create } from "zustand";
import { UserStoreType } from "../types/userStore.type";
import { userStore } from "./userStore";
import { mountStoreDevtool } from 'simple-zustand-devtools';

export const useStore = create<UserStoreType>((...a) => ({
  ...userStore(...a),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore);
}