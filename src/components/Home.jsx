import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import toast from 'react-hot-toast';
import {FiSearch} from "react-icons/fi";
import {useDispatch} from "react-redux";

const Home = () => {  

  const dispatch = useDispatch(); 

  const [productList, setProductList] = useState([]);
  const [searchItemName, setSearchItemName] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const searchItem = () => {
    console.log(searchItemName);
    setIsSearch(true);
  }

  const addToCartHandler = (options) => {
    toast.success("Added to cart");
    dispatch({
      type: "addToCart",
      payload : options,
    });
    dispatch({type: "calculatePrice" });
  };

  useEffect(() => {
    const apiUrl = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';

    fetch(apiUrl).then((response) => response.json()).then((data) => {
      console.log(data);
      setProductList(data);
    })
  
    
  }, [])
  

  return (
    <div className='home'>
      <div className="search-bar">
        <input type="text" onChange={(e) => {
            setSearchItemName(e.target.value)
          }} placeholder='Search for products...' />
        <button onClick={searchItem}>
          <FiSearch />
        </button>
      </div>
      <div className="itemList">
        {
            productList.map( i => {
              return  <ProductCard key={i.id} name={i.name} price={i.price}
                    imgSrc={i.imageURL} id={i.id} maxQuantity={i.quantity} handler={addToCartHandler}  />
            })
        }
      </div>
    </div>
  )
}

export default Home