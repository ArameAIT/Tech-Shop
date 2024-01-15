import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/slice/token';
import { changeEdit, getEdit } from '../../store/slice/forEdit';

function AdminProduct(info) {
    const product = info.info
    const [imageData, setImageData] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [forEditReq, setForEditReq] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [value, setValue] = useState(product.value);
    const [count, setCount] = useState(product.count);
    const [category, setCategory] = useState(product.category);

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
                };                fetch(`http://localhost:4000/product/updateProduct/${product.id}`, {
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
    }, [forEditReq,selectedFile]);


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
                <p>{product.value} դր․</p>
            </div>
            <div className='mt-[20px] flex gap-[20px]'>
                <button
                    onClick={() => {
                        openPopup()
                        setForEditReq(true)
                    }} className='text-blue-500 hover:shadow-lg transition duration-300 ease-in-out'
                >
                    {/* <button className='text-blue-500 hover:shadow-lg transition duration-300 ease-in-out'>Delete</button> */}
                    Change
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
