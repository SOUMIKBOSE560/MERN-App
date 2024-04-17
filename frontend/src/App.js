import UserForm from './components/userForm';
import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Read from './components/Read';
import Update from './components/Update';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Read/>}/>
        <Route exact path='/alluser' element={<Read/>}/>
        <Route exact path='/create' element={<UserForm/>}/>
        <Route exact path='/update/:id' element={<Update/>}/>
      </Routes>
      
      </BrowserRouter>
      
       
      </div>
   
    

  );
}

export default App;
