import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';
export default function SignOut() {
  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading, setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit  = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const data =  await res.json();
      console.log("Data is: ",data);
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    }catch(error){
      console.log("Error is: ", error);
      setLoading(false);
      setError(error.message);
    }

  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="p-3 text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form className='flex flex-col gap-4'  onSubmit={handleSubmit}>
        <input type="text" className='border rounded-lg p-3 ' placeholder='username' id='username' onChange={handleChange}/>
        <input type="text" className='border rounded-lg p-3 ' placeholder='email' id='email' onChange={handleChange}/>
        <input type="text" className='border rounded-lg p-3 ' placeholder='password' id='password' onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error &&  <p className='text-red-600'>{error}</p>}

    </div>
  )
}
