import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import logoImg from "../imges/logo.png"
import bgImg from "../imges/register-fon.jpg"


function Home() {
  const [books, setBooks] = useState([]);
  const [minPages, setMinPages] = useState('');
  const [maxPages, setMaxPages] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchBooks();
  }, []);

  function fetchBooks(minPages = '', maxPages = '') {
    let url = "https://fn27.vimlc.uz/books";

    if (minPages && maxPages) {
      url = `https://fn27.vimlc.uz/books/filter?minPages=${minPages}&maxPages=${maxPages}`;
    }
    setLoading(true)
    axios.get(url)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      })

  }

  function handleRedirect(id) {
    navigate(`/books/${id}`);
  }

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleFilter() {
    fetchBooks(minPages, maxPages);
  }

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const filteredBooks = searchQuery.length > 2
    ? books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : books;

  return (
    <div className="container mx-auto p-4 text-white font-bold min-h-screen bg-cover" style={{ backgroundImage: `url(${bgImg})` }}>
     <header className='flex justify-between items-center bg-gradient-to-r from-yellow-400 to-yellow-500 p-5 rounded-xl shadow-lg'>
  <img className='w-14' src={logoImg} alt="logo-img" />
  <h3 
    className='cursor-pointer max-w-28 w-full py-3 px-6 text-white font-bold text-lg rounded-lg bg-yellow-600 shadow-md hover:bg-yellow-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300'
    onClick={handleLogout}
  >
    LOGOUT
  </h3>
</header>


      <main className='mt-10'>
        <div className='flex justify-between items-center'>
          <div>
            <input
              type="search"
              placeholder='QIDIRUV...'
              className='w-80 p-4 pr-12 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-black'
              value={searchQuery}
              onChange={handleSearchInputChange}
              />
          </div>
          <div className='gap-4 flex'>
            <input
              type="number"
              placeholder='Min pages'
              className='p-2 border rounded-xl text-black'
              value={minPages}
              onChange={(e) => setMinPages(e.target.value)}
              />
            <input
              type="number"
              placeholder='Max pages'
              className='p-2 border rounded-xl text-black'
              value={maxPages}
              onChange={(e) => setMaxPages(e.target.value)}
              />
            <button
              className='max-w-32 w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300'
              onClick={handleFilter}
              >
              Filter
            </button>
          </div>
        </div>
              {loading && <ClockLoader color="yellow" className="mt-12 mx-auto flex" />}

        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {filteredBooks.length > 0 && filteredBooks.map((book, index) => (
            <div
              className='flex flex-wrap flex-col w-52 mx-auto border-2 p-4 rounded-xl cursor-pointer h-82 bg-slate-400'
              onClick={() => { handleRedirect(book.id) }}
              key={index}
            >
              <img src={book.thumbnailUrl} alt="imges" />
              <h4>{book.title}</h4>
              <h4>Varogi: {book.pageCount}</h4>
              <h4>Id: {book.id}</h4>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
