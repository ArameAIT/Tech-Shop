import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [forRequest, setForRequest] = useState(false)
  const [toLogin, setToLogin] = useState(false)
  const [errorContext, setErrorContext] = useState("")

  const headers = new Headers({
    'Content-Type': 'application/json',
  });


  useEffect(() => {
    if (password !== "") {
      fetch("http://localhost:4000/auth/register", {
        body: JSON.stringify({
          "email": email,
          "password": +password,
          "full_name": fullName
        }),
        method: "POST",
        headers: headers
      }).then((resp) => {
        return resp.json()
      }).then((res) => {
        console.log(res);
        if (res.data !== null) {
          setToLogin(true)
          setErrorContext(res.error.message)
        } if (res.error !== null) {
          if (res.error.message.email == undefined) {

            setErrorContext(res.error.message)
          } else {
            setErrorContext(res.error.message.email)
          }
        }
      })
    }
  }, [forRequest])

  function forButton() {
    setForRequest(prev => !prev)
  }

  if (toLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className='flex flex-col gap-7 justify-center items-center'>
        <div className='text-[60px] text-blue-950'>
          Register
        </div>
        <div className='flex flex-col gap-6 w-[340px]'>
          <label htmlFor="for-text">Full Name</label>
          <input
            className='border rounded-xl border-black h-[30px] '
            type="text"
            name='for-text'
            id='for-text' value={fullName}
            onChange={(e) => setFullName(e.target.value)} />
          <label htmlFor="for-email">Email</label>

          <input
            className='border rounded-xl border-black h-[30px] '
            type="email"
            name='for-email'
            id='for-email' value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="for-password">Password</label>

          <input
            className='border rounded-xl border-black h-[30px]'

            type='number'
            name="for-password"
            id="for-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {
          errorContext ? (
            <div>
              {errorContext}
            </div>
          ) : ""
        }
        <div>
          <button onClick={forButton} className=' bg-blue-950 text-white'>
            Register
          </button>
          <p className='mt-[20px]'>
            if you already have an account,
            <span>

              <Link className='text-blue-950' to={"/login"}>
                login
              </Link>
            </span>
          </p>
        </div>
      </div></div>
  )
}

export default Register