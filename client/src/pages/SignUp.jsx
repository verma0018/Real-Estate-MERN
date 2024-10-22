import { Link } from 'react-router-dom';
export default function SignOut() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="p-3 text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" className='border rounded-lg p-3 ' placeholder='username' id='username'/>
        <input type="text" className='border rounded-lg p-3 ' placeholder='email' id='email'/>
        <input type="text" className='border rounded-lg p-3 ' placeholder='password' id='passowrd'/>
        <button className="bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80">Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
