import React from "react";
import Router from "next/router";


export default function WineItem({data}) {
  
    function buttonClick(){
        console.log("click");
        Router.push({pathname: "../wine_detail/WineDetail", query : data});  
    }

    return (
        <div className = "relative w-96 my-4 mx-4 h-96 border border-gray-500 border-solid rounded-2xl text-justify">
            <p className = "w-12 h-12 relative -top-6 -left-6 border bg-black rounded-full text-[#fff] text-xl text-center align-middle py-2 font-Dancing_Script font-bold">{data.price}$</p>
            <h3 className = "text-center text-xl px-2 font-bold relative -top-4">{data.title}</h3>
            <p className = "px-3 py-2 text-justify relative -top-4 font-serif">{data.description}</p>   
            <button className = "absolute bottom-3 right-3 h-8 w-20 rounded-lg bg-gray-100" onClick = {buttonClick} >Details</button>
            
            
        </div>
    );
}