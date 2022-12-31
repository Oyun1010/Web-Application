import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Expense from "../components/Expense";
import Income from "../components/Income";
import InsertItems from "../components/InsertItems";
import NavigationBar from "../components/NavigationBar";
import Cards from "../components/Cards";
import Router from "next/router";
import Cookies from "js-cookie";
import All from "../components/All";
import Link from "next/link";

export default function HomePage() {
    const router = useRouter();
    const user_id = router.query.id;

    const [data, setData] = useState(null);
    // const [user_id, setId] = useState(null);
    // useEffect(() => {setId(Cookies.get("token"))}, '');

    
    function allButton() {
        Router.push({ pathname: './home', query: { id: user_id, index: 0 } });   
    }

    function incomeButton() {
        Router.push({ pathname: './home', query: { id: user_id, index: 1 } });
        // Router.reload(window.location.pathname)
    }

    function expenseButton() {
        Router.push({ pathname: './home', query: { id: user_id, index: 2 } });
        // Router.reload(window.location.pathname)
    }

    return (
        <div className="flex justify-between">
            <NavigationBar />
            {/* <Sidebar /> */}
            <div className="mt-5 w-[55em] ml-4">
                <div className="text-3xl">Dashboard</div>
                <div className="flex justify-around bg-slate-200 my-6 mx-4 h-12 rounded-full items-center">
                    <button className="w-36 h-10 rounded-lg bg-[#B3CEE5] text-lg" onClick={() => allButton()}>Бүгд</button>
                    <button className="w-36 h-10 rounded-lg bg-[#B3CEE5] text-lg" onClick={() => incomeButton()}>Орлого</button>
                    <button className="w-36 h-10 rounded-lg bg-[#B3CEE5] text-lg" onClick={() => expenseButton()}>Зарлага</button>
                </div>
                <div className="w-[55em] flex justify-center">
                    {router.query.index == 0 ? <All /> : null}
                    {router.query.index == 1 ? <Income /> : null}
                    {router.query.index == 2 ? <Expense user_id={user_id} /> : null}
                </div>
            </div>
            <div className="">
                <Cards />
                <InsertItems />
            </div>
        </div>
    );
}