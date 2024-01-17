import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCart, getCart } from '../store/slice/cart';

function CartProduct(info) {
    const product = info.product
    const [imageData, setImageData] = useState([]);

    const dispatch = useDispatch()
    if (product.photo !== null && imageData.length === 0) {
        setImageData(product.photo.data);
    }

    const cartProducts = useSelector(getCart)

    function increaseCount() {
        const updatedCart = cartProducts.map((prod) =>
            prod.id === product.id ? { ...prod, cartCount: prod.cartCount + 1 } : prod
        );
        dispatch(changeCart({ cart: updatedCart }));
    }

    function decreaseCount() {
        if (product.cartCount <= 1) {
            const updatedCart = cartProducts.filter((prod) => prod.id !== product.id);
            dispatch(changeCart({ cart: updatedCart }));
        } else {
            const updatedCart = cartProducts.map((prod) =>
                prod.id === product.id ? { ...prod, cartCount: prod.cartCount - 1 } : prod
            );
            dispatch(changeCart({ cart: updatedCart }));
        }
    }



    let dataUrl = "";
    if (imageData.length > 0) {
        const base64String = btoa(String.fromCharCode.apply(null, imageData));
        dataUrl = `data:image/jpeg;base64,${base64String}`;
    }
    return (
        <div className='group font-semibold cursor-pointer flex flex-col justify-center items-center border rounded-2xl p-5 w-[300px] hover:shadow-lg transition duration-300 ease-in-out'>
            <div className='w-[200px]  rounded-2xl '>
                {imageData.length > 0 ? (
                    <img src={dataUrl} className='rounded-2xl  h-[200px]' alt='Product' />
                ) : (
                    <img src='/public/download.png' className='rounded-2xl w-[200px]' alt='Default' />
                )}
            </div>
            <div>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.value}֏  դր․</p>
                <p>մնացել է {product.count} հատ</p>
            </div>
            <div>
                <div>Cart</div>
                <div className='flex gap-2 justify-center items-center '>
                    <button className='bg-blue-500 ' onClick={decreaseCount}>-</button>
                    {product.cartCount}
                    <button className='bg-blue-500 ' onClick={increaseCount}>+</button>
                </div>
            </div>

        </div >

    )
}

export default CartProduct