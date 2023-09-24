import { Routes,Route, Navigate } from 'react-router-dom';
import  Home  from './pages/home/Home';
import  List  from './pages/list/List';
import  Hotel  from './pages/hotel/Hotel';
import { Login } from './login/Login';
import RegistrationForm from './registration/RegistrationForm';
// import { Reserve } from './components/reserve/Reserve';

const isAdmin=()=>{
  const userIsAdmin=true;
  return userIsAdmin;
}
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/hotels' element={<List/>} />
      <Route path='/hotels/:id' element={<Hotel/>} />
      <Route path='/login' element={<Login/>} />
      <Route path="/register" element={<RegistrationForm/>} />
    </Routes>
  )
}
export default App
