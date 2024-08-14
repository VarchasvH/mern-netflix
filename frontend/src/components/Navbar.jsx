import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const { setContentType } = useContentStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
      <div className='flex items-center gap-16 z-50'>
        <Link to='/'>
          <img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 ' />
        </Link>

        {/* desktop navbar items */}
        <div className='hidden md:flex gap-16 items-center'>
          <Link
            to='/'
            className='hover:underline'
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to='/'
            className='hover:underline'
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to='/history' className='hover:underline'>
            Search History
          </Link>
        </div>
      </div>

      <div className='flex gap-5 sm:gap-10 items-center z-50'>
        <Link to={"/search"}>
          <Search className='size-6 cursor-pointer' />
        </Link>
        <img
          src={user.image}
          alt='Avatar'
          className='h-8 rounded cursor-pointer '
        />
        <LogOut
          className='size-6 cursor-pointer hidden md:block'
          onClick={logout}
        />
        <div className='md:hidden'>
          <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
          <Link
            to={"/"}
            className='block hover:underline p-2'
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className='block hover:underline p-2'
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className='block hover:underline p-2'
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
          <Link className='block hover:underline p-2' onClick={logout}>
            Logout
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
