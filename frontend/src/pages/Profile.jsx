import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useUpdateUserMutation } from "../redux/api/userApiSlice"
import {toast} from 'react-toastify'
import { setCredentials } from "../redux/features/authSlice"
import { useGetPostByUserIdQuery } from "../redux/api/postApiSlice"
import PostItem from "../components/PostItem"
function Profile() {
    const {userInfo}= useSelector(state=>state.auth)
    const [username, setUserame] = useState(userInfo.username)
    const [password,setPassword]= useState("")

    const [updateProfile,{isLoading}]=useUpdateUserMutation()
    const {data:userPosts,isLoading:postsLoading} =useGetPostByUserIdQuery(userInfo._id)
    const dispatch=useDispatch()

    const handleChangeProfile = async()=>{
        if(password==="" && username===userInfo.username) 
            toast.error("Nothing to change!!")
        try {
            const data = {
     userId: userInfo._id,
    ...(password !== '' && { password }),
    ...(username !== userInfo.username && { username })
        };
           const res= await updateProfile(data).unwrap();
           dispatch(setCredentials({...res}))
            toast.success("Profile updated successfully")
        } catch (error) {
            console.error(error)
           toast.error("some thing went wrong , try again") 
        }    
    }
  return (
    <div className=" mx-auto  flex flex-col items-center justify-center gap-6 px-6 py-6 text-white">
       <h1 className="text-2xl text-center font-serif md:text-xl sm:text-lg font-semibold">Your Profile </h1>
       {/*personal details part  */}
        <div className="flex flex-col items-center justify-between rounded-md border-2  border-white/10
                 p-3 transition hover:border-white/20 gap-4 w-2/3">
                    <h2 className="text-xl md:text-lg sm:text-md font-semibold" >Personal Details </h2>
        <div className="flex items-start justify-around flex-col">
        <label className="text-center font-semibold"> Username</label>
        <input 
        type="text"
        value={username}
        className=" border rounded-md border-gray-500 text-white px-3 py-1.5"
        onChange={(e)=>setUserame(e.target.value)}
         />
  </div>

         <div className="flex items-start justify-around flex-col">
         <label className="text-center font-semibold"> Email </label>
         <input 
         type="text"
         value={userInfo.email} 
         className="border rounded-md border-gray-500 text-white px-3 py-1.5"
         disabled="true"
         />
    </div>

        <div className="flex items-start justify-around flex-col ">
         <label className="text-center font-semibold">Password</label>
         <input
         type="text"
         value={password}
         className="border rounded-md border-gray-500 text-white px-3 py-1.5"
         onChange={(e)=>setPassword(e.target.value)}
         />
         </div>
         <button 
         onClick={handleChangeProfile}
         className="px-2 py-1 bg-pink-700 hover:bg-pink-500 cursor-pointer rounded-md"
         disabled={isLoading}
         >
            Submit
            </button>
        </div>
        {/* if user has any posts  */}
        {userPosts?.length >0 && !postsLoading && 
        <>
        <hr className="my-6 border-white/20 w-full" />

            <div className="flex flex-col items-center justify-between rounded-md 
                 p-3  gap-4">
                <h1 className="text-center text-gray-100 text-xl font-semibold font-serif">Your Posts</h1>
                {userPosts.map((post)=><PostItem post={post} isProfile={true} />)}
        </div>
        </>
        }
    </div>
  )
}

export default Profile