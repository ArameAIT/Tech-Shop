import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/slice/token';
import { changeProducts, getProducts } from '../../store/slice/products';
import AdminProduct from './AdminProduct';

function AdminProducts() {

    const token = useSelector(getToken)
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    });

    const dispatch = useDispatch()

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState("")
    const [count, setCount] = useState("")
    const [category, setCategory] = useState("")
    const [add,setAdd] = useState(false)



    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };
    const formData = new FormData();

    useEffect(() => {
        fetch("http://localhost:4000/product/getProducts?page=2&pageSize=2", {
            method: "GET",
            headers: headers,
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                if (resp.data !== null && resp.data !== undefined) {
                    dispatch(changeProducts({
                        products: resp.data.products.products
                    }))
                }
            });
        if(add){
            fetch("http://localhost:4000/product/addProduct",{
                method : "POST",
                headers : headers,
                body : JSON.stringify({
                    name: name,
                    description: description,
                    value: +value,
                    count: +count,
                    category: category,
                    photo: formData
                })
            }).then((res) => {
                return res.json();
            })
            .then((resp) => {
               
                console.log(resp);
                setAdd(false)
            });
        }
    }, [add])

    function addProduct() {
        if (selectedFile) {
            formData.append('photo', selectedFile);
            setAdd(true)
        }
    }

    const products = useSelector(getProducts)
    return (
        <div className='flex justify-center items-center gap-5'>
            {
                products.map((prod) => {
                    return <AdminProduct key={prod.id} info={prod} />
                })
            }
            <div className='border rounded-2xl p-5'>
                <div className='w-[200px] h-[225px] rounded-2xl flex justify-center items-center'>
                    <img src="/public/add-icon.png" className='w-[100px]' onClick={openPopup} />
                </div>
            </div>
            {isPopupOpen && (
                <div className='flex flex-col font-semibold justify-center items-center text-black fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 p-6 rounded shadow-lg'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="file">File:</label>
                        <input type='file' id="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="mb-3" />

                        <label htmlFor="name">Name:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="mb-3" />

                        <label htmlFor="description">Description:</label>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="description" className="mb-3" />

                        <label htmlFor="value">Value:</label>
                        <input value={value} onChange={(e) => setValue(e.target.value)} type="number" id="value" className="mb-3" />

                        <label htmlFor="count">Count:</label>
                        <input value={count} onChange={(e) => setCount(e.target.value)} type="number" id="count" className="mb-3" />

                        <label htmlFor="category">Category:</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="mb-3" id="category">
                            <option value="phone">Phone</option>
                            <option value="computer">Computer</option>
                            <option value="laptop">Laptop</option>
                            <option value="tablet">Tablet</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="other">Other</option>
                        </select>
                    </div>


                    <button className='w-[100px]' onClick={() => {
                        addProduct(),
                            closePopup()
                    }
                    }>Add</button>
                </div>
            )}

            {isPopupOpen && (
                <div onClick={closePopup} className='fixed top-0 left-0 w-full h-full bg-black opacity-50' >
                </div>
            )}
        </div>
    )
}

export default AdminProducts