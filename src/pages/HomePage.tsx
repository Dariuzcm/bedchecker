import { PokeList } from "../components/PokeList";
import { useStore } from "../store/store";
import { UserStoreType } from "../types/userStore.type";

export function HomePage() {

  const { user } = useStore((state: UserStoreType) => state)
  return (<>
    HOME PAGE
    <section>
      <div>Current user {`${user.name} ${user.email} ${user.type || 'admin'}`} </div>
      <PokeList />
    </section>
  </>)
  
}