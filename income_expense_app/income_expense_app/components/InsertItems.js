import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import Router from "next/router";

export default function InsertItems() {

    const [user_id, setUserID] = useState(null);
    const [expenseTypes, setExpenseTypes] = useState(null);
    const [incomeTypes, setIncomeTypes] = useState(null);
    const [expenseType, setExpenseType] = useState("");
    const [incomeType, setIncomeType] = useState("");
    const [loading, setLoading] = useState(false);
    const [incomeAmount, setIncomeAmount] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");

    useEffect(() => { setUserID(Cookies.get("token")) }, [])

    useEffect(() => {
        setLoading(false);
        fetch("http://localhost:5000/itypes")
            .then(res => res.json())
            .then(data => {
                setIncomeTypes(data);
                setLoading(false);
            });

    }, []);
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/etypes")
            .then(res => res.json())
            .then(data => {
                setExpenseTypes(data);
                setLoading(false);
            });
    }, [])

    const incomeChange = (event) => {
        setIncomeType(event.target.value);
        console.log(incomeType);
    }
    const expenseChange = (event) => {
        setExpenseType(event.target.value);
        console.log(expenseType);
    }

    const insertIncome = () => {
        fetch("http://localhost:5000/createIncome", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: incomeAmount,
                date_time: Date.now(),
                user_id: user_id,
                type: incomeType
            })
        }).then(() => {
            Router.reload(window.location.pathname)
        });
    }
    const insertExpense = () => {
        fetch("http://localhost:5000/createExpense", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: expenseAmount,
                date_time: Date.now(),
                user_id: user_id,
                type: incomeType
            })
        }).then(() => {
            Router.reload(window.location.pathname)
        });
    }

    return (
        <div className="ml-4">
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
            <div className="flex flex-col items-center my-2 justify-center w-96">
                <p className="h-10 w-96 rounded-xl px-2 py-2 text-lg text-left">Орлого бүртгэх</p>
                <input
                    className="w-96 h-10 rounded-3xl shadow-inner bg-white px-3 my-2"
                    type="text"
                    placeholder="Үнийн дүн оруулах"
                    value={incomeAmount}
                    onChange={(e) => { setIncomeAmount(e.target.value) }}
                />
                <select className="w-96 h-10 mx-2 rounded-3xl px-3 bg-white" onChange={incomeChange}>
                    <option value="select">Ангилал</option>
                    {
                        incomeTypes && incomeTypes.types && incomeTypes.types.map((item, i) => {
                            return (
                                <option key={i} value={item}>{item}</option>
                            );
                        })
                    }
                </select>
                <button onClick={insertIncome} className=" bg-[#A300A3] w-96 h-10 my-2 rounded-3xl text-white font-sans">Бүртгэх</button>

            </div>
            <div className="flex items-center my-2 justify-center flex-col w-96">
                <div className="h-10 w-96 rounded-xl px-2 py-2">Зарлага бүртгэх </div>
                <input
                    type="number"
                    className="w-96 h-10 rounded-3xl shadow-inner bg-white px-3 my-2"
                    placeholder="Үнийн дүн оруулах"
                    value={expenseAmount}
                    onChange={(e) => { setExpenseAmount(e.target.value) }}
                />

                <select className="w-96 h-10 mx-2 rounded-3xl px-3 bg-white" onChange={expenseChange}>
                    <option value="select">Ангилал</option>
                    {
                        expenseTypes && expenseTypes.types && expenseTypes.types.map((item, i) => {
                            return (
                                <option key={i} value={item}>{item}</option>
                            );
                        })
                    }
                </select>

                <button onClick={insertExpense} className="bg-[#A300A3] w-96 h-10 my-2 rounded-3xl text-white font-sans">Бүртгэх</button>

            </div>

        </div>
    )



}