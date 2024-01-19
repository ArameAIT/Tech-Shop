import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/slice/token';
import { changeProducts, getProducts } from '../../store/slice/products';
import { getEdit } from '../../store/slice/forEdit';
import UserProduct from './UserProduct';


function UserProducts() {
    const token = useSelector(getToken);
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    });

    const dispatch = useDispatch();

    const forEdit = useSelector(getEdit)

    const [filterCategory, setfilterCategory] = useState("phone")
    const [sortType, setSortType] = useState("desc")
    const [sortBy, setSortBy] = useState("value")
    const [search, setSearch] = useState("")
    const [maxValue, setMaxValue] = useState(900000)
    const [minValue, setMinValue] = useState(0)
    const [page, setPage] = useState(1)


    useEffect(() => {
        fetch(`http://localhost:4000/product/getProducts?page=${page}&pageSize=10&sortBy=${sortBy}&sortOrder=${sortType}&filterCategory=${filterCategory}&filterName=${search}&filterMaxPrice=${maxValue}&filterMinPrice=${minValue}`, {
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
    }, [filterCategory, search, minValue, maxValue, sortBy, sortType, forEdit, page]);
    const products = useSelector(getProducts)

    function increasePage() {
        setPage(page => page + 1)
    }
    function decreasePage() {
        if (page == 1) {
            return
        } else {
            setPage(page => page - 1)
        }
    }
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
                        <option value="desc">From upper to lower</option>
                        <option value="asc">From lower to upper</option>
                    </select>
                </div>
            </div>
            <div className='mt-[20px] flex justify-center items-center gap-5'>
                <button onClick={decreasePage} className='bg-blue-500 text-white'>-</button>
                <p>

                    {page}
                </p>
                <button onClick={increasePage} className='bg-blue-500 text-white'>+</button>

            </div>
            <div className='flex flex-wrap justify-center items-center gap-5 mt-[20px]'>

                {products.map((prod) => {
                    return <UserProduct key={prod.id} info={prod} />;
                })}
            </div>
        </div>
    );
}

export default UserProducts