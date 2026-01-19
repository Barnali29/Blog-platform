import { useEffect, useState } from "react";
import {useGetAllCategoriesQuery} from "../redux/api/categoryApiSlice"
import { useCreatePostMutation, useGetPostByIdQuery, useUpdatePostMutation } from "../redux/api/postApiSlice";
import {toast} from 'react-toastify'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AiOutlineLoading } from "react-icons/ai";
const PostForm = () => {
  const {id} =useParams()
  const { data: post, isLoading:postLoading } = useGetPostByIdQuery(id, {
  skip: !id
});
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate= useNavigate()
  
  const userInfo = useSelector(state => state.auth?.userInfo);
  const {data:categories}=useGetAllCategoriesQuery()
  const [createPost, {isLoading}]= useCreatePostMutation()
  const[updatePost, {isLoading:updateLoading}]=useUpdatePostMutation()

  useEffect(()=>{
    setTitle(post?.title)
    setdescription(post?.description)
    setSelectedCategories(
    post?.categories?.map(cat => cat._id) ?? []);
  },[post,postLoading])

 // console.log(selectedCategories)

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    // console.log(categoryId)
    // setSelectedCategories([...selectedCategories ,categoryId])
  };

  const handleSubmit = async() => {
    const payload = {
      title,
      description,
      categories: selectedCategories,
      status: "SUBMITTED",
      author:userInfo._id
    };

    console.log("Submitting post:", payload);
    
    try {
      await createPost(payload);
      toast.success("post created ")
      setTitle('')
      setdescription('')
      setSelectedCategories([])
      navigate('/all-posts')
    } catch (error) {
      console.error(error)
      toast.error(error?.error || error?.message)
    }
  };

  const handleDraft = async () => {
    const payload = {
      title,
      description,
      categories: selectedCategories,
      status: "DRAFT",
      author:userInfo._id
    };

    console.log("Saving draft:", payload);
    try {
      if(post){
        await updatePost({...payload,id:post._id})
      }
     else await createPost(payload);
      toast.success("Draft saved")
      navigate('/all-posts')
    } catch (error) {
      console.error(error)
      toast.error(error?.error || error?.message)
    }
  };
if(postLoading) return <AiOutlineLoading/>
  return (
    <div className="min-h-screen w-full p-10 text-white flex items-center justify-center">
  <div className="flex flex-col gap-4 text-center w-full max-w-2xl">
    <h1 className="font-bold text-2xl ">Create a Post</h1>
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold ">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold ">
            Categories
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories?.map((category) => (
              <label
                key={category._id}
                className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className={`${selectedCategories.includes(category._id)}` ? 'accent-blue-500' :''}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>

        {/* description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">
            description
          </label>
          <textarea
            rows={7}
            placeholder="Start writing your article..."
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={handleDraft}
            disabled={isLoading || updateLoading}
            className="px-6 py-2 rounded-lg border border-gray-400  hover:bg-gray-100 hover:text-black font-semibold transition"
          >
            { (isLoading || updateLoading) ? <AiOutlineLoading/>:  'Draft'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || updateLoading}
            className="px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            { (isLoading || updateLoading) ? <AiOutlineLoading/>:  'Submit'}
          </button>
</div>
      </div>
    </div>
  );
};

export default PostForm