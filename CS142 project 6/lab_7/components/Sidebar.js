import React  from "react";
import { useEffect } from "react";
import { useState } from "react";
import Router from "next/router";

export default function SideBar() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoading(true);
        if(loading) {
            fetch("http://localhost:5000/user/list")
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
        }
       
    },);

    function searchVal(e) {
        setSearch(e.target.value);
        console.log(search);
    }
    function handler(id) {
        console.log("click");
        Router.push({pathname: "../userPhotos", query: {id: id}});
    }

    return (
        <div className="w-56 h-[41em] my-2 mr-3 bg-white bg-opacity-10 rounded-xl">
            <div className="flex justify-center my-6 h-8">
                <input
                    type="text"
                    className="rounded-md px-2 mx-3"
                    value={search}
                    placeholder="Search"
                    onChange={(e) => searchVal(e)}                    
                />
            </div>
            {
                data && data.filter((val) => {
                    if(val == "") return val;
                    else if(val.name.toLowerCase().includes(search.toLowerCase())) return val;
                })
                .map((item, i) => {
                    return (
                        <div key={i} className = "flex mb-2 mx-1 rounded-xl hover:bg-slate-700" onClick={() => handler(item._id)}>
                            <img src= {item.image} className = "w-14 h-14 ml-1 rounded-3xl"></img>
                            <p className="mx-2 w-40">{item.name}</p>
                        </div>
                       
                    );
                })
            }
        </div>
    );
}