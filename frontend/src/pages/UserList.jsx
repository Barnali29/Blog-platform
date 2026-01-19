import { FaTrash, FaEdit, FaSpinner, FaCheck } from "react-icons/fa"
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../redux/api/userApiSlice"
import { useState, useEffect } from "react"
import Message from "../components/Message"
import { toast } from 'react-toastify'


function UserList() {
  const { data: users, isLoading, refetch, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const [editableUserId, setEditableUserId] = useState(null)
  const [editableUsername, setEditableUsername] = useState("")

  useEffect(() => {
    refetch()
  }, [refetch])

  const deleteHandler = async (id) => {
    try {
      await deleteUser(id);
      refetch();
    }
    catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  const toggleEdit = (id, username) => {
    setEditableUserId(id);
    setEditableUsername(username);
  }

  const updateHandler=async(id)=>{
    try {
      await updateUser({
        userId:id,
        username:editableUsername
      });

      setEditableUserId(null)
      refetch()

    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

 
  return (
<div className="ml-0 md:ml-64 px-8 py-8  min-h-screen">
  <div className="flex items-center justify-between mb-8">
    <h1 className="text-3xl font-semibold tracking-tight text-white">
      Users
    </h1>
  </div>

  {isLoading ? (
    <div className="flex items-center justify-center h-64">
      <FaSpinner className="animate-spin text-4xl text-gray-400" />
    </div>
  ) : error ? (
    <Message variant="danger">
      {error.data?.message || error.message}
    </Message>
  ) : (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100/70 backdrop-blur sticky top-0 z-10">
          <tr className="text-gray-600 text-xs uppercase tracking-wide">
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-center">Role</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="group hover:bg-gray-50 transition-all duration-200"
            >
              <td className="px-6 py-4 font-mono text-xs text-gray-500">
                {user._id}
              </td>

              <td className="px-6 py-4">
                {editableUserId === user._id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editableUsername}
                      onChange={(e) =>
                        setEditableUsername(e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button
                      onClick={() => updateHandler(user._id)}
                      className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition"
                    >
                      <FaCheck />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {user.username}
                    </span>
                    <button
                      onClick={() =>
                        toggleEdit(user._id, user.username)
                      }
                      className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-blue-600"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </td>

              <td className="px-6 py-4 text-gray-700">
                {user.email}
              </td>

              <td className="px-6 py-4 text-center">
                {user.isAdmin ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    <FaCheck /> Admin
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    User
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-center">
                {!user.isAdmin && (
                  <button
                    onClick={() => deleteHandler(user._id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 active:scale-95 transition"
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  )
}

export default UserList