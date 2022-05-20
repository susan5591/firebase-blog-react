import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Form from './components/Form';
import List from './components/List';
import Details from './components/Details';

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
