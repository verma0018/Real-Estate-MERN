import { useSelector } from 'react-redux'
import {updateUSerStart, updateUSerSuccess, updateUSerFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function Profile() {
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{
      dispatch(updateUSerStart());
      const rest = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      const data = await rest.json();

      if(data.success === false){
        dispatch(updateUSerFailure(data.message));
        return;
      }
      dispatch(updateUSerSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
      dispatch(updateUSerFailure(error.message));
    }
  }

  const handleDeleteUser = async (e) =>{
    e.preventDefault();
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess());

    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='Profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input type="text" placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange} className='border p-3 rounded-md' />
        <input type="email" placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleChange} className='border p-3 rounded-md' />
        <input type="text" placeholder='password' id='password' defaultValue={currentUser.password} onChange={handleChange} className='border p-3 rounded-md' />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80'>{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User is Updated Successfully!' : ''}</p>
    </div>
  )
}
