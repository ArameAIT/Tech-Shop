import React, { useState } from 'react';

function AdminProduct(info) {
    const [imageData, setImageData] = useState([]);

    if (info.info.photo !== null && imageData.length === 0) {
        setImageData(info.info.photo.data);
    }

    let dataUrl = "";
    if (imageData.length > 0) {
        const base64String = btoa(String.fromCharCode.apply(null, imageData));
        dataUrl = `data:image/jpeg;base64,${base64String}`;
    }
    const product = info.info
    console.log(product);
    return (
        <div className='border rounded-2xl p-5'>
            <div className='w-[200px] border rounded-2xl border-black'>
                {imageData.length > 0 ? (
                    <img src={dataUrl} className='rounded-2xl w-[300px] h-[130px]' alt='Product' />
                ) : (
                    <img src='/public/download.png' className='rounded-2xl w-[200px]' alt='Default' />
                )}
            </div>
            <div>
                <p>{product.id}</p>
                <p>{product.description}</p>
            </div>
            AdminProduct
        </div>
    );
}

export default AdminProduct;
