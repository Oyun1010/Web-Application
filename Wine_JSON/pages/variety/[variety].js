import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import WineItem from "../../components/WineItem";
import Header from "../../components/Header";
import SearchItem from "../../components/SearchItem";

export default function Variety() {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState();
    const router = useRouter();
    const {variety} = router.query;
    

    useEffect(() => {
        setLoading(true);
        fetch("../api/variety/" + variety)
        .then(res => res.json())
        .then(data => {
            setData(data);
            setLoading(false)
        });
    }, [variety]);

    return (
        <div>
            <Header/>
            <hr></hr>
            <SearchItem/>            
            <h1 className = "mx-24 my-6 text-3xl font-arimu_madurai">{variety}</h1>
            <div className = "flex w-auto flex-wrap justify-center">
                {
                    data && data.data && data.data.map((item, i) => {
                        return(
                            <div key={i} className = "flex-row">
                                <WineItem data={item}></WineItem>
                            </div>                  

                        );
                    })

                    
                }
            </div>
        </div>
    );

}