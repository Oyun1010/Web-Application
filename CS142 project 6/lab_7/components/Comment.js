import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Comment({ data }) {
    const [getName, setName] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/user/" + data.user_id)
            .then(res => res.json())
            .then(data => {
                setName(data);
                setLoading(false);
            });

    }, [data]);
    return (
        <div className="w-72 flex mx-2 bg-slate-900 my-1 opacity-50 ">
            <div className="flex justify-between align-middle">
                {
                    getName && getName.map((item, i) => {
                        return (
                            <div key={i} className="">
                                <div className="flex">
                                    <img src={item.image} className="rounded-full h-[24px] w-[20px] mx-1 my-1"></img>
                                    <p className="my-1 mx-2">{item.name}</p>
                                </div>
                                <p className="my-1 mx-2">{data.comment}</p>
                                <p className="text-xs relative bottom-0 right-0 left-[18em]">{data.date_time.substring(0, 10)}</p>

                            </div>
                        );
                    })
                }
            </div>
        </div>

    );
}