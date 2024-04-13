import { StateCreator } from "zustand";
import { UserActionStore, UserDataStore } from "../types/userStore.type";
import { User } from "../types/userTypes";

const initialState: UserDataStore = {
  user: {
    id: 0,
    name: "",
    photo: "",
    email: "",
  },
};

export const userStore: StateCreator<UserDataStore & UserActionStore> = (
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
});
