import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import Link from 'next/link'

export default function LoginPage() {


    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);


    function useSessionStorage() {
        if (username === "" || password === "") {
            toast("Нэвтрэх нэр эсвэл нууц үгээ оруулна уу?");
        }

        else {
            fetch("http://localhost:5000/login",
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password,
                    })
                })
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setLoading(false);
                    console.log(data);
                    if (data != null) {
                        Cookies.set("token", data._id, { expires: 1, secure: true, sameSite: 'strict', path: '/' });
                        Router.push({ pathname: '../home', query: { id: data._id, index: 0 } });

                    }
                    else toast("Нэвтрэх нэр эсвэл нууц үг буруу байна?");

                })

        }
    }
    function signUp() {

        Router.push({ pathname: "./sign_up" });
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
            <div className="w-96 h-4/6 bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg justify-center rounded-2xl flex flex-wrap content-center items-center">
                <div className="text-center text-6xl h-28 font-calistoga">Login</div>
                <input
                    className="w-80 h-12 rounded-3xl shadow-inner bg-white bg-opacity-40 border border-white px-3 my-2"
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => {
                        setUserName(e.target.value);
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
                />
                <button className="w-80 h-12 flex justify-end mt-2 px-3">Forget password</button>
                <button className="w-80 h-12  bg-[#A300A3] text-white rounded-3xl px-3" onClick={useSessionStorage}>Login</button>
                <p className="relative top-10">Dont have you account! <b onClick={() => signUp()}>Sign up</b></p>

            </div>
        </div>
    );
}