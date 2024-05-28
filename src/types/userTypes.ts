export interface User {
  id: number
  name: string
  photo: string
  email: string
  type?: 'user' | 'admin'
  token?: Token | null
  employeeNumber?: string
  inactive?: boolean
  verificated?: boolean
  createdAt?: string
  updatedAt?: string
}

export type UserFields = Pick<User, 'email' | 'employeeNumber' | 'photo' | 'name'>

export type Token = {
  type: string;
  name: string;
  token: string;
  abilities: string[];
  lastUsedAt?: Date;
  expiresAt: Date;
}