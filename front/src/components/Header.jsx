import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsLogin, getLogin } from '../store/slice/login'
import { getuserName } from '../store/slice/UserName'

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
    <div className='border border-blue-900 bg-blue-500 p-3 w-full text-white flex justify-between items-center'>
      <div className='text-[30px] flex items-center justify-center'>
        <div>
          <img src="/public/logo.jpg" className='w-[100px] rounded-full' />
        </div>
        <div className='ml-2'>
          <p className='text-[30px]'>Tech Shop</p>
        </div>
      </div>
      <div>
        Search
      </div>
      <div>
        Cart

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
              <button onClick={handleButton} className='text-black p-1'>Log out</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Header