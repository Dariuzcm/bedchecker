export interface User {
  id: number
  name: string
  photo: string
  email: string
  type?: 'user' | 'admin'
  token?: string
  createdAt?: string
  updatedAt?: string
}