import React from 'react'
import ProductCard from './ProductCard'
import toast from 'react-hot-toast';
import {useDispatch} from "react-redux";

const Home = () => {  

  const dispatch = useDispatch();

  const productList = [
    {
        name:"Mac Book",
        price: 120000,
        imgSrc:"https://www.reliancedigital.in/medias/Apple-MGN63HNA-Laptops-491946461-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxNzczNDJ8aW1hZ2UvanBlZ3xpbWFnZXMvaDVhL2gyZC85NDQzMDgzNTgzNTE4LmpwZ3xhYzRiNWIxZGQ2NjNiNWIyYjI0Y2ZkYTZlZWQ3MTFjZTMxYzVmNDBiNmM5Mzk5OTM2OGVkZmExMjMyYjIxNDQ4",
        id: "ascsacacsacasc",
    },
    {
        name:"Black Shoes",
        price: 1200,
        imgSrc:"https://cdn.pixabay.com/photo/2019/02/16/08/34/shoes-3999844_1280.jpg",
        id: "kqjkqjoiwo",
    }
  ]  

  const addToCartHandler = (options) => {
    console.log(options);
    toast.success("Added to cart");
    dispatch({
      type: "addToCart",
      payload : options,
    });
    dispatch({type: "calculatePrice" });
  };

  return (
    <div className='home'>
        {
            productList.map( i => {
              return  <ProductCard key={i.id} name={i.name} price={i.price}
                    imgSrc={i.imgSrc} id={i.id} handler={addToCartHandler}  />
            })
        }
    </div>
  )
}

export default Home