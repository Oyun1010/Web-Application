import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

export default function SignUpPage() {


    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [confirm_pass, setConfirmPass] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);


    function useSessionStorage() {
        if (username === "" || password === "" || email === "" || confirm_pass === "") {
            toast("Бүх талбарын утгыг оруулна уу?");
        }
        else if (password != "" && confirm_pass != "" && password != confirm_pass) {
            toast("Нууц үг таарахгүй байна.");
        }

        else {

            fetch("http://localhost:5000/register",
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        username: username,
                    })
                }).then(() => {
                    toast("Амжилттай бүртгэгдлээ.")
                    Router.push({ pathname: './login' });
                });


        }
    }
    function loginBtn() {
        Router.push({ pathname: "./login" });
    }




    return (
        <div className="h-screen w-screen bg-cover  flex justify-center items-center ">
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <form className="w-96 h-3/4 bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg justify-center rounded-2xl flex flex-wrap content-center items-center">
                <div className="text-center text-6xl h-24 font-calistoga">Sign up</div>


                <input
                    className="w-80 h-12 rounded-3xl shadow-inner bg-white bg-opacity-40 border border-white px-3 my-2"
                    type="text"
                    placeholder="Username"
                    value={username}
                    required
                    pattern="[A-Za-z]{1,32}"
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
                <input
                    className="w-80 h-12 rounded-3xl shadow-inner bg-white bg-opacity-40 border border-white px-3 my-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    className="w-80 h-12 rounded-3xl shadow-inner bg-white bg-opacity-40 border border-white px-3 my-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                    min={8}
                    maxLength={16}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
                <input
                    className="w-80 h-12 rounded-3xl shadow-inner bg-white bg-opacity-40 border border-white px-3 my-2"
                    type="password"
                    placeholder="Confirm password"
                    value={confirm_pass}
                    onChange={(e) => {
                        setConfirmPass(e.target.value);
                    }}
                    required
                   
                />
                <button className="w-80 h-12 mt-8  bg-[#A300A3] text-white rounded-3xl px-3" onClick={useSessionStorage}>Login</button>
                <p className="relative top-9">Already a user? <b onClick={() => loginBtn()}>Login</b></p>
            </form>
        </div>

    );
}