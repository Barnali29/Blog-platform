import { useNavigate, useParams } from "react-router-dom";
import { useGetPostByIdQuery, useAddLikesMutation, useAddCommentsMutation } from "../redux/api/postApiSlice";
import {FaComment, FaThumbsUp} from 'react-icons/fa'
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


function PostDetails() {
  const { id } = useParams();
  const { data: post, isLoading, error, refetch } = useGetPostByIdQuery(id);
  const [showComment, setShowComment]=useState(false)
  const [commentText, setCommentText] = useState("")
  const [addComment, {isLoading:addCommentLoading}]= useAddCommentsMutation()
  const [addLike] =useAddLikesMutation()
  const navigate= useNavigate()
 
  const userInfo = useSelector(state => state.auth?.userInfo);

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Something went wrong</div>;
if (!post) return null;

const isAuthor =
  userInfo && post.author
    ? String(userInfo._id) === String(post.author)
    : false;

const status = post.status;
console.log(userInfo , isAuthor);



  const submitComment= async()=>{
    try {
      await addComment({id,comment:commentText});
      setCommentText("")
      refetch();
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong while adding comment  ")
    }
  }

  const submitLike= async()=>{
    try {
      await addLike(id)
      refetch();
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong while Liking the post ")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
     <h1 className="text-3xl sm:text-2xl font-serif font-bold text-white leading-tight">
  {post.title}
</h1>

{/* categories */}
{post.categories?.length > 0 && (
  <div className="mt-2 flex flex-wrap gap-2">
    {post.categories.map((category) => (
      <span
        key={category._id}
        className="text-xs uppercase tracking-wide px-2 py-1 
                   rounded-full bg-white/10 text-gray-300"
      >
        {category.name}
      </span>
    ))}
  </div>
)}

{/* author-only actions */}
{isAuthor && status === "DRAFT" && (
  <div className="mt-4 flex items-center gap-3">
    <span className="text-xs font-semibold px-2 py-1 rounded-md 
                     bg-yellow-500/20 text-yellow-400">
      {status}
    </span>

    <button
      onClick={() => navigate(`/update-post/${post._id}`)}
      className="px-3 py-1 text-sm font-medium rounded-md 
                 bg-blue-600 hover:bg-blue-500 transition"
    >
      Update
    </button>
  </div>
)}

{/* description */}
<div className="mt-6 text-gray-200 leading-relaxed whitespace-pre-line">
  {post.description}
</div>


<div className="flex items-center justify-between mt-6 border-t border-gray-700 pt-4">
  
  <div className="flex items-center gap-2 text-gray-300">
    <FaThumbsUp
      size={16}
      className="cursor-pointer hover:text-blue-400 transition-colors"
      onClick={submitLike}
    />
    <span className="text-sm font-medium">
      {post.numOfLikes}
    </span>
  </div>

  <button
    onClick={() => setShowComment(!showComment)}
    className="flex items-center cursor-pointer gap-1 text-gray-300 hover:text-green-400 transition-colors"
  >
    <FaComment size={16} />
    <span className="text-sm">Comment</span>
  </button>

</div>

      {showComment && (
  <div className="mt-6 space-y-4">

    {/* Existing comments */}
    {post.comments?.length > 0 ? (
      post.comments.map((c) => (
        <div
          key={c._id}
          className="bg-gray-800 p-3 rounded"
        >
          <p className="text-sm text-gray-200">
            {c.comment}
          </p>
        </div>
      ))
    ) : (
      <p className="text-sm text-gray-400">
        No comments yet. Be the first one.
      </p>
    )}

    {/* Add comment */}
    <div className="flex gap-2">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:ring-1 focus:ring-green-500"
      />

      <button
        onClick={submitComment}
        disabled={addCommentLoading}
        className="px-4 py-2 bg-green-600 font-semibold rounded disabled:opacity-50"
      >
        Post
      </button>
    </div>

  </div>
)}


    </div>
  );
}

export default PostDetails;
