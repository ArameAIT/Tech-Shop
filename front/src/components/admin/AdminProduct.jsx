import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/slice/token';
import { changeEdit, getEdit } from '../../store/slice/forEdit';
import Rating from '../Rating';

function AdminProduct(info) {
    const product = info.info
    const [imageData, setImageData] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [forEditReq, setForEditReq] = useState(false)
    const [forDelReq, setForDelReq] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [value, setValue] = useState(product.value);
    const [count, setCount] = useState(product.count);
    const [category, setCategory] = useState(product.category);
    const [forComments, setForComments] = useState(false)
    const [forAddComments, setForAddComments] = useState(false)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [forDelete, setForDelete] = useState(false)
    const [commentId, setCommentId] = useState("")
    const [productRating, setProductRating] = useState(0);
    const [forRating, setForRating] = useState(false)


    const token = useSelector(getToken);
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    });
    const editValue = useSelector(getEdit)

    const dispatch = useDispatch()

    useEffect(() => {
        if (forEditReq && selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64StringUnSplit = reader.result;
                const base64String = base64StringUnSplit.split(',')[1];

                const requestBody = {
                    name: name,
                    description: description,
                    value: +value,
                    count: +count,
                    category: category,
                    photo: base64String,
                }; fetch(`http://localhost:4000/product/updateProduct/${product.id}`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(requestBody),
                })
                    .then((res) => res.json())
                    .then((resp) => {
                        console.log(resp);
                        dispatch(changeEdit({
                            edit: !editValue,
                        }));
                    });


            };

            reader.readAsDataURL(selectedFile);
        }

    }, [forEditReq, selectedFile]);

    useEffect(() => {
        if (forDelReq) {
            fetch(`http://localhost:4000/product/deleteProduct/${product.id}`, {
                method: 'DELETE',
                headers: headers,
            })
                .then((res) => res.json())
                .then((resp) => {
                    console.log(resp);
                    dispatch(changeEdit({
                        edit: !editValue,
                    }));
                });

        }
    }, [forDelReq])

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
    if (info.info.photo !== null && imageData.length === 0) {
        setImageData(info.info.photo.data);
    }

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    let dataUrl = "";
    if (imageData.length > 0) {
        const base64String = btoa(String.fromCharCode.apply(null, imageData));
        dataUrl = `data:image/jpeg;base64,${base64String}`;
    }
    console.log(productRating);
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
            </div>
            <button onClick={() => setForComments(prev => !prev)}>Comments</button>
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

                                        <button onClick={() => {
                                            setCommentId(comment.id)
                                            setForDelete(true)
                                        }}
                                            className='p-1 text-[12px] bg-red-400'>Delete</button>
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

            <div className='mt-[20px] flex gap-[20px]'>
                <button
                    onClick={() => {
                        openPopup()
                        setForEditReq(true)
                    }} className='bg-blue-500 text-white hover:shadow-lg transition duration-300 ease-in-out'
                >
                    Change
                </button>
                <button
                    onClick={() => {
                        setForDelReq(true)
                    }} className='text-white bg-red-400 hover:shadow-lg transition duration-300 ease-in-out'
                >
                    Delete
                </button>
            </div>
            {
                isPopupOpen && (
                    <div className='flex flex-col font-semibold justify-center items-center text-black fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 p-6 rounded shadow-lg'>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor='file'>File:</label>
                            <input type='file' id='file' onChange={(e) => setSelectedFile(e.target.files[0])} className='mb-3' />
                            <p className='text-[13px]'>you must select the picture every time when you
                                <br />
                                want to change the product</p>

                            <label htmlFor='name'>Name:</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type='text' id='name' className='mb-3' />

                            <label htmlFor='description'>Description:</label>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} type='text' id='description' className='mb-3' />

                            <label htmlFor='value'>Value:</label>
                            <input value={value} onChange={(e) => setValue(e.target.value)} type='number' id='value' className='mb-3' />

                            <label htmlFor='count'>Count:</label>
                            <input value={count} onChange={(e) => setCount(e.target.value)} type='number' id='count' className='mb-3' />

                            <label htmlFor='category'>Category:</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className='mb-3' id='category'>
                                <option value='phone'>Phone</option>
                                <option value='computer'>Computer</option>
                                <option value='laptop'>Laptop</option>
                                <option value='tablet'>Tablet</option>
                                <option value='kitchen'>Kitchen</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>

                        <button
                            className='w-[100px]'
                            onClick={() => {
                                closePopup();
                            }}
                        >
                            Add
                        </button>
                    </div>
                )
            }

            {isPopupOpen && <div onClick={closePopup} className='fixed top-0 left-0 w-full h-full bg-black opacity-50'></div>}

        </div >
    );
}


export default AdminProduct;
