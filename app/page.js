"use client"// import { useState } from 'react';
import Header from '@/components/Header';
import { useState, useEffect } from "react"

export default function Home() {

  const [products, setProducts] = useState({})
  const [list, setList] = useState();
  const [dropdown, setDropdown] = useState();
  const [serachValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);


  const addProduct = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(products),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log({ response });

      // Handle the successful response, if needed
      const responseData = await response.json();
      console.log('Product added successfully:', responseData);
      getProducts();
      setProducts({})

      // You might want to update your local state or do other actions after a successful request

    } catch (error) {
      console.error('Error adding product:', error.message);
      // Handle errors as needed
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch('/api/product', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log('Product get successfully:', responseData);
      setList(responseData?.products);




    } catch (error) {
      console.error('Error getting products:', error.message);
    }
  }

  const handleChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value })
  }

  const handleSearch = async (e) => {
    setList([]);
    const temp = e.target.value
    setLoading(true);
    const response = await fetch('/api/search?query=' + temp, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log('Product get successfully:', responseData);
    setList(responseData?.products);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [])




  return (
    <>
      <Header />
      <div className="container bg-red-50 mx-auto my-6">
        <h1 className='text-3xl font-bold mb-6'>Search </h1>
        <div className='flex mb-6'>
          <input
            type="text"
            id="search"
            onChange={handleSearch}
            className=" border border-gray-300 px-4 py-2 flex-1"
            placeholder="Enter search term"
          // value={searchTerm}
          // onChange={handleInputChange}
          />

          <select
            id="categoryFilter"
            className="border border-gray-300 px-2 py-2"
            value={"0"}
          // onChange={handleCategoryChange}
          >
            <option key={"0"} value={"0"}>All</option>
            <option key={"1"} value={"1"}>category 1</option>
            <option key={"2"} value={"2"}>category 2</option>
          </select>

        </div>
      </div>

      <div className="container bg-red-50 mx-auto">
        <h1 className='text-3xl font-bold mb-6'>Add Stock </h1>

        {/* Form to add new stock */}
        <form >
          <div className='mb-4'>
            <label htmlFor='productName' className='block mb-2'>Product Name: </label>
            <input
              type="text"
              name="slug"
              id="slug"
              value={products?.slug || ""}
              className='w-full border border-gray-300 px-4 py-2'
              placeholder="Enter stock name"
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='quantity' className='block mb-2'>
              Quantity: </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={products?.quantity || ""}

              className='w-full border border-gray-300 px-4 py-2'
              placeholder="Enter quantity"
              onChange={handleChange}
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='price' className='block mb-2'>
              Price: </label>
            <input
              type="number"
              name="price"
              id="price"
              value={products?.price || ""}
              className='w-full border border-gray-300 px-4 py-2'
              placeholder="Enter price"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className='bg-blue-500 text-white px-4 py-2' onClick={addProduct}>Add Product</button>
        </form>
      </div>

      <div className="container bg-red-50 mx-auto my-6">
        <h1 className='text-3xl font-bold mb-6'>Current Stock </h1>

       
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Quantity</th>
              <th className='px-4 py-2'>Price</th>
            </tr>
          </thead>
          {loading && <svg
          width="100px"
          height="100px"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          className='item-center justify-center'
        >
          <circle cx="20" cy="20" r="45" stroke="#111111" stroke-width="5" fill="none">
            <animate
              attributeName="stroke-dasharray"
              values="1,200;89,200;89,200"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="0;-35;-124"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>}
          <tbody>

            {
              list?.map((product, index) => {
                return <tr key={product?.slug}>
                  <td className='border px-4 py-2'>{index + 1}</td>
                  <td className='border px-4 py-2'>{product?.slug}</td>
                  <td className='border px-4 py-2'>{product?.quantity}</td>
                  <td className='border px-4 py-2'>{product?.price}</td>
                </tr>
              })
            }
          </tbody>
        </table>

      </div>

    </>
  );
}
