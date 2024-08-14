import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import Footer from "./components/Footer";
import WatchPage from "./components/WatchPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import SearchPage from "./components/SearchPage";
import SearchHistoryPage from "./components/SearchHistoryPage";
import NotFoundPage from "./components/NotFoundPage";
function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className='h-screen '>
        <div className='flex justify-center items-center bg-black h-full'>
          <LoaderCircle className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/auth/login'
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path='/auth/signup'
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path='/watch/:contentType/:id'
          element={user ? <WatchPage /> : <Navigate to={"/auth/login"} />}
        />
        <Route
          path='/search'
          element={user ? <SearchPage /> : <Navigate to={"/auth/login"} />}
        />
        <Route
          path='/history'
          element={
            user ? <SearchHistoryPage /> : <Navigate to={"/auth/login"} />
          }
        />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}

export default App;
