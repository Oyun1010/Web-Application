import React  from "react";
import { useEffect } from "react";
import { useState } from "react";
import UserItem from "./UserItem";

export default function UserItems() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

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
       
    }, );

    return (
        <div className="w-auto flex flex-row flex-wrap">
            {
                data && data.map((item, i) => {
                    return (
                        <div key={i}>
                            <UserItem data={item}/>
                        </div>
                       
                    );
                })
            }
        </div>
    );
}