import { StateCreator } from "zustand";
import { UserDataStore, UserStoreType } from "../types/userStore.type";
import { User } from "../types/userTypes";

const initialState: UserDataStore = {
  user: {
    id: 0,
    name: "",
    photo: "",
    email: "",
    token: null,
    photoId: ""
  },
};

export const userStore: StateCreator<UserStoreType> = (
  set,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get
) => ({
  user: initialState.user!,

  //-------Actions---------
  setUser: (partialUser: Partial<User>) =>
    set(({ user }) => ({
      user: {
        ...user,
        ...partialUser,
      },
    })),
  restartUser: () => set({ user: initialState.user })
});
