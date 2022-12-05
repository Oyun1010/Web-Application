import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Router from "next/router";

// import styles from "./Header.module.css";
export default function Header() {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('../../api/variety')
        .then(res => res.json())
        .then(data => {
            setData(data);
            setLoading(false);
        })
    }, []);

    function handler(e) {
        console.log("Click: " + e);
        Router.push({pathname: "../variety/" + e});
        
    }
    function home() {
        Router.push({pathname : "/"});
    }

    return (
        <div>
            <h1 
                className = "text-6xl text-[#be4767] text-center font-Dancing_Script h-16 my-3"
                onClick={() => home()}
            >The Cocktail</h1>
            <hr></hr>
            <div className="flex justify-center">
                {
                    data && data.variety && data.variety.slice(0, 8).map((e, i) => {
                        console.log(e);
                        return (
                            <div key = {i}>
                                <button 
                                    className = "h-12 w-40 top-3 mx-2 px-1 border-r-2 my-1 text-2xs font-serif" 
                                    onClick = {() => handler(e)}>{e}</button>
                            </div>  
                        );                              
                    })
                }
            </div>
            
            </div>
    );
}