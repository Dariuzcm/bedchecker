import { User } from "./userTypes";

export interface UserDataStore {
  user: User,
}

export interface UserActionStore {
  login: (email:string, pass: string) => Promise<void>
}

export type UserStoreType = UserDataStore & UserActionStore