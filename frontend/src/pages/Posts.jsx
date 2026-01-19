import { useEffect } from 'react'
import PostItem from '../components/PostItem'
import {useGetPostsQuery} from '../redux/api/postApiSlice'


function Posts() {
    const {data:posts, refetch}= useGetPostsQuery()
   // console.log(posts);

   useEffect(()=>{refetch()},[refetch])
    
  return (
    <div className=' flex flex-col items-center justify-center text-white '>
      
        <div className=' grid grid-cols-2 gap-3'>
           
        { posts?.map((post)=>
        <PostItem post={post} />
        )
        }
        </div>
    </div>
  )
}

export default Posts