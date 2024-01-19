import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/slice/token';
import { changeEdit, getEdit } from '../../store/slice/forEdit';
import Rating from '../Rating';
import { changeCart, getCart } from '../../store/slice/cart';
function UserProduct(info) {

    const product = info.info
    const [imageData, setImageData] = useState([]);
    const [forComments, setForComments] = useState(false)
    const [forAddComments, setForAddComments] = useState(false)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [forDelete, setForDelete] = useState(false)
    const [commentId, setCommentId] = useState("")
    const [productRating, setProductRating] = useState(0);
    const [forRating, setForRating] = useState(false)
    const [cartCount, setCartCount] = useState(0)
    const [user_id, setUser_id] = useState('')
    const token = useSelector(getToken);
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    });

    const dispatch = useDispatch()

    const editValue = useSelector(getEdit)

    useEffect(() => {
        fetch(`http://localhost:4000/comments/getComments/${product.id}`, {
            method: 'GET',
            headers: headers,
        })
            .then((res) => res.json())
            .then((resp) => {
                if (resp.data !== null) {
                    setComments(resp.data.comments)
                }
            });
    }, [forComments])

    useEffect(() => {

        if (forAddComments) {
            console.log(1);
            const requestBody = {
                comment: newComment,
                product_id: product.id
            }
            fetch(`http://localhost:4000/comments/addComment`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            })
                .then((res) => res.json())
                .then((resp) => {
                    if (resp.data !== null) {
                        setForComments(prev => !prev)
                        setUser_id(resp.data.user_id)
                    }
                });
            setForAddComments(false)
            setNewComment("")
        }
        if (forDelete && Number.isInteger(+commentId)) {
            fetch(`http://localhost:4000/comments/deleteComment/${+commentId}`, {
                method: 'DELETE',
                headers: headers,
            })
                .then((res) => res.json())
                .then((resp) => {
                    if (resp.data !== null) {
                        setForComments(prev => !prev)
                    }
                });
            setForDelete(false)

        }
    }, [forAddComments, forDelete])


    useEffect(() => {
        if (forRating) {
            const requestBody = {
                rating: productRating
            }
            fetch(`http://localhost:4000/product/rating/${product.id}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            })
                .then((res) => res.json())
                .then((resp) => {
                    if (resp.data !== null) {
                        dispatch(changeEdit({
                            edit: !editValue,
                        }));
                    }
                });
            setForRating(false)
        }
    }, [forRating])
    if (product.photo !== null && imageData.length === 0) {
        setImageData(product.photo.data);
    }

    const cartProducts = useSelector(getCart)
    function increaseCount() {
        setCartCount((prevCount) => prevCount + 1);

        const cartProductIndex = cartProducts.findIndex((prod) => prod.id === product.id);

        if (cartProductIndex === -1) {
            const cartProduct = {
                ...product,
                cartCount: 1,
            };
            dispatch(changeCart({
                cart: [...cartProducts, cartProduct],
            }));
        } else {
            const updatedCart = cartProducts.map((prod, index) =>
                index === cartProductIndex
                    ? { ...prod, cartCount: prod.cartCount + 1 }
                    : prod
            );
            dispatch(changeCart({
                cart: updatedCart,
            }));
        }
    }

    function decreaseCount() {
        if (cartCount <= 1) {
            const updatedCart = cartProducts.filter((prod) => prod.id !== product.id);
            setCartCount(0)
            dispatch(changeCart({
                cart: updatedCart,
            }));
        } else {
            setCartCount((prevCount) => prevCount - 1);

            const updatedCart = cartProducts.map((prod) =>
                prod.id === product.id
                    ? { ...prod, cartCount: prod.cartCount - 1 }
                    : prod
            );
            dispatch(changeCart({
                cart: updatedCart,
            }));
        }
    }



    let dataUrl = "";
    if (imageData.length > 0) {
        const base64String = btoa(String.fromCharCode.apply(null, imageData));
        dataUrl = `data:image/jpeg;base64,${base64String}`;
    }
    console.log(user_id);
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
                <p className=' text-gray-500'>{product.name}</p>
                <p className='text-[15px]'>{product.description}</p>
                <p>{product.value}֏  դր․</p>
                <p>մնացել է {product.count} հատ</p>
            </div>
            <button className='bg-blue-500 text-white mt-[10px]' onClick={() => setForComments(prev => !prev)}>Comments</button>
            {forComments && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Comments</h3>

                    {comments.length === 0 ? (
                        <p className="text-gray-500">No comments yet.</p>
                    ) : (
                        <ul className="list-disc pl-6">
                            {comments.map((comment, index) => (
                                <li key={index} className="mb-2">
                                    <div className='flex justify-between items-center'>

                                        <p className='flex justify-start items-start text-[15px]'>
                                            {comment.full_name}
                                        </p>

                                        {
                                            user_id == comment.user_id ? (

                                                <button onClick={() => {
                                                    setCommentId(comment.id)
                                                    setForDelete(true)
                                                }}
                                                    className={`p-1 text-[12px]  bg-red-400`}>Delete</button>
                                            ) : ""
                                        }
                                    </div>
                                    <p className='flex justify-start items-start ml-[10px] text-gray-500'>{comment.comment}</p>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-4">
                        <label htmlFor="newComment" className="block text-sm font-semibold mb-2">
                            Add a Comment:
                        </label>
                        <textarea
                            id="newComment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows="3"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        ></textarea>

                        <button
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                            onClick={() => {
                                setForAddComments(true)
                            }}
                        >
                            Add Comment
                        </button>
                    </div>
                </div>
            )}
            <div onClick={() => setForRating(true)}>

                <Rating rating={productRating} onRatingChange={setProductRating} info={product.rating} />
            </div>
            <div>
                <div>Cart</div>
                <div className='flex gap-2 justify-center items-center '>
                    <button className='bg-blue-500 ' onClick={decreaseCount}>-</button>
                    {cartCount}
                    <button className='bg-blue-500 ' onClick={increaseCount}>+</button>
                </div>
            </div>

        </div >
    );
}

export default UserProduct