import { useEffect } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";


export function HomePage() {

  const { user } = useStore(({ user }) => ({ user }))
  const navigation = useNavigate()

  useEffect(() => {
    console.log(!user.token)
    if(!user.token) {
      navigation('/login')
    }
  }, [])  
  return (<>
    HOME PAGE
    <section>
      <div>Current user {`${user.name} ${user.email} ${user.type || 'admin'}`} </div>
    </section>
  </>)
  
}