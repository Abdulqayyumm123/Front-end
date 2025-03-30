
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Categories from './components/categories';
import About from './components/about';
import Home from './components/home';
import Contact from './components/contact';
import Detail from './components/detail';
import Userdashboard from './components/userdashboard';
import MainLayouts from './layouts/mainlayouts';
import SearchResults from './components/searchresult';
import { useSelector } from 'react-redux';
import ForOFor from './components/for-o-for';
function App() {
  let  { loggedIn } = useSelector((state)=>state.Login)
  return (
    <>    
      <Routes>
        <Route path="/" element={<MainLayouts />} >
        <Route index element={<Home/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/categories/:cid" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="search-results" element={<SearchResults/>}/>
        <Route path="/posting/:id" element={<Detail/>} /> 
        <Route path="/category/:cid/" element={<Categories/>} /> 
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path='*' element={<ForOFor/>}/>
        </Route>
      </Routes>

    </>
  );
}

export default App;