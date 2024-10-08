import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Details() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fn27.vimlc.uz/books/${params.id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err);

      });
  }, [params.id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white ">Детали продукта</h1>
      <Link to="/" className='w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300'>Главная страница</Link>
      {product ? (
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-2xl p-6 md:p-10 ">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <img className="w-full h-auto object-cover rounded-md shadow-md" src={product.thumbnailUrl} alt={product.title} />
          </div>
          <div className="md:w-2/3 md:ml-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4"><b>Названия:</b> {product.title}</h2>
            <h3 className="text-lg font-medium text-gray-700 mb-3"><b>Страницы:</b> {product.pageCount}</h3>
            <p className="text-gray-600 leading-relaxed"><b>Описание:</b> {product.longDescription || 'No description available'}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Загружается...</p>
      )}
    </div>
  );
}

export default Details;
