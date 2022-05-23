import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Form from './pages/Form';
import List from './pages/List';
import Details from './pages/Details';
import './app.css'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Form />}/>
      <Route path='/list' element={<List />}/>
      <Route path='/details/:id' element={<Details />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
