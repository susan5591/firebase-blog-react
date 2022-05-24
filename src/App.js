import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import List from './pages/List';
import Details from './pages/Details';
import './app.css'
import Home from './pages/Home';
import Update from './components/Update';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/list' element={<List />}/>
      <Route path='/details/:id' element={<Details />}/>
      <Route path='/update/:id' element={<Update />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
