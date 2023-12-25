import React from 'react'

const ProductCard = ({name, id, price, handler, imgSrc, maxQuantity}) => {
  return (
    <div className='productCard'>
        <img src={imgSrc} alt={name} />
        <p>{name}</p>
        <h4>${price}</h4>
        <button onClick={()=>handler({name, id, price, quantity:1, imgSrc, maxQuantity})} >Add to cart</button>
    </div>
  )
}

export default ProductCard