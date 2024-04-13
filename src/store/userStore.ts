import { StateCreator } from "zustand";
import { UserActionStore, UserDataStore } from "../types/userStore.type";

const initialState: UserDataStore = {
  user: {
    id: 1,
    name: "jose",
    photo: "/jose.png",
    email: "email@a.com"
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const userStore: StateCreator<UserDataStore & UserActionStore> = (_set, _get) => ({
  user: initialState.user!,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_email: string, _pass: string) => {}
})
