import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import toast from 'react-hot-toast';
import {FiSearch} from "react-icons/fi";
import {useDispatch} from "react-redux";
import FilterItem from './FilterItem';

const Home = () => {  

  const dispatch = useDispatch(); 

  const [productList, setProductList] = useState([]);
  const [searchItemName, setSearchItemName] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const onChange = (e) =>{
    let itemName = e.target.value;
    const regex = / [a-z]*[A-Z]/;
    if(!itemName){
      setSearchItemName(itemName);
    }else  if(itemName[0].toUpperCase() === itemName[0]){
        setSearchItemName(itemName);
    }
    else {
      if(regex.test(itemName)){
        setSearchItemName(itemName);
        console.log(true);
      } else{
        console.log(false);
      }
      setSearchItemName(itemName[0].toUpperCase() + itemName.slice(1));
    }
  }

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
        <input type="text" onChange={(e) => onChange(e)} placeholder='Search for products...' />
        <button onClick={searchItem}>
          <FiSearch />
        </button>
      </div>
      <div className="item-section">
        <div className="filter-section">
          <FilterItem title={"Colour"} filterOptions={["Black", "Blue", "Pink", "Green", "Red", "Grey", "Purple",
             "White", "Yellow"]} />
          <FilterItem title={"Gender"} filterOptions={["Men", "Women"]} />
          <FilterItem title={"Price"} filterOptions={["0 - Rs250", "Rs251 - Rs450", "Rs451 - Rs600"]} />  
          <FilterItem title={"Type"} filterOptions={["Polo", "Hoodie", "Basic"]} />  
        </div>
        <div className="itemList-section">
        { isSearch ? (
          productList.filter( item => 
            (item.color.includes(searchItemName) || item.type.includes(searchItemName) || item.name.includes(searchItemName))
          ).map( item => {
            return  <ProductCard key={item.id} name={item.name} price={item.price}
                    imgSrc={item.imageURL} id={item.id} maxQuantity={item.quantity} handler={addToCartHandler}  />
          })
        ) : (
          productList.map(item => {
            return  <ProductCard key={item.id} name={item.name} price={item.price}
                    imgSrc={item.imageURL} id={item.id} maxQuantity={item.quantity} handler={addToCartHandler}  />
          })
        )
        }
      </div>
      </div>
    </div>
  )
}

export default Home