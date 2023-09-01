import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle";
import Routes from 'pages/Routes'
import { AuthContext } from './context/AuthContext'
import { useState } from 'react';


function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <>
      <AuthContext.Provider value={[isAuth, setIsAuth]}>
      <Routes />
      </AuthContext.Provider>
    </>
  );
}

export default App;
