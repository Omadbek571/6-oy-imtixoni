import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false)


    const navigator = useNavigate()

    // validation emaildi
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // obshi validatsiya uchun
    function validate() {
        if (!validateEmail(emailRef.current.value)) {
            alert("Email is not valid");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        return true;
    }


    function handleLogin(event) {
        event.preventDefault()

        const isValid = validate();
        if (!isValid) {
            return;
        }

        const loginUser = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        setLoading(true)
        axios.post("https://fn27.vimlc.uz/login", loginUser, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        .then((response) => {
            console.log(response.data);
            if (response.data) {
                localStorage.setItem("token", response.data.accessToken)
                localStorage.setItem("user", JSON.stringify(response.data))
                navigator("/")
            }
            
                        
        })
        .catch((err) =>{
            console.log(err);
            
        })
        .finally(() =>{
            setLoading(true)
        })


    }
    return (
        <div className="flex flex-col w-full bg-slate-800 p-8 rounded-3xl max-w-md mx-auto border-4 border-slate-700 shadow-lg">
          <h1 className="text-white font-bold text-3xl text-center mb-5">LOGIN</h1>
      
          <form className="p-6 bg-slate-500 flex-col flex gap-6 rounded-xl mx-auto w-full border border-slate-600 shadow-md">
            <h3 className="block text-sm font-medium text-gray-300">EMAIL</h3>
            <input
              defaultValue={"omadbkmeksnfkk@gmai.com"}
              ref={emailRef}
              type="email"
              placeholder="Enter email..."
              className="mt-1 block w-full p-2 bg-transparent border-b-2 border-yellow-500 focus:outline-none focus:border-yellow-600 text-white"
            />
      
            <h3 className="block text-sm font-medium text-gray-300">PASSWORD</h3>
            <input
              defaultValue={"1234hksglsdyh"}
              ref={passwordRef}
              type="password"
              placeholder="Enter password..."
              className="mt-1 block w-full p-2 bg-transparent border-b-2 border-yellow-500 focus:outline-none focus:border-yellow-600 text-white"
            />
      
            <button
              disabled={loading}
              onClick={handleLogin}
              className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
              {loading ? "LOADING..." : "LOGIN"}
            </button>
      
            <Link className="mx-auto mt-4 text-gray-300 hover:text-green-400 transition duration-300" to="/register">
              Register
            </Link>
          </form>
        </div>
      )
      
}

export default Login