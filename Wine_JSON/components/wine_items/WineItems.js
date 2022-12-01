import React, {useState, useEffect} from "react";
import WineItem from "../wine-item/WineItem";
import styles from "./WineItems.module.css"

import { useRouter } from 'next/router'


export default function WineData() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
        fetch('../api/all')
        .then((res) => res.json())
        .then(data => setData(data))
    }, []);

    return (
        <div>
            <div className = {styles.container}>
            {
                data && data.data && data.data.slice(0, 14).map((e, i) => {
                    return (
                        <div className = {styles.dataList} key = {i}>
                            <WineItem data = {e}/>
                        </div>
                    );      
                })
            }
            </div>
        </div>
    );
}