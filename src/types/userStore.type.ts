import { User } from "./userTypes";

export interface UserDataStore {
  user: User,
}

export interface UserActionStore {
  setUser: (user: Partial<User>) => void
}

export type UserStoreType = UserDataStore & UserActionStore