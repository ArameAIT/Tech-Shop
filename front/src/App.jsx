import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getLogin } from './store/slice/login'

function App() {
  // const [login, setLogin] = useState(false)
  const isLogin = useSelector(getLogin)
  console.log(isLogin);
  return (

    <div>
      {
        isLogin ? (
          <div>
            <p>Logined</p>
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
