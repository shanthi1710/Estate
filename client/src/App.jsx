import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import Profile  from './pages/Profile';
import CeateListing  from './pages/CeateListing';
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";


export default function App() {
  return (
  <BrowserRouter>
  <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route  path="/search" element = {<Search/>}/>
      <Route path="/listing/:listingId" element={<Listing/>}/>
      <Route  element={<PrivateRoute/>}> 
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-listing" element={<CeateListing/>}/>
        <Route path="/update-listing/:listingId" element={<UpdateListing/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)}