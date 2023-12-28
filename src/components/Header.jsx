import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FiShoppingBag, FiSearch} from "react-icons/fi";
import { useSelector } from 'react-redux';

const Header = () => {

  const {cartItems} = useSelector(state => state.cart);
  const [searchItemName, setSearchItemName] = useState("");

  const searchItem = () => {
    console.log(searchItemName);
  }

  return <nav>
    <h2>Logo</h2>
    <div className="search-bar">
      <input type="text" onChange={(e) => {
          setSearchItemName(e.target.value)
        }} placeholder='Search' />
      <button onClick={searchItem}>
        <FiSearch />
      </button>
    </div>
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/cart"}>
        <FiShoppingBag />
        <p>{cartItems.length}</p>
      </Link>
    </div>
  </nav>
}

export default Header