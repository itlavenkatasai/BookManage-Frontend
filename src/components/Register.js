import React, { useState } from "react";
import { Link,Navigate,useNavigate } from "react-router-dom";
import registerBg from "../../images/books.avif";
import axios from "axios";
import SignIn from "./SignIn";


const Register = () => {
  const [registerFields, setRegisterFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const env = 'PROD';
  const publicMongoUrl = env === 'PROD' ? 'https://bookmanage-backend-nqsf.onrender.com' : 'http://localhost:3000';

  function validateForm() {
    const newErrors = {};
    if (!registerFields.name) newErrors.name = "name is required";
    if (!registerFields.email) newErrors.email = "email is required";
    if (!registerFields.password) newErrors.password = "password is required";
    if (!registerFields.confirmPassword)
      newErrors.confirmPassword = "confirmPassword is required";
    if (registerFields.password != registerFields.confirmPassword)
      newErrors.confirmPassword = "confirmPassword match with above password";
    return newErrors;
  }
  async function handleRegister(e) {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    try{
      await axios.post(`${publicMongoUrl}/register`,registerFields);
      setRegisterFields({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
      setError({});
      navigate("/login");
    }catch(error){
      console.log("Error registering user" , error);
      setError({genral:"Registration failed. Please try again."});
    }
  }
  return (
    <div id="total-container">
      <div id="twoparts" className="flex justify-between">
        <div
          id="left-container"
          className="w-7/12 h-screen "
          style={{
            backgroundImage: `url(${registerBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <div className="flex justify-center items-center h-screen ">
            <div id="form-container" className="w-6/12 bg-white rounded-3xl">
              <form className="px-8 py-3">
                <div className="flex justify-center pb-4">
                  <p className="font-bold font-serif text-2xl">
                    REGISTRATION FORM
                  </p>
                </div>
                <div>
                  <label className="font-serif">Name:</label>
                  <input
                    type="text"
                    className="border border-black w-full px-2 text-lg py-1.5 rounded-lg"
                    value={registerFields.name}
                    onChange={(e) => {
                      setRegisterFields({
                        ...registerFields,
                        name: e.target.value,
                      });
                    }}
                  ></input>
                  {error.name && (
                    <p className="text-red-500 font-serif">{error.name}</p>
                  )}
                </div>
                <div>
                  <label className="font-serif">E-mail:</label>
                  <input
                    type="text"
                    className="border border-black w-full px-2 text-lg py-1.5 rounded-lg"
                    value={registerFields.email}
                    onChange={(e) => {
                      setRegisterFields({
                        ...registerFields,
                        email: e.target.value,
                      });
                    }}
                  ></input>
                  {error.email && (
                    <p className="text-red-500 font-serif">{error.email}</p>
                  )}
                </div>
                <div>
                  <label className="font-serif">Password:</label>
                  <input
                    type="password"
                    className="border border-black w-full px-2 text-lg py-1.5 rounded-lg"
                    value={registerFields.password}
                    onChange={(e) => {
                      setRegisterFields({
                        ...registerFields,
                        password: e.target.value,
                      });
                    }}
                  ></input>
                  {error.password && (
                    <p className="text-red-500 font-serif">{error.password}</p>
                  )}
                </div>
                <div>
                  <label className="font-serif">ConfirmPassword:</label>
                  <input
                    type="password"
                    className="border border-black w-full px-2 text-lg py-1.5 rounded-lg"
                    value={registerFields.confirmPassword}
                    onChange={(e) => {
                      setRegisterFields({
                        ...registerFields,
                        confirmPassword: e.target.value,
                      });
                    }}
                  ></input>
                  {error.confirmPassword && (
                    <p className="text-red-500 font-serif">
                      {error.confirmPassword}
                    </p>
                  )}
                </div>
                {error.genral && <p className="text-center text-red-500 font-serif">{error.genral}</p>}
                <div className="py-2 flex justify-center">
                  <button
                    className="select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mx-3"
                    onClick={handleRegister}
                  >
                    REGISTER
                  </button>
                </div>
                <div>
                  <p className="text-center font-serif">
                    Already have an account?
                    <Link to="/login" className="text-blue-700 font-bold">
                      Login
                    </Link>{" "}
                    here
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="right-container" className="w-6/12  h-screen bg-gray-300">
          <div className="flex justify-center items-center h-screen">
            <div className="w-9/12 ">
              <p className="font-bold text-6xl text-center font-serif">
                Welcome
              </p>
              <p className="text-center text-gray-900 font-serif">
                Book Management System
              </p>
              <p className="text-center font-bold text-2xl font-serif">
                Please Register And Manage Your Books 📚
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
