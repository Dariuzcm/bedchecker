import { User } from "./userTypes";

export interface UserDataStore {
  user: User,
}

export interface UserActionStore {
}

export type UserStoreType = UserDataStore & UserActionStore