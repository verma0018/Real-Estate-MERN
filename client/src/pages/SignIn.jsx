import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signInStart , signInSuccess, signInFailure} from '../redux/user/userSlice'

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit  = async (e) => {
    e.preventDefault();
    try{
      dispatch(signInStart);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const data =  await res.json();
      console.log(data);
      if(data.success === false){
        dispatch(signInFailure)
        return;
      }
      dispatch(signInSuccess)
      navigate('/')
    }catch(error){
      dispatch(signInFailure)
    }

  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="p-3 text-3xl font-semibold text-center my-7">Sign In</h1>
      <form className='flex flex-col gap-4'  onSubmit={handleSubmit}>
        <input type="text" className='border rounded-lg p-3 ' placeholder='email' id='email' onChange={handleChange}/>
        <input type="text" className='border rounded-lg p-3 ' placeholder='password' id='password' onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error &&  <p className='text-red-600'>{error}</p>}

    </div>
  )
}
