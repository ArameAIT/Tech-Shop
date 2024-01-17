import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCart } from '../store/slice/cart'
import CartProduct from './CartProduct'
import { getToken } from '../store/slice/token'

function Cart() {
  const token = useSelector(getToken);
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  const [forBuying, setForBuying] = useState(false)

  const cartProducts = useSelector(getCart)

  const productsArray = cartProducts.map((product) => ({
    id: product.id,
    count: product.cartCount,
  }));

  const requestBody = {
    products: productsArray,
  };

  useEffect(() => {
    if (forBuying) {

      fetch("http://localhost:4000/basket/updateBasket", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(requestBody)
      }).then(res => res.json())
        .then((resp) => {
          console.log(resp);
        })
    }
    setForBuying(false)
  }, [forBuying])
  return (
    <div>
      <div className='flex flex-wrap justify-center items-center gap-5 mt-[20px]'>
        {cartProducts.map((prod) => {
          return <CartProduct key={prod.id} product={prod} />;
        })}
      </div>
      <div>
        <button onClick={() => setForBuying(true)} className='bg-blue-500 text-white'>Buy</button>
      </div>
    </div>
  )
}

export default Cart