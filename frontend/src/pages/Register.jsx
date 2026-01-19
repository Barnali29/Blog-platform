import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRegisterMutation } from "../redux/api/userApiSlice"
import { useLocation, useNavigate } from "react-router"
import { setCredentials } from "../redux/features/authSlice"
import { FaSpinner } from "react-icons/fa"
import { toast } from "react-toastify"

function Register() {
        const [username,setUsername]=useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        
    
        const {userInfo}=useSelector((state)=>state.auth)
        const [register,{isLoading}]=useRegisterMutation()
        const navigate=useNavigate()
        const dispatch=useDispatch()
    
        const search=useLocation()
        const sp= new URLSearchParams(search)
        const redirectpath= sp.get("redirect") || "/home"
    
        useEffect(()=>{
            if (userInfo) {
                navigate(redirectpath)
            }
        },[navigate,redirectpath,userInfo])

    const submitForm=async(e)=>{
        e.preventDefault();
        try {
            const res= await register({username,email,password}).unwrap()
            console.log(res);
            dispatch(setCredentials({...res}))
            navigate(redirectpath)
            toast.success("User registered successfully")
        } catch (error) {
            console.error(error);
            
        }
    }     
  return (
       <div>
        <section className="pl-40 flex flex-wrap">
            <div className="mr-16 mt-20">
                <h1 className="text-2xl font-semibold mb-4">
                    Register
                </h1>
                <form
                onSubmit={(e)=>submitForm(e)}
                className="container w-160"
                >
                      <div className="my-8">   
                     <label
                      
                className="block text-sm font-medium text-white"
                     >
                       Username
                    </label>
                <input
                type="text"
                className="p-2 mt-1.5 rounded w-full border-2 "
                placeholder="Enter username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />
                </div>
                <div className="my-8">   
                     <label
                      htmlFor="email"
                className="block text-sm font-medium text-white"
                     >
                        Email Address
                    </label>
                <input
                type="email"
                id='email'
                className="p-2 mt-1.5 rounded w-full border-2 "
                placeholder="Enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                </div>

                    <div className="mb-4">   
                     <label
                      htmlFor="password"
                className="block text-sm font-medium text-white"
                     >
                        Password
                    </label>
                <input
                type="password"
                id='password'
                className="p-2 mt-1 rounded w-full border-2"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                </div>

<button
disabled={isLoading}
type="submit"
 className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-4"
>
    {isLoading ?"Registering...." :"Register"}
</button>

{isLoading && <FaSpinner className="mr-2 mt-12" size={26}/>}
                </form>

   
            </div>
        </section>
    </div>
  )
}

export default Register