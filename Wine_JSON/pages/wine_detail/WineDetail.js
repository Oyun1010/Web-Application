import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from './WineDetail.module.css';

export default function WineDetail() {
    const router = useRouter();
    const data = router.query;
    // console.log(data["points"]);
    console.log(router.query);
    console.log(data.points);

    const myLoader = ({ src, width, quality }) => {
        return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
    }

    function closeBtn() {
        router.push("../");
    }
    return (
        <div className = {styles.container}>
            <div className = {styles.item}>
                <Image
                    className={styles.img}
                        loader={myLoader}
                        src = "food.jpg"
                        width = {700}
                        height = {850}  
                />
                <div>
                    <p className = {styles.title}>{data.title}</p>
                    <div className = {styles.info}>
                        <p className = {styles.subTitle}>Points: </p>
                        <p className = {styles.text}>{data.points}</p>
                    </div>
                    {
                        data.tested_name != null ?
                            <div className = {styles.info}>
                                <p className = {styles.subTitle}>Taster name: </p>
                                <p className = {styles.text}>{data.taster_name}</p>
                            </div> 
                            :
                            null
                    }
                    <div className = {styles.info}>
                        <p className = {styles.subTitle}>Price: </p>
                        <p className = {styles.text}>{data.price}$</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.subTitle}>Variety: </p>
                        <p className = {styles.text}>{data.variety}</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.subTitle}>Province: </p>
                        <p className = {styles.text}>{data.province}</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.subTitle}>Country: </p>
                        <p className = {styles.text}>{data.country}</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.subTitle}>Winery: </p>
                        <p className = {styles.text}>{data.winery}</p>
                    </div>
                    <p className = {styles.subTitle}>Description</p>
                    <p className = {styles.desc}>{data.description}</p>
                </div>                  
            </div>
            <button className = {styles.btn} onClick = {closeBtn}>Close</button>                             
            
        </div>
    );

    
}