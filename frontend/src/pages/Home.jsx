import { FaSpinner } from "react-icons/fa"
import { useGetTopPostsQuery } from "../redux/api/postApiSlice"

function Home() {
    const {data:topPosts,isLoading}=useGetTopPostsQuery()
    // console.log(topPosts);
    
    if(isLoading) return (
    <div className="flex items-center justify-center">
    <FaSpinner className="text-2xl "/>
    </div>)
  return (
 <div className="max-w-3xl mx-auto flex flex-col gap-6 px-6 py-6">
  {topPosts?.map((post) => (
    <div
      key={post._id}
      className="group rounded-xl border border-white/10
                 p-5 transition hover:border-white/20"
    >
      {/* Title */}
      <h1 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition">
        {post.title}
      </h1>

      {/* Categories */}
      {post.categories?.length > 0 && (
        <div className="mt-2 text-sm text-gray-400">
          {post.categories.map((c) => c.name).join(" , ")}
        </div>
      )}

      {/* Description */}
      <p className="mt-3 text-gray-300 text-sm leading-relaxed line-clamp-3">
        {post.description}
      </p>
    </div>
  ))}
</div>
);

  
}

export default Home