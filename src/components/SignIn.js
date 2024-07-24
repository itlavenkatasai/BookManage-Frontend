import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginBg from '../../images/books.avif';
import axios from 'axios';

const SignIn = () => {
    const [signInFields,setSignInFields] = useState({
        email:"",
        password:""
    });
    const env = '';
    const publicMongoUrl = env === 'PROD' ? 'https://bookmanage-backend-nqsf.onrender.com' : 'http://localhost:3000';

    const[error,setError] = useState({});
    function validateForm(){
        const newErrors = {};
        if(!signInFields.email) newErrors.email =  "email is required";
        if(!signInFields.password) newErrors.password = "password is required";
        return newErrors;
    }
    const navigate = useNavigate();
    async function handleLogIn(e){
        e.preventDefault();
        const validationErrors = validateForm();
        if(Object.keys(validationErrors).length > 0){
            setError(validationErrors);
            return;
        }
        try{
            const response = await axios.post(`${publicMongoUrl}/login`,signInFields);
            const authToken = response.data.data;
            // console.log(authToken);
            localStorage.setItem('authToken',authToken);
            setSignInFields({
                email:"",
                password:""  
            })
            setError({});
            navigate("/bookmanage");
        }catch(error){
            console.log("error while login" , error);
            setError({genral :"Login failed , please login again"});
        }
    }
  return (
    <div id='total-container'>
    <div id='twoparts' className='flex justify-between'>
        <div id='left-container' className='w-7/12  h-screen 'style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw'
      }}>
            <div className='flex justify-center items-center h-screen '>
            <div id='form-container' className='w-6/12 bg-white rounded-3xl'>
                <form className='px-8 py-3'>
                    <div className='flex justify-center pb-4'>
                        <p className='font-bold font-serif text-2xl'>LOGIN</p>
                    </div>
                   
                    <div>
                        <label className='font-serif'>E-mail:</label>
                        <input type='text' className='border border-black w-full px-2 text-lg py-1.5 rounded-lg'
                       value={signInFields.email}
                       onChange={(e)=>{
                            setSignInFields({...signInFields,email:e.target.value})
                        }}></input>
                        {error.email && <p className='text-red-500 font-serif'>{error.email}</p>}
                    </div>
                    <div>
                        <label className='font-serif'>Password:</label>
                        <input type='password' className='border border-black w-full px-2 text-lg py-1.5 rounded-lg'
                        value={signInFields.password}
                        onChange={(e)=>{
                            setSignInFields({...signInFields,password:e.target.value});
                        }}></input>
                        {error.password && <p className='text-red-500 font-serif'>{error.password}</p>}
                    </div>
                    {error.genral && <p className='text-center text-red-500 font-serif'>{error.genral}</p>}
                    
                    <div className='py-2 flex justify-center'>
                        <button type='submit' className='select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mx-3'
                        onClick={handleLogIn}>LOGIN</button>
                    </div>
                    <div>
                        <p className='text-center font-serif'>Don't have an account?<Link to="/register" className='text-blue-700 font-bold'>Register</Link> here</p>
                    </div>
                </form>
            </div>
            </div>
        </div>
        <div id='right-container' className='w-6/12  h-screen bg-gray-300'>
            <div className='flex justify-center items-center h-screen'>
            <div className='w-9/12 '>
                <p className='font-bold text-6xl text-center font-serif'>Welcome</p>
                <p className='text-center text-gray-900 font-serif'>Book Management System</p>
                <p className='text-center font-bold text-2xl font-serif'>Please Login And Manage Your Books 📚</p>
            </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default SignIn;
