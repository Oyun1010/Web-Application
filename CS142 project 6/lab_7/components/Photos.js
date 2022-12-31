import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Comment from "./Comment";
import styles from "../styles/Detail.module.css"
import Router from "next/router";


export default function Photos({ data }) {
    const [click, setClick] = useState(false);
    const [input, setInput] = useState("");
    const [inputVal, setInputVal] = useState('');
    
    console.log(data._id);

    function photoClick() {
        setClick(true);
    }
    function closeBtn() {
        setClick(false);
    }

    function inChange(e) {
        setInputVal(e.target.value);
      
    }
    const useSessionStorage = () => {
        fetch("http://localhost:5000/insert/" + data._id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: inputVal,
                user_id: data.user_id,
                date_time: Date.now(),
            })
        }).then(()=>{
            Router.reload(window.location.pathname)
        });
        console.log(data.user_id)
       // Router.push({pathname: "./userPhotos", query: {id: data.user_id}});
    }

    return (
        <div className="flex">
            <div className="w-[380px] h-[420px] border border-white mx-2 my-4 rounded-2xl" onClick={() => photoClick()}>
                <img className="h-[380px] rounded-2xl" src={data.file_name}></img>
                <hr></hr>
                <p className="flex justify-center">{data.date_time.substring(0, 10)}</p>
            </div>
            {
                click ?
                    <div className="border rounded-xl my-4 h-[420px] bg-scroll">
                        {/* <p className="mx-4 text-xl justify-center align-middle my-4">{data.characters}</p> */}
                        {/* <hr></hr> */}
                        <div className="h-[300px] bg-scroll my-2 md:bg-fixed">
                            <div className="h-[300px] bg-scroll overflow-y-auto overflow-x-hidden">
                            {
                                data.comments && data.comments.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <Comment data={item} />
                                        </div>
                                    );
                                })
                            }
                            </div>
                            <div className="flex items-center my-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                </svg>

                                <input type="text" className="w-[220px] mx-2 h-10 rounded-xl border px-2" value={inputVal} onChange={(e) => inChange(e)} placeholder="Comment"></input>
                                <p className="text-xs my-2" onClick={useSessionStorage}>SEND</p>
                            </div>
                            <div onClick={() => closeBtn()} className="w-auto bg-white bg-opacity-10 flex items-center mx-3 px-2 h-8 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                </svg>
                            </div>
                        </div>
                    </div> :
                    null
            }
        </div>

    )
}