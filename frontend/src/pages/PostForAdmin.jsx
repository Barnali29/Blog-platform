import { useGetPostsForAdminQuery } from "../redux/api/postApiSlice"
import { FaThumbsUp } from "react-icons/fa"
import {AiOutlineLoading} from 'react-icons/ai'
import { useApprovePostMutation } from "../redux/api/postApiSlice"
import {toast} from 'react-toastify'
import { useParams } from "react-router"

function PostForAdmin() {
    const {data:posts,refetch, isLoading}=useGetPostsForAdminQuery()
    const [approvePost]=useApprovePostMutation()
    

    const handleSubmit= async(id)=>{
      try {
        await approvePost(id)
        toast.success("Post approved")
        refetch()
      } catch (error) {
        console.error(error)
        toast.error(error?.message|| "something went wrong ")
      }
    }
  return (
    <div className="flex flex-col items-center justify-center">
      {  isLoading ?
      <AiOutlineLoading size={26}/>
      :
        <div className="grid grid-cols-2 gap-3">

            {posts?.map((post)=>(
                <div key={post._id} className="flex flex-col items-center justify-center gap-0.5 p-1 border rounded">
                <h2 className="font-semibold text-lg">{post.title}</h2>
                <span
               onClick={post.status === 'SUBMITTED' ? ()=>handleSubmit(post._id) : undefined}
                className={`${post.status==='DRAFT'?'bg-amber-400 ':post.status==='SUBMITTED'?'bg-orange-600 cursor-pointer':'bg-green-600'} text-white px-2 py-1 rounded-lg `}>
                    {post.status}</span>
                <div className="text-gray-400 mt-2">
        {post.categories?.map(category=>category.name).join(", ")}
      </div>

      <div className="mt-4">{post.description}</div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <FaThumbsUp
            size={16}
          />
          <span className="text-sm font-medium">
            {post.numOfLikes}
          </span>
        </div>
      
   
      
                </div>
            ))}

        </div>}
    </div>
  )
}

export default PostForAdmin