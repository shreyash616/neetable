import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './primary-routes/Login';
import Gallery from './primary-routes/Gallery';
import Header from './common-components/Header';
import Students from './primary-routes/Students';
import Clients from './primary-routes/Clients';

const App = () => {

  const { pathname } = useLocation()

  return <div className='h-100' style={{ backgroundImage: pathname !== '/login' && `url("https://images.saymedia-content.com/.image/t_share/MTc4NzM1OTc4MzE0MzQzOTM1/how-to-create-cool-website-backgrounds-the-ultimate-guide.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
    {pathname !== '/login' && <Header />}
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/gallery/:category' element={<Gallery />} />
      <Route path='/students' element={<Students />} />
      <Route path='/clients' element={<Clients />} />
      <Route path='/' element={<Navigate replace to="/login" />} />
      <Route path='*' element={<Navigate replace to="/login" />} />
    </Routes>
  </div>
}

export default App;
