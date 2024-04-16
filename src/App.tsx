import { Navigation } from "./components/Navigation"
import { ReactRouter } from "./router/router"

function App() {

  return (
  <>
    <Navigation />
    <main className="p-6 pb-8 w-full h-[85vh] overflow-auto">
      <ReactRouter />
    </main>
  </>
  )
}

export default App
