import { Outlet } from "react-router"
import NavBar from "./components/NavBar"
import {ToastContainer} from 'react-toastify'

function App() {
 

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        pauseOnHover
        closeOnClick
      />
   <NavBar/>
   <main className="py-3">
        <Outlet />
        
      </main>
    </>
  )
}

export default App
