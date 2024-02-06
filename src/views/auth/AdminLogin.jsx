import React, { useEffect, useState } from 'react'
import { PropagateLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { admin_login, messageClear } from '../../store/Reducers/authReducer'
import logo from '../../assets/logo.png'
import background from '../../assets/bg.jpg'
const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loader, errorMessage, successMessage } = useSelector(state => state.auth)
  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const submit = (e) => {
    e.preventDefault()
    dispatch(admin_login(state))
  }
  const overideStyle = {
    display: 'flex',
    margin: '0 auto',
    justifyContent: 'center',
    alignItems: "center",
  }
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
      navigate('/')
    }
  }, [errorMessage, successMessage])
  return (
    <div className=' w-full h-screen  bg-white flex items-center justify-center'>
      <div className='h-full w-full flex flex-wrap'>
        <div className=' w-2/5 flex justify-center items-center mx-auto'>
          <div className=' w-[450px] text-[#3a4d39] p-2 '>
            <div className=' p-4'>
              <div className='h-[150px] flex justify-center items-center'>
                <div className='w-[380px] h-[150px]'>
                  <img className='w-full h-full' src={logo} alt="logo" />
                </div>
              </div>

              <form onSubmit={submit}>
                <div className='flex flex-col gap-2 w-full mb-3'>
                  <label htmlFor="email">Email</label>
                  <input onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none   bg-[#D0E7D2] rounded-md text-[#3a4d39] overflow-hidden' type="text" name='email' placeholder='email' id='email' required />
                </div>
                <div className='flex flex-col gap-2 w-full mb-3'>
                  <label htmlFor="password">Password</label>
                  <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none   bg-[#D0E7D2] rounded-md text-[#3a4d39]  overflow-hidden' type="text" name='password' placeholder='password' id='password' required />
                </div>

                <button disabled={loader ? true : false} className='bg-[#739072] hover:bg-[#3a4d39] w-full text-white rounded-md px-7 py-2 my-3'>{loader ? <PropagateLoader color='#fff' cssOverride={overideStyle} /> : 'Login'}</button>

              </form>
            </div>
          </div>
        </div>
        <div className='w-3/5 md-lg:hidden'>
          <div className='w-full h-full relative'>
            <img className=' w-full h-full ' src={background} alt="" />
            <h2 className='text-4xl text-[#3a4d39] left-64 top-28  absolute'>Wellcome to Admin Login</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin