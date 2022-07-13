import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import AddUser from "./pages/AddUser/AddUser"
import About from "./pages/About"
import View from "./pages/View/View"
import Navbar from "./components/Navbar/Navbar"
import Search from "./pages/Search/Search"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
    <Router>
       <div className="App">
        <Navbar />
         <h2>React Firebase Crud App</h2>  
         <ToastContainer position="top-center"/> 
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/addUser" element={<AddUser />}/>
          <Route path="/editUser/:id" element={<AddUser />}/>
          <Route path="/about" element={<About />}/>
          <Route path='/view/:id' element={<View/>} />
          <Route path="/search" element={<Search />} />
      </Routes>
      </div>
    </Router>
   
  );
}

export default App;
