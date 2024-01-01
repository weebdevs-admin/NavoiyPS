import './App.css';
import { Routes, Route } from 'react-router-dom'
import Main from './Pages/Main/Main'
import Abaut from './Pages/Abaut/Abaut'
import Contact from './Pages/Contact/ContactForm'
import Login from './Pages/Login/Login'
import LoginEdit from './Pages/LoginEdit/LoginEdit'
import Error from './Pages/Error/Error'
import News from './Pages/News/News'
import Photos from './Pages/Photos/Photos'
import Slider from './Pages/Slider/Slider'
import Iframe from './Pages/Iframe/Iframe'
import Team from './Pages/Team/Team'
import Partners from './Pages/Partners/Partners'
import { Provider } from './Context/Context';
import { useEffect } from 'react';
import {useLocation,useNavigate} from 'react-router-dom'

function App() {
  const token = window.localStorage.getItem('OpenDashboard')
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      if (location.pathname === '/login') {
        navigate(location.pathname);
      } else {
        navigate('/login'); // Token yo'q va login yoki registerdan boshqasiga o'tishi kerak
      }
    }
  }, [location.pathname, token]);
  return (
    
    <Provider>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/news' element={<News />}/>
        <Route path='/password' element={<LoginEdit />} />
        <Route path='/abaut' element={<Abaut />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/photos' element={<Photos />} />
        <Route path='/slider' element={<Slider />} />
        <Route path='/team' element={<Team />} />
        <Route path='/partners' element={<Partners />} />
        <Route path='/iframe' element={<Iframe />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </Provider>
  );
}

export default App;
