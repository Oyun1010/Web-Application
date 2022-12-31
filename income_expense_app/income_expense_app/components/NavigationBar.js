import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import Cookies from "js-cookie";


export default function NavigationBar() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [user_id, setId] = useState(null);
    ;
    // const user_id = router.query.id;
    useEffect(() => { setId(Cookies.get("token")) }, []);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/user/" + user_id)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, [user_id]);

    function dashBoard() {

        Router.push({ pathname: './home', query: { id: user_id } });
    }
    function report() {
        Router.push({ pathname: './report', query: { id: user_id } });
    }
    function logout() {
        Cookies.remove("token");
        Router.push({ pathname: './login', query: { id: user_id } });
    }


    return (
        <div className="w-48 h-[97vh] my-2 rounded-r-3xl bg-white">
            <div>
                {
                    data && data.map((item, i) => {
                        return (
                            <div key={i}>
                                <div className="flex justify-center my-2 mt-16">
                                    <img src={item.profile} className="w-32 rounded-full" />
                                </div>
                                <p className="flex justify-center">{item.firstName}</p>
                            </div>

                        );
                    })
                }
            </div>
            <button onClick={() => dashBoard()} className="flex ml-5 mx-2 items-center h-10 w-36 hover:bg-[#edd2ed8f] rounded-xl px-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap ="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <p className="mx-2">Dashboard</p>
            </button>
            <button onClick={() => report()} className="flex ml-5 mx-2 items-center h-10 hover:bg-[#edd2ed8f] rounded-xl px-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap ="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                <p className="mx-2">Report</p>
            </button>
            <button onClick={() => logout()} className="relative top-[20em] flex ml-5 mx-2 items-center h-10 hover:bg-[#edd2ed8f] rounded-xl px-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap ="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>

                <p className="mx-2">Logout</p>
            </button>
        </div>
    )


}