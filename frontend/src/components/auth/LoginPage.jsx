import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authUser";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn } = useAuthStore();
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
        <Link to='/'>
          <img src='/netflix-logo.png' alt='logo' className='w-32 ' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='relative w-full max-w-md p-8 space-y-6 rounded-lg shadow-md'>
          +{" "}
          <div className='absolute inset-0 bg-zinc-200/10 backdrop-blur-md rounded-lg'></div>
          +{" "}
          <div className='relative z-10'>
            {" "}
            <h1 className='text-center text-white text-2xl font-bold mb-4'>
              Sign In
            </h1>
            <form className='space-y-4' onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor='email'
                  className='text-sm font-medium text-gray-300 block'
                >
                  Email
                </label>
                <input
                  type='email'
                  className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-transparent text-white outline-none autofill-fix'
                  placeholder='Bruce@batman.com'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='text-sm font-medium text-gray-300 block'
                >
                  Password
                </label>
                <input
                  type='password'
                  className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-transparent text-white outline-none autofill-fix'
                  placeholder='AlfredTheButtler'
                  id='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className='w-full py-3 px-2 bg-red-500 hover:bg-red-600 rounded-lg'
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "loggingin" : "login"}
              </button>
            </form>
            <div className='text-center text-gray-400 mt-5'>
              New User?{" "}
              <Link
                to='/auth/signup'
                className='text-red-500 hover:underline hover:text-red-600'
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
