
export interface PaginationObject<T> {
  count: number
  next: string
  previous: string
  results: T[]
}

export type PokemonList = {
  name: string,
  url: string
}