import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import loginImg from "../imges/login-icon.png"

function Register() {
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const ageRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const rePassworRef = useRef()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // validatsiya email
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // validatsiya password
    function validatePassword(pw) {
        return /[A-Z]/.test(pw) &&
            /[a-z]/.test(pw) &&
            /[0-9]/.test(pw) &&
            /[^A-Za-z0-9]/.test(pw) &&
            pw.length > 4;
    }

    // obshi validatsiya
    function validate() {
        if (firstnameRef.current.value.length < 3) {
            alert("Username-da hatolik mavjud");
            firstnameRef.current.focus();
            firstnameRef.current.style.outlineColor = "red";
            return false;
        }
        if (lastnameRef.current.value.length < 3) {
            alert("Surname-da hatolik mavjud");
            lastnameRef.current.focus();
            lastnameRef.current.style.outlineColor = "red";
            return false;
        }
        if (!validateEmail(emailRef.current.value)) {
            alert("Email-da hatolik mavjud");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        // if(!validatePassword(passwordRef.current.value)) {
        //     alert("Password da hatolik mavjud");
        //     passwordRef.current.focus();
        //     passwordRef.current.style.outlineColor = "red";
        //     return false;
        // }
        if (passwordRef.current.value !== rePassworRef.current.value) {
            alert("Password-lar mos kelmadi");
            return false;
        }

        return true;
    }

    function handlRegister(event) {
        event.preventDefault()

        const isValid = validate()
        if (!isValid) {
            return
        }

        const registerUser = {
            firstName: firstnameRef.current.value,
            lastName: lastnameRef.current.value,
            age: ageRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: rePassworRef.current.value
        }
        setLoading(true)
        axios.post("https://fn27.vimlc.uz/register", registerUser, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.data.message == "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi") {
                    navigate("/login")
                }

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
      <div className="flex flex-col w-full bg-slate-800 p-8 rounded-3xl max-w-2xl mx-auto border-4 border-slate-700 shadow-lg">
          <Link className="w-14 mb-5" to="/login">
              <img src={loginImg} alt="img" className="hover:opacity-80 transition duration-300" />
          </Link>
  
          <div className="flex items-center p-1">
              <h1 className="text-white font-bold text-2xl mx-auto text-center leading-tight">
                  НОВЫЙ АККАУНТ
              </h1>
          </div>
  
          <form className="p-6 bg-slate-500 flex-col flex gap-6 rounded-xl mx-auto w-96 border border-slate-600 shadow-md">
              <h3 className="block text-sm font-medium text-gray-300">ИМЯ</h3>
              <input
                  defaultValue={"Olimjonov"}
                  ref={firstnameRef}
                  type="text"
                  placeholder="Введите имя..."
                  className="mt-1 block w-full p-2 bg-transparent border-b-2 border-yellow-500 focus:outline-none focus:border-yellow-600 text-white"
              />
  
              <h3 className="block text-sm font-medium text-gray-300">ФАМИЛИЯ</h3>
              <input
                  defaultValue={"Omadbek"}
                  ref={lastnameRef}
                  type="text"
                  placeholder="Введите фамилию..."
                  className="mt-1 block w-full p-2 bg-transparent border-b-2 border-yellow-500 focus:outline-none focus:border-yellow-600 text-white"
              />
  
              <h3 className="block text-sm font-medium text-gray-300">ВОЗРАСТ</h3>
              <input
                  defaultValue={"16"}
                  ref={ageRef}
                  type="text"
                  placeholder="Введите возраст..."
                  className="mt-1 block w-full p-2 bg-transparent border-b-2 border-yellow-500 focus:outline-none focus:border-yellow-600 text-white"
              />
  
              <h3 className="block text-sm font-medium text-gray-300">EMAIL</h3>
              <input
                  defaultValue={"holtaaka@gmai.com"}
                  ref={emailRef}
                  type="email"
                  placeholder="Введите электронную почту..."
                  className="mt-1 block w-full p-2 bg-transparent border-b-2 border-yellow-500 focus:outline-none focus:border-yellow-600 text-white"
              />
  
              <h3 className="block text-sm font-medium text-gray-300">PASSWORD</h3>
              <input
                  defaultValue={"1234holtaaka"}
                  ref={passwordRef}
                  type="password"
                  placeholder="Введите пароль..."
                  className="mt-1 block w-full p-2 bg-transparent border-b-2 border-yellow-500 focus:outline-none focus:border-yellow-600 text-white"
              />
  
              <h3 className="block text-sm font-medium text-gray-300">RE PASSWORD</h3>
              <input
                  defaultValue={"1234holtaaka"}
                  ref={rePassworRef}
                  type="password"
                  placeholder="Повторите пароль..."
                  className="mt-1 block w-full p-2 bg-transparent border-b-2 border-yellow-500 focus:outline-none focus:border-yellow-600 text-white"
              />
  
              <button
                  disabled={loading}
                  onClick={handlRegister}
                  className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                  {loading ? "ЗАГРУЗКА..." : "РЕГИСТРАЦИЯ"}
              </button>
  
              <Link className="mx-auto mt-2 text-gray-300 hover:text-green-400 transition duration-300" to="/login">
                  Вход
              </Link>
          </form>
      </div>
  );
  
      
}

export default Register;
