import './App.css';

import { useEffect } from 'react';

import Router from './router';
import { me } from './services/auth';
import { useAuthStore } from './store/auth';

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    me().then((user) => setUser(user.data));
  }, [setUser]);

  return <Router />;
}

export default App;
