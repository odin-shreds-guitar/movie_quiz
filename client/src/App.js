import './App.css';
import Main from './views/Main';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Reg from './components/Reg';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Results from './components/Results';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Route  default path="/" element={<Main/>}/>
        <Route path="/reg" element={<Reg/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/results/:correctNum/:totalNum" element={<Results/>}/>
        <Route path="/user/:id" element={<UserProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
