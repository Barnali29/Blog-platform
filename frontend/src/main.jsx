
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router'
import PostForm from './pages/PostForm.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Posts from './pages/Posts.jsx'
import PostDetails from './components/PostDetails.jsx'
import PostForAdmin from './pages/PostForAdmin.jsx'
import CategoryList from './pages/CategoryList.jsx'
import UserList from './pages/UserList.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>

      <Route path='' element={<PrivateRoute/>}>
      <Route path='/create-post' element={<PostForm/>}/>
      <Route path='/update-post/:id' element={<PostForm/>}/>
      <Route path='/all-posts' element={<Posts/>}/>
      <Route path='/post/:id' element={<PostDetails/>} />
      <Route path='/profile' element={<Profile/>}/>
      </Route>

      {/* admin only  */}
      <Route path='/admin' element={<AdminRoute/>}>
      <Route path='categories' element={<CategoryList/>}/>
      <Route path='posts' element={<PostForAdmin/>}/>
      <Route path='users' element={<UserList/>} />
      </Route>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
)
