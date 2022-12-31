import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Header from '../components/Header'
import Photos from "../components/Photos";
import SideBar from "../components/Sidebar";

export default function UserDetails() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const id = router.query.id;

    const [info, setInfo] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/user/" + id)
            .then(res => res.json())
            .then(data => {
                setInfo(data);
                setLoading(false);
            })

    }, [id])

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/photosOfUser/" + id)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, [id]);

    return (
        <div>
            <Header/>
            <div className="flex mx-4">
                <SideBar />
                <div className="my-2">
                    <div className="w-full">
                        {info && info.map((item, i) => {
                            return (
                                <div className="flex">
                                    <div key={i} className="flex h-28 w-24 rounded-3xl">
                                        <img src={item.image} height={80} width={120} className="rounded-3xl" />
                                    </div>
                                    <div>
                                        <p className="text-2xl my-2 mx-2">{item.name}</p>
                                        {/* <p className="text-lg my-2 mx-2">{data.length} post</p> */}
                                    </div>
                                </div>
                            );
                        })
                        }
                    </div>
                    <div className="flex flex-wrap">
                        {
                            data && data.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <Photos data={item} />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}