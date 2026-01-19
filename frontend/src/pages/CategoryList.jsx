import { useEffect, useState } from "react"
import CategoryForm from "../components/CategoryForm"
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation } from "../redux/api/categoryApiSlice"
import { toast } from 'react-toastify'
import Modal from "../components/Modal"


function CategoryList() {
  const [name, setName] =useState("")
   const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
    const {data:categories, refetch}=useGetAllCategoriesQuery()
    const [createCategory]=useCreateCategoryMutation()
    const [updateCategory]=useUpdateCategoryMutation()
    const [deleteCategory]=useDeleteCategoryMutation()

useEffect(()=>{refetch()},[refetch])

const handleCreateCategory= async(e)=>{
e.preventDefault();

if(!name) {
  toast.error("category name is required ")
  return;
}
try {
  const res=await createCategory({name}).unwrap()
  console.log(res);
  
  if(res.error) toast.error(result.error)
    else {
  setName("")
  toast.success(`${res.name} is created`)
  refetch()
  }
} catch (error) {
  console.error(error);
  toast.error("Creating category failed, try again.");
}
}

const handleUpdateCategory=async(e)=>{
  e.preventDefault();

   if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

  try {
   const res= await updateCategory({
    id:selectedCategory._id,
      name:updatingName
   }).unwrap();
   
   if(res.error) {
    toast.error(res.error)
   }
   else {
     toast.success(`${res.name} is updated`);
     refetch()
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
   }
  } catch (error) {
    console.error(error)
  }

}

const handleDeleteCategory =async(e)=>{
  e.preventDefault();
   try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch()
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
    }

}

  return (
    <div className="ml-40 flex flex-col md:flex-row"> 
        
        <div className="md:w-3/4 p-3">
        <div className="h-12 text-2xl text-center font-semibold">
        Manage Categories 
          </div> 
          <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory}/>
          <br/>
          <hr/>
          <div className="flex flex-wrap">
          {categories && categories.map((category)=>(
            <div key={category._id}>
<button
                className="bg-pink-500  text-white py-2 px-4 rounded-lg m-3 hover:bg-pink-300 hover:text-black focus:outline-none"
                onClick={() => {
                  setModalVisible(true)
                  setSelectedCategory(category)
                  setUpdatingName(category.name)
                }}>
                  {category.name}
                </button>
              </div>
          ))}
          </div>

          <Modal isOpen={modalVisible} onClose={()=>setModalVisible(false)}>
            <CategoryForm
            value={updatingName}
            setValue={(value)=>setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
            />
          </Modal>

        </div>
    </div>
  )
}

export default CategoryList