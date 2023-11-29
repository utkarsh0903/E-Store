import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import {Toaster} from "react-hot-toast";

import "./styles/app.scss";

function App() {
  return <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />     
      <Route path="/cart" element={<Cart />} />     
    </Routes>
    <Toaster />
    <Footer />
  </Router>
}

export default App;
