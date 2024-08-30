import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Chats from './pages/Chats';

function App() {
  return (
   <>
   {/* <h1 className="bg-blue-50 px-3 text-center text-6xl font-normal">Let's Chat</h1> */}
    
<div className="App">
<Routes>

<Route path='/' element={<Home/>}/>
<Route path='/chats' element={<Chats/>}/>
 </Routes>
</div>
   
   </>
  );  
}
   
export default App;
