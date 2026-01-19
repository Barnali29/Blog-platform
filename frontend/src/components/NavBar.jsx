import {Link} from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/authSlice';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
function NavBar() {
  const {userInfo} =useSelector(state=>state.auth)
  const dispatch =useDispatch()
  const [showAdmin, setShowAdmin] = useState(false)

return (
  <header className="w-full border-b border-white/10 ">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
      
      {/* Logo */}
      <h1 className="text-2xl font-serif font-semibold tracking-tight text-white">
        Postory
      </h1>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        {[
          { name: "Home", path: "/home" },
          { name: "Posts", path: "/all-posts" },
          { name: "Write", path: "/create-post" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="relative text-gray-300 font-medium transition
                       hover:text-white
                       after:absolute after:left-0 after:-bottom-1 after:h-0.5
                       after:w-0 after:bg-white after:transition-all
                       hover:after:w-full"
          >
            {item.name}
          </Link>
        ))}

        {userInfo?.isAdmin && (
          <div className="relative">
  <span
    onClick={() => setShowAdmin((prev) => !prev)}
    className="cursor-pointer text-amber-400 font-medium
               hover:text-amber-300 transition select-none"
  >
    Admin
  </span>

  {showAdmin && (
    <div
      className="absolute right-0 mt-2 w-44 rounded-lg
                 bg-gray-900 border border-gray-700 shadow-lg z-50"
    >

      <Link
        to="/admin/categories"
        className="block px-4 py-2 text-sm text-gray-200
                   hover:bg-gray-800 hover:text-white"
      >
        Categories
      </Link>

      <Link
        to="/admin/posts"
        className="block px-4 py-2 text-sm text-gray-200
                   hover:bg-gray-800 hover:text-white"
      >
        Posts
      </Link>

      <Link
        to="/admin/users"
        className="block px-4 py-2 text-sm text-gray-200
                   hover:bg-gray-800 hover:text-white"
      >
        Users
      </Link>
    </div>
  )}
</div>

        )}

        {!userInfo && (
          <div className="flex items-center gap-3 ml-4">
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-300
                         hover:bg-white/10 hover:text-white transition"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="px-4 py-1.5 rounded-md text-sm font-medium text-black
                         bg-indigo-500 hover:bg-indigo-400 transition"
            >
              Sign up
            </Link>
          </div>
        )}
        {
          userInfo && 
         <div className='flex items-center justify-between'>
          <Link
  to="/profile"
  className="relative group flex items-center"
>
  <FaUser className="text-xl" />

  <span
    className="absolute -bottom-8 left-1/2 -translate-x-1/2
               whitespace-nowrap rounded-md bg-black px-2 py-1
               text-xs text-white opacity-0
               group-hover:opacity-100 transition"
  >
    Profile
  </span>
</Link>

          <button 
          onClick={()=>dispatch(logout())}
          className='px-4 py-1.5 rounded-md font-medium text-gray-300 hover:bg-white/10 hover:text-white transition'
          >
            Log Out 
            </button>

         
           </div> 
        }
      </nav>
    </div>
  </header>
);


}

export default NavBar