import { POST_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const postApiSlice= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createPost:builder.mutation({
            query:(data)=>({
                url:POST_URL,
                method:"POST",
                body:data
            })
        }),
       updatePost:builder.mutation({
        query:(data)=>({
        url:`${POST_URL}/${data.id}`,
        method:"PUT",
        body:data
        })
       }) ,
       getPosts:builder.query({
        query:()=>({
            url:POST_URL
        })
       }),
       getPostById:builder.query({
        query:(id)=>({
            url:`${POST_URL}/${id}`
        })
       }),

       deletePost: builder.mutation({
        query:(id)=>({
            url:`${POST_URL}/${id}`,
            method:"DELETE",
        })
       }),

       approvePost:builder.mutation({
         query:(id)=>({
            url:`${POST_URL}/${id}/approve`,
            method:"POST",
        })
       }),
        
       getTopPosts:builder.query({
        query:()=>({
            url:`${POST_URL}/top-posts`
        })
       }),

       addLikes:builder.mutation({
        query:(id)=>({
            url:`${POST_URL}/${id}/add-likes`,
            method:"POST"
        })
       }),

       addComments:builder.mutation({
         query:({id,comment})=>({
            url:`${POST_URL}/${id}/add-comment`,
            method:"POST",
            body:{comment}
        })
       }),

       getPostByUserId: builder.query({
        query:(id)=>({
            url:`${POST_URL}/user-posts/${id}`
        })
       }),
       getPostsForAdmin:builder.query({
        query:()=>({
            url:`${POST_URL}/admin/posts`
        })
       })

    })
})

export const {
    useCreatePostMutation,
    useUpdatePostMutation,
    useGetPostsQuery,
    useGetPostByIdQuery,
    useDeletePostMutation,
    useApprovePostMutation,
    useGetTopPostsQuery,
    useAddLikesMutation,
    useAddCommentsMutation,
    useGetPostByUserIdQuery,
    useGetPostsForAdminQuery
}= postApiSlice