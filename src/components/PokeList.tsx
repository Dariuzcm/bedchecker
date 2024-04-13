import { useEffect, useState } from "react";
import { getAll } from "../api/apiHandler";
import { PaginationObject, PokemonList } from "../types/pokeType";

export function PokeList() {
  const [pokemons, setPokemons] = useState<PaginationObject<PokemonList>>()

  useEffect(() => {
    getAll().then((data: PaginationObject<PokemonList>) => {
      setPokemons(data)
    })
  }, []);
  
  return (<>
    {pokemons?.results.map((item) => (
        <>
          <div className="p-3" data-know-more={item.url}>
            {item.name}
          </div>
        </>
      ))}
  </>
  )
}