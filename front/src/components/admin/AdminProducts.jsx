import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/slice/token';
import { changeProducts, getProducts } from '../../store/slice/products';
import AdminProduct from './AdminProduct';
import { getEdit } from '../../store/slice/forEdit';

function AdminProducts() {
  const token = useSelector(getToken);
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  const dispatch = useDispatch();

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState('');
  const [add, setAdd] = useState(false);
  const [filterCategory, setfilterCategory] = useState("phone")
  const [sortType, setSortType] = useState("asc")
  const [sortBy, setSortBy] = useState("value")
  const [search, setSearch] = useState("")
  const [maxValue, setMaxValue] = useState(900000)
  const [minValue, setMinValue] = useState(0)

  const forEdit = useSelector(getEdit)

  console.log(forEdit);
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    if (add && selectedFile) {
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
        };

        fetch('http://localhost:4000/product/addProduct', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(requestBody),
        })
          .then((res) => res.json())
          .then((resp) => {
            console.log(resp);
            setAdd(false);
          });
        setName("")
        setCategory("")
        setCount("")
        setDescription("")
        setValue("")
      };

      reader.readAsDataURL(selectedFile);
    }
  }, [add, selectedFile]);

  useEffect(() => {
    fetch(`http://localhost:4000/product/getProducts?page=1&pageSize=3&sortBy=${sortBy}&sortOrder=${sortType}&filterCategory=${filterCategory}&filterName=${search}&filterMaxPrice=${maxValue}&filterMinPrice=${minValue}`, {
      method: 'GET',
      headers: headers,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.data !== null && resp.data !== undefined) {
          dispatch(
            changeProducts({
              products: resp.data.products.products,
            })
          );
        }
        console.log('get');
      });
  }, [add, filterCategory, search, minValue, maxValue, sortBy, sortType,forEdit]);
  const products = useSelector(getProducts)



  return (
    <div className='flex flex-col justify-center items-center mt-[30px]'>
      <div className='flex justify-center items-center space-x-4'>
        <div className="flex flex-col">
          <label htmlFor="for-category">Category</label>
          <select
            onChange={(e) => setfilterCategory(e.target.value)}
            name="for-category"
            id="for-category"
            className="px-2 py-1 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
          >
            <option value='phone'>Phone</option>
            <option value='computer'>Computer</option>
            <option value='laptop'>Laptop</option>
            <option value='tablet'>Tablet</option>
            <option value='kitchen'>Kitchen</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="for-search">Search</label>
          <input
            type="text"
            name="for-search"
            id="for-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-1 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="for-max-value">Max Value</label>
          <input
            type="number"
            name="for-max-value"
            id="for-max-value"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            className="px-2 py-1 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="for-min-value">Min Value</label>
          <input
            type="number"
            name="for-min-value"
            id="for-min-value"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            className="px-2 py-1 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="for-sort-by">Sort By</label>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            name="for-sort-by"
            id="for-sort-by"
            className="px-2 py-1 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
          >
            <option value="value">Value</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="for-type">Sort Type</label>
          <select
            onChange={(e) => setSortType(e.target.value)}
            name="for-type"
            id="for-type"
            className="px-2 py-1 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
          >
            <option value="asc">From lower to upper</option>
            <option value="desc">From upper to lower</option>
          </select>
        </div>
      </div>

      <div className='flex flex-wrap justify-center items-center gap-5'>

        {products.map((prod) => {
          return <AdminProduct key={prod.id} info={prod} />;
        })}
        <div className='border rounded-2xl p-5'>
          <div className='w-[200px] h-[350px] rounded-2xl flex justify-center items-center'  onClick={openPopup}>
            <img src='/public/add-icon.png' className='w-[100px]' />
          </div>
        </div>
        {isPopupOpen && (
          <div className='flex flex-col font-semibold justify-center items-center text-black fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 p-6 rounded shadow-lg'>
            <div className='flex flex-col gap-3'>
              <label htmlFor='file'>File:</label>
              <input type='file' id='file' onChange={(e) => setSelectedFile(e.target.files[0])} className='mb-3' />

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
                setAdd(true);
                closePopup();
              }}
            >
              Add
            </button>
          </div>
        )}

        {isPopupOpen && <div onClick={closePopup} className='fixed top-0 left-0 w-full h-full bg-black opacity-50'></div>}
      </div>
    </div>
  );
}

export default AdminProducts;
