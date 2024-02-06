import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineGooglePlus } from "react-icons/ai";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { PropagateLoader } from 'react-spinners';
import { overideStyle } from '../../utils/utils'
import { messageClear, seller_register } from '../../store/Reducers/authReducer'
import toast from 'react-hot-toast'
import background from '../../assets/bg-seller.svg'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loader, successMessage, errorMessage } = useSelector(state => state.auth)

  const [state, setState] = useState({
    name: '',
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
    dispatch(seller_register(state))
  }
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
      navigate('/')
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  }, [successMessage, errorMessage])

  return (
    <div className=' min-w-screen min-h-screen bg-white flex items-center justify-center'>

      <div className='flex flex-wrap w-full h-full'>
        <div className='w-2/5 flex justify-center items-center mx-auto'>
          <div className=' w-[450px] text-[#3a4d39] p-2'>
            <div className=' p-4'>
              <h2 className='text-3xl flex justify-center mb-3'>Welcome to ecommerce</h2>
              <p className='text-sm mb-3'>Please register to your account and start your bussiness</p>

              <form onSubmit={submit}>
                <div className='flex flex-col gap-2 w-full mb-3'>
                  <label htmlFor="name">Name</label>
                  <input onChange={inputHandle} value={state.name} className='px-3 py-2 outline-none   bg-[#D0E7D2] rounded-md text-[#3a4d39] overflow-hidden' type="text" name='name' placeholder='name' id='name' required />
                </div>
                <div className='flex flex-col gap-2 w-full mb-3'>
                  <label htmlFor="email">Email</label>
                  <input onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none   bg-[#D0E7D2] rounded-md text-[#3a4d39] overflow-hidden' type="email" name='email' placeholder='email' id='email' required />
                </div>
                <div className='flex flex-col gap-2 w-full mb-3'>
                  <label htmlFor="password">Password</label>
                  <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none   bg-[#D0E7D2] rounded-md text-[#3a4d39] overflow-hidden' type="password" name='password' placeholder='password' id='password' required />
                </div>
                <div className='flex items-center gap-3 w-full mb-3'>
                  <input className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500' type="checkbox" name='checkbox' placeholder='checkbox' id='checkbox' required />
                  <label htmlFor="checkbox">I agree to privacy policy & terms</label>
                </div>
                <button disabled={loader ? true : false} className='bg-[#739072] hover:bg-[#3a4d39] w-full text-white rounded-md px-7 py-2 my-3'>{loader ? <PropagateLoader color='#fff' cssOverride={overideStyle} /> : 'Signup'}</button>
                <div className='flex items-center mb-3 gap-3 justify-center'>
                  <p>Already have an account ? <Link className=' hover:text-green-600' to='/login'>Sign in here</Link></p>
                </div>
                {/* <div className='w-full flex justify-center items-center'>
                  <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                  <div className='w-[10%] flex justify-center items-center'>
                    <span className='pb-1'>Or</span>
                  </div>
                  <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                </div>
                <div className='flex items-center justify-center gap-3'>
                  <div className='w-[35px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center items-center cursor-pointer overflow-hidden'>
                    <span><AiOutlineGooglePlus /></span>
                  </div>
                  <div className='w-[35px] h-[35px] flex rounded-md bg-sky-700 shadow-lg hover:shadow-sky-700/50 justify-center items-center cursor-pointer overflow-hidden'>
                    <span><FiFacebook /></span>
                  </div>
                  <div className='w-[35px] h-[35px] flex rounded-md bg-cyan-700 shadow-lg hover:shadow-cyan-700/50 justify-center items-center cursor-pointer overflow-hidden'>
                    <span><FiTwitter /></span>
                  </div>
                  <div className='w-[35px] h-[35px] flex rounded-md bg-black shadow-lg hover:shadow-black/50 justify-center items-center cursor-pointer overflow-hidden'>
                    <span><FaGithub /></span>
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
        <div className='w-3/5 md-lg:hidden'>
          <div className='w-full h-screen '>
            <img className=' w-full h-full ' src={background} alt="" />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register