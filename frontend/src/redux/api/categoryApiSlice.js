import { CATEGORY_URL } from '../constant'
import  {apiSlice} from './apiSlice'

 export const categoryApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createCategory: builder.mutation({
            query:(data)=>({
                url:CATEGORY_URL,
                method:"POST",
                body:data
            })
        }),
        updateCategory:builder.mutation({
            query:(data)=>({
                url:`${CATEGORY_URL}/${data.id}`,
                method:"PUT",
                body:data
            })
        }),
           deleteCategory:builder.mutation({
            query:(id)=>({
                url:`${CATEGORY_URL}/${id}`,
                method:"DELETE"
            })
        }),
        getAllCategories:builder.query({
            query:()=>({
                url:`${CATEGORY_URL}/categories`
            })
        }),


    })
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery
}= categoryApiSlice