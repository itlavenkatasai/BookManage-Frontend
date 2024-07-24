import axios from "axios";
import React, { useEffect, useState } from "react";

const BookInfo = ({
  updateBooks,
  setSearchResults,
  setFilteredBooks,
  showForm,
  onChange,
  books,
  setBooks,
  setEditBookIndex,
  setIsEditBook,
  isEditBook,
  editBookIndex,
  formFields,
  setFormFields,
}) => {
  const env = 'PROD';
  const publicMongoUrl = env === 'PROD' ? 'https://bookmanage-backend-nqsf.onrender.com' : 'http://localhost:3000';

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!formFields.title) newErrors.title = "Title is Required";
    if (!formFields.author) newErrors.author = "Author is Required";
    if (!formFields.genre) newErrors.genre = "Genre is Required";
    if (!formFields.year) newErrors.year = "Year is Required";
    return newErrors;
  }

  function formatDate(date) {
    const d = new Date(date);
    let day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    const year = d.getFullYear();

    if (day.length < 2) day = '0' + day;
    if (month.length < 2) month = '0' + month;

    return [year,month,day].join("-");
  }

  const handleDateChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setFormFields({ ...formFields, year: formattedDate });
  };

  async function editBook() {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.patch(
        `${publicMongoUrl}/books/${editBookIndex}`,
        formFields,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.log("error while editing", error);
      if (error.response) {
        console.log("Error data:", error.response.data);
      } else {
        console.log("Network error or server not reachable");
      }
    }
  }

  async function addBook() {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isEditBook) {
      await editBook();
      setIsEditBook(false);
      setEditBookIndex(null);
    } else {
      try {
        const authToken = localStorage.getItem("authToken");
        console.log(authToken);
        await axios.post(`${publicMongoUrl}/books`, formFields, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
      } catch (error) {
        console.error(
          "Error while sending book data",
          error.response ? error.response.data : error.message
        );
      }
    }
    await updateBooks();
    setFormFields({
      title: "",
      author: "",
      genre: "",
      year: "",
    });
    setErrors({});
    onChange();
  }

  if (!showForm) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="border border-gray-500 rounded-b-lg  w-full max-w-md mt-10 drop-shadow-lg">
          <div className=" bg-violet-700 flex flex-col">
            <button
              className="text-white text-3xl place-self-end "
              onClick={() => {
                onChange();
                setIsEditBook(false);
                setErrors({});
              }}
            >
              x
            </button>
            <h1 className="text-center font-sans text-cyan-50 font-bold  pb-2  text-2xl">
              Book Management System
            </h1>
          </div>
          <div>
            <form className="p-3 rounded-b-lg bg-slate-200 ">
              <div>
                <label className="text-lg mb-1">Title:</label>
                <input
                  type="text"
                  value={formFields.title}
                  className="border border-black rounded-lg w-full p-2 text-lg"
                  id="title"
                  placeholder="Enter Book Title"
                  onChange={(e) =>
                    setFormFields({ ...formFields, title: e.target.value })
                  }
                ></input>
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>
              <div>
                <label className="text-lg mb-1">Author:</label>
                <input
                  type="text"
                  value={formFields.author}
                  className="border border-black rounded-lg w-full p-2 text-lg"
                  id="author"
                  placeholder="Enter Author Name"
                  onChange={(e) =>
                    setFormFields({ ...formFields, author: e.target.value })
                  }
                ></input>
                {errors.author && (
                  <p className="text-red-500">{errors.author}</p>
                )}
              </div>
              <div>
                <label className="text-lg mb-1">Genre:</label>
                <input
                  type="text"
                  value={formFields.genre}
                  className="border border-black rounded-lg w-full p-2 text-lg"
                  id="genre"
                  placeholder="Enter Genre"
                  onChange={(e) =>
                    setFormFields({ ...formFields, genre: e.target.value })
                  }
                ></input>
                {errors.genre && <p className="text-red-500">{errors.genre}</p>}
              </div>
              <div>
                <label className="text-lg mb-1">Year:</label>
                <input
                  type="date"
                  value={formFields.year}
                  className="border border-black rounded-lg w-full p-2 text-lg"
                  id="year"
                  onChange={handleDateChange}
                ></input>
                {errors.year && <p className="text-red-500">{errors.year}</p>}
              </div>
              <div className="my-3 text-center flex justify-center space-x-2">
                <button
                  className="select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={() => {
                    onChange();
                    setIsEditBook(false);
                    setErrors({});
                  }}
                >
                  CANCEL
                </button>
                <button
                  className="select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={addBook}
                >
                  {isEditBook ? "EDIT BOOK" : "ADD BOOK"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookInfo;