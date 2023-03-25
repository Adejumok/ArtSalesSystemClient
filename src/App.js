import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import NavBar from './layout/NavBar'
import ArtDB from './components/ArtsDB'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import AddArt from './arts/AddArt';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addArt' element={<AddArt/>}/>
        <Route path='/artDb' element={<ArtDB/>}/>
      </Routes>
    </>
  );
}

export default App;
