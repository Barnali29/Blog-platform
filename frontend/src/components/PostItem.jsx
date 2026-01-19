import {FaThumbsUp} from 'react-icons/fa'
import { Link } from 'react-router';
function PostItem({post,isProfile=false}) {
    //console.log(post);
    
  return (
    <Link to={`/post/${post._id}`}>
    <div 
    key={post._id}
    className="flex flex-col items-center justify-center w-2xl gap-1 px-4 py-2 border rounded">
      <h1 className='text-center text-lg font-semibold '>
        {post.title}
      </h1>
  <div className='flex items-center justify-center'>  
    {
      post.categories?.length &&
    <div className="text-gray-400 font-medium mt-2">
        {post.categories?.map(category=>category.name).join(", ")}
      </div>
    }
      {isProfile && <span
                className={`${post.status==='DRAFT'?'bg-amber-400 ':post.status==='SUBMITTED'?'bg-orange-600 cursor-pointer':'bg-green-600'} ml-1.5 justify-self-end text-white font-medium text-sm px-2 py-1 rounded-lg `}>
                    {post.status}</span>}
    </div>
    <div className='flex items-center justify-center gap-0.5'><FaThumbsUp size={15}/>{post.numOfLikes} </div>
    </div>
    </Link>
  )
}

export default PostItem