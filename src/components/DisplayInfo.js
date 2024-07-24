import axios from "axios";
import React, { useEffect, useState } from "react";
import BookInfo from "./BookInfo";
import BookTableHeader from "./BookTableHeader";
import bgImage from "../../images/Library-Management-System.png";
import { useNavigate } from "react-router-dom";

const DisplayInfo = () => {
  const [searchBook, setSearchBook] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [formFields, setFormFields] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isEditBook, setIsEditBook] = useState(false);
  const [editBookIndex, setEditBookIndex] = useState(null);
  const navigate = useNavigate();
  const env = 'PROD';
  const publicMongoUrl = env === 'PROD' ? 'https://bookmanage-backend-nqsf.onrender.com' : 'http://localhost:3000';

  function filterData(searchBook, books) {
    const filteredData = books.filter((book) => {
      return book.title.toLowerCase().includes(searchBook.toLowerCase());
    });
    return filteredData;
  }
  async function updateBooks() {
    // const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${publicMongoUrl}/books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(response.data.data);
      // return
      setBooks(response.data.data);
      setFilteredBooks(response.data.data);
      setSearchResults("");
    } catch (error) {
      console.log("error while getting data", error);
    }
  }
  const handleLogoutBuuton = ()=>{
    localStorage.removeItem("authToken");
    navigate('/login');
  }
  useEffect(() => {
    (async function () {
      await updateBooks();
    })();
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div className="flex justify-center items-center py-5 mx-20 ">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={searchBook}
              className="py-2.5 px-3 text-lg rounded-lg border border-black"
              placeholder="Search Book By Name"
              onChange={(e) => {
                setSearchBook(e.target.value);
                setSearchResults("");
              }}
            ></input>
            <button
              className="select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mx-3"
              type="button"
              onClick={() => {
                const filteredData = filterData(searchBook, books);
                if (filteredData.length > 0) {
                  setFilteredBooks(filteredData);
                  setSearchResults("");
                } else {
                  setFilteredBooks([]);
                  setSearchResults("Books By This Name Not Found");
                }
              }}
            >
              Search Book
            </button>
            <div className="">
            <button
              class="select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => {
                if (books.length > 0) {
                  setFilteredBooks(books);
                  setSearchResults("");
                } else {
                  setSearchResults("No Books Found Please Add Books");
                }
              }}
            >
              SHOW ALL BOOKS
            </button>
          </div>
          <div>
            <button
              class="select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => setShowForm(true)}
            >
              ADD BOOK
            </button>
          </div>
          <div class="">
            <button
              class="select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleLogoutBuuton}
            >
              Log Out
            </button>
          </div>
          </div>
          
        </div>
        {searchResults && (
          <div className="my-3 text-red-500 font-bold  text-2xl flex justify-center items-center">
            {searchResults}
          </div>
        )}
        <BookInfo
          updateBooks={updateBooks}
          setFilteredBooks={setFilteredBooks}
          showForm={showForm}
          onChange={() => setShowForm(false)}
          books={books}
          setBooks={setBooks}
          setIsEditBook={setIsEditBook}
          setEditBookIndex={setEditBookIndex}
          isEditBook={isEditBook}
          editBookIndex={editBookIndex}
          formFields={formFields}
          setFormFields={setFormFields}
          setSearchResults={setSearchResults}
        />
        <BookTableHeader
          updateBooks={updateBooks}
          setShowForm={setShowForm}
          filteredBooks={filteredBooks}
          setEditBookIndex={setEditBookIndex}
          setIsEditBook={setIsEditBook}
          setFormFields={setFormFields}
          setBooks={setBooks}
          books={books}
          setFilteredBooks={setFilteredBooks}
        />
      </div>
    </>
  );
};

export default DisplayInfo;
