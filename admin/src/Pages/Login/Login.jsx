import React from 'react'
import './Login.scss'
import { toast, ToastContainer } from 'react-toastify'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [data, setData] = useState([])
  const login = useRef()
  const pasword = useRef()
  useEffect(() => {
    fetch('http://localhost:4100/login')
      .then(res => res.json())
      .then(ResData => {
        ResData && ResData.map((element) => {
          setData(element)
        })
      })
  }, [])
  const navigate = useNavigate()
  function handlerBtn() {
    if (login.current.value === data.Login && pasword.current.value === data.Password) {
      window.localStorage.setItem('OpenDashboard', login.current.value)
      navigate('/')
    } else {
      toast.error('Login yoki Parol Xato')
    }
  }
  return (
    <>
      <ToastContainer />
      <form className="login-form">
        <h3 className="title">Kirish</h3>
        <input ref={login} type="text" placeholder='Login' />
        <input ref={pasword} type="password" placeholder='Parol' />
        <button type='button' onClick={handlerBtn}>Kirish</button>
      </form>
    </>
  )
}

export default Login
