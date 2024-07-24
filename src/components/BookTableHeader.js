import axios from "axios";
import { useState } from "react";

const BookTableHeader = ({updateBooks, setFilteredBooks,filteredBooks ,setShowForm, setFormFields , setIsEditBook , setEditBookIndex,setBooks,books}) => {
  console.log(filteredBooks);
  const env = 'PROD';
  const publicMongoUrl = env === 'PROD' ? 'https://bookmanage-backend-nqsf.onrender.com' : 'http://localhost:3000';

  async function deleteBook(id){
    try{
      const authToken = localStorage.getItem("authToken");
    await axios.delete(`${publicMongoUrl}/books/${id}`,{
      headers:{
        "authorization" : `Bearer ${authToken}`
      }
    });
    }catch(error){
      console.log("error while delete ",error);
    }
  }
  
  return (
    <>
    
    <div className="flex justify-center ">
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="border-collapse border border-black w-full text-left">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border border-black px-4 py-2">Title</th>
              <th className="border border-black px-4 py-2">Author</th>
              <th className="border border-black px-4 py-2">Genre</th>
              <th className="border border-black px-4 py-2">Year</th>
              <th className="border border-black px-4 py-2">Edit-Book</th>
              <th className="border border-black px-4 py-2">Delete-Book</th>
            </tr>
          </thead>
          <tbody className="bg-white">
           
           {
            !filteredBooks ? " " : filteredBooks.map((book,index)=>(
                 <tr key={book._id} className="text-center">
             <td className="border border-black px-4 py-2">{book.title}</td>
             <td className="border border-black px-4 py-2">{book.author}</td>
             <td className="border border-black px-4 py-2">{book.genre}</td>
             <td className="border border-black px-4 py-2">{book.year}</td>
             <td className="border border-black px-4 py-2 text-center">
               <button className="text-blue-500 font-bold" onClick={()=>{
                 
                 setShowForm(true);
                 setFormFields(book);
                 setIsEditBook(true);
                 setEditBookIndex(book._id);
                 
               }}>Edit</button>
             </td>
             <td className="border border-black px-4 py-2 text-center font-bold">
               <button className="text-red-500" onClick={async ()=>{
                await deleteBook(book._id);
                 
                await updateBooks();
                //  const Books = [...books];
                //  Books.splice(index,1);
                //  setBooks(Books);
                //  setFilteredBooks(Books);
               }}>Delete</button>
             </td>
           </tr>
             ))
           }
       </tbody>
        </table>
        
      </div>
    </div>
    </>
  );
};

export default BookTableHeader;