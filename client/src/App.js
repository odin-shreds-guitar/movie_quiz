import './App.css';
import Main from './views/Main';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Reg from './components/Reg';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Main  default path="/"/>
        <Route path="/reg" element={<Reg/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
