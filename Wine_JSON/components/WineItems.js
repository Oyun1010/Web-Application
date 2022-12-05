import React, {useState, useEffect} from "react";
import WineItem from "./WineItem";

import { useRouter } from 'next/router'
import { useAmp } from "next/amp";


export default function WineData() {
    const [data, setData] = useState(null);
    
    const router = useRouter();
   
    const search = router.query.search;
    const amount = router.query.price;
    const region = router.query.region;
    const type = router.query.type;
   

  
    useEffect(() => {
        fetch('../api/all')
        .then((res) => res.json())
        .then(data => setData(data))
    }, []);

    return (
        <div>
            <div className = "flex w-auto flex-wrap justify-center">
            {
                data && data.data && data.data.filter((val) => {
                    if(type === "search") {
                        if(search === "" || search === undefined) return val;
                        // else if(price === 0 || price === undefined) return val;
                        else if(val.title.toLowerCase().includes(search.toLowerCase())) return val;
                    }
                    else if(type === "price") {
                        if(amount === 0 || amount === undefined) return val;
                        else if(val.price == amount) return val;
                    }   
                    else {
                        if(region === "" || region === undefined) return val;
                        else if(val.region.toLowerCase().includes(region.toLowerCase())) return val;
                    }                                 
                }).slice(0, 80).map((e, i) => {
                    return (
                        <div className = "flex-row mx-2" key = {i}>
                            <WineItem data = {e}/>
                        </div>
                    );      
                })
            }
            </div>
        </div>
    );
}