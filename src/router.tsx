import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { NavBar } from './common/ui/NavBar';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Profile } from './pages/Profile';
import { SignUp } from './pages/SignUp';
import { useAuthStore } from './store/auth';

export const Router = () => {
  const { user } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {user && (
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Outlet />
              </>
            }
          >
            <Route path="" element={<Main />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
