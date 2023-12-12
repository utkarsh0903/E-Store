import React from 'react';
import {AiFillDelete} from "react-icons/ai"
import { useSelector } from 'react-redux';

const Cart = () => {

    const {cartItems} = useSelector(state=>state.cart)
  return (
    <div className='cart'>
        <main>

            {
                cartItems.length > 0 ? (
                    cartItems.map(i =>{
                        <CartItem
                            imgSrc="https://cdn.pixabay.com/photo/2019/02/16/08/34/shoes-3999844_1280.jpg" 
                            name = {"Black Shoes"}
                            price={120000} 
                            qty={1}
                            id="acascasc" 
                        /> 
                    })
                ) :
                <h1>No Items in Cart</h1>
            }
            {/* <CartItem
                imgSrc="https://cdn.pixabay.com/photo/2019/02/16/08/34/shoes-3999844_1280.jpg" 
                name = {"Black Shoes"}
                price={120000} 
                qty={1}
                id="acascasc" 
            />             */}
            
        </main>

        <aside>
            <h2>Subtotal : ${2000} </h2>
            <h2>Shipping : ${200} </h2>
            <h2>Tax : ${20} </h2>
            <h2>Total : ${2220} </h2>
        </aside>
    </div>
  )
}

const CartItem = ({imgSrc, name, price, qty, decrement, increment, deleteHandler, id}) => (
<div className="cartItem">
    <img src={imgSrc} alt={name} />
    <article>
        <h3>{name}</h3>
        <p>{price}</p>
    </article>
    <div>
        <button onClick={()=> decrement(id)}>-</button>
        <p>{qty}</p>
        <button onClick={()=> increment(id)}>+</button>
    </div>
    <AiFillDelete onClick={() => deleteHandler} />
</div>
)

export default Cart