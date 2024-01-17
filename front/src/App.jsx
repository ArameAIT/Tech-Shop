import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getLogin } from './store/slice/login'
import { getIsAdmin } from './store/slice/isAdmin'
import AdminProducts from './components/admin/adminProducts'
import UserProducts from './components/user/UserProducts'

function App() {
  const isLogin = useSelector(getLogin)
  const isAdmin = useSelector(getIsAdmin)

  return (

    <div>
      {
        isLogin ? (
          <div>
            {
              isAdmin ?  (
                <div>
                <AdminProducts/>
                </div>
              ) : (
                <div>
                  <UserProducts/>
                </div>
              )
            }
          </div>
        ) : (
          <div >
            <Link to={"/login"}>
              <Login />
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default App
