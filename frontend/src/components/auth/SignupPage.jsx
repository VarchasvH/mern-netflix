import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authUser";
const SignupPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isSigningUp } = useAuthStore();

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ email, password, username });
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
            <h1 className='text-center text-white text-2xl font-bold mb-4'>
              Sign Up
            </h1>
            <form className='space-y-4' onSubmit={handleSignup}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='username'
                  className='text-sm font-medium text-gray-300 block'
                >
                  Username
                </label>
                <input
                  type='text'
                  className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-transparent text-white outline-none autofill-fix'
                  placeholder='BruceWayne'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className='w-full py-3 px-2 bg-red-500 hover:bg-red-600 rounded-lg'
                disabled={isSigningUp}
              >
                {isSigningUp ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <div className='text-center text-white mt-5'>
              Already have an account?{" "}
              <Link
                to='/auth/login'
                className='text-red-500 hover:underline hover:text-red-600'
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
