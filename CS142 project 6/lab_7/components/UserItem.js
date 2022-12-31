import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Router from "next/router";

export default function UserItem({data}) {
    // useEffect(() => {
    //     fetch("http://127.0.0.1:5000/photosOfUser/:"+data._id)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setPhoto(data);
    //     });
    // })
    function handler(id) {
        console.log("click");
        Router.push({pathname: "../userPhotos", query: {id: data._id}});
    }

    return (
        <div className="h-72 w-[420px] mx-[3px] my-2 border rounded-lg flex" onClick={() => handler()}>
            <div className ="">
                <img src={data.image} width = {200} height={180} className = "rounded-lg h-72 border"></img>                 
            </div>
            <div>
                <p className="text-center my-2 text-xl">{data.name}</p>
                <p className="px-2">Genre: {data.genre}</p>  
                <p className="w-[250px] text-xs text-justify py-2 px-2 ">{data.description}</p>
            </div>
           
        </div>
    )
}