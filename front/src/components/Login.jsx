import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeIsLogin } from '../store/slice/login'
import { changeToken } from '../store/slice/token'
import { Link, Navigate } from 'react-router-dom'
import { changeIsAdmin } from '../store/slice/isAdmin'
import { changeUserName } from '../store/slice/UserName'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [forRequest, setforRequest] = useState(false)
    const [errorContext, setErrorContext] = useState("")
    const [isLogined, setIsLogined] = useState(false)

    const dispatch = useDispatch()

    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    useEffect(() => {
        fetch("http://localhost:4000/auth/login", {
            body: JSON.stringify({
                "email": email,
                "password": +password
            }),
            method: "POST",
            headers: headers
        }).then((resp) => {
            return resp.json()
        }).then((res) => {
            console.log(res);

            if (res.data !== null) {
                dispatch(changeIsLogin({
                    login: true
                }))
                dispatch(
                    changeToken({
                        token: res.data.token
                    })
                )
                setIsLogined(true)
                const name = res.data.message.split(" ").slice(1).join(" ")
                dispatch(changeUserName({
                    userName: name
                }))
            }
            if (res.error !== null) {
                if (res.error.message.email == undefined) {

                    setErrorContext(res.error.message)
                } else {
                    setErrorContext(res.error.message.email)
                }
            }
            if (res.isAdmin) {
                console.log(res.isAdmin);
                dispatch(changeIsAdmin({
                    isAdmin: res.isAdmin
                }))
            } else {
                dispatch(changeIsAdmin({
                    isAdmin: false
                }))
            }
        })
    }, [forRequest])

    function forButton() {
        setforRequest(prev => !prev)
    }
    if (isLogined) {
        return <Navigate to="/" />;
    }

    return (


        <div className='flex flex-col gap-7 justify-center items-center'>
            <div className='text-[60px] text-blue-950'>
                Login
            </div>
            <div className='flex flex-col gap-6 w-[340px]'>
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
                    Login
                </button>
                <p className='mt-[20px]'>
                    if you  don't have an account,
                    <span>

                        <Link className='text-blue-950' to={"/register"}>
                            sign up
                        </Link>
                    </span>
                </p>
            </div>
        </div>

    )
}

export default Login