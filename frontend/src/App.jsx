import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";;
import { useAuthStore } from './store/authUser';
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import BorrowBook from "./pages/BorrowBook";
import ReturnBook from "./pages/ReturnBook";
import ManageBook from "./pages/ManageBook";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  // const { user, isCheckingAuth, authCheck } = useAuthStore();
  // console.log('user is here',user)

  // useEffect(() => {
	// 	authCheck();
	// }, [authCheck]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/borrow" element={<BorrowBook />} />
        <Route path="/profile/return" element={<ReturnBook />} />
        <Route path="/profile/manage-book" element={<ManageBook />} />

        {/* <Route path="/login" element={!user ? <Login /> : <Navigate to ={"/"} />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to ={"/"} />} />
        <Route path="/view" element={user ? <EventView /> : <Navigate to ={"/login"} />} />
        <Route path="/form"element={user ? <EventForm /> : <Navigate to ={"/login"} />} /> */}
      </Routes>
      <Toaster />
    </Router>
    
  );
}

export default App;
