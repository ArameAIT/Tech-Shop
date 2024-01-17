import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsLogin, getLogin } from '../store/slice/login'
import { getuserName } from '../store/slice/UserName'
import { Link } from 'react-router-dom'

function Header() {
  const isLogined = useSelector(getLogin)
  const userName = useSelector(getuserName)

  const dispatch = useDispatch()

  function handleButton() {
    dispatch(changeIsLogin({
      login: false
    }))
  }

  return (
    <div className='fixed top-0 left-0 right-0 border-blue-900 bg-blue-500 p-3 w-full text-white flex justify-between items-center'>
      <div className='text-[30px] flex items-center justify-center'>
        <div>
          <Link to={"/"}>
            <img src="/public/logo.jpg" className='w-[100px] rounded-full' />
          </Link>
        </div>
        <div className='ml-2'>
          <p className='text-[30px] border rounded-full text-blue-500 bg-white p-2'>Tech Shop</p>
        </div>
      </div>
      <div className='bg-white rounded-full p-[5px] cursor-pointer'>
        <Link to={"/cart"}>
          <img src="/public/cart.png" className='w-[90px] rounded-full' />
        </Link>

      </div>
      <div className=''>
        {
          userName && (
            <div className='text-[17px] mb-5'>Hello {userName}</div>
          )
        }
        {
          isLogined && (
            <div>
              <button onClick={handleButton} className='text-blue-500 p-1'>Log out</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Header