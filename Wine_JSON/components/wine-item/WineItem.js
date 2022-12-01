import React from "react";
import { useState } from "react";
import Router from "next/router";
import styles from "./WineItem.module.css"

export default function WineItem({data}) {
    const [isModal, setIsModal] = useState(false);
    function buttonClick(){
        console.log("click");
        Router.push({pathname: "../wine_detail/WineDetail", query : data});  
    }

    return (
        <div className = {styles.item}>
            <p className = {styles.price}>{data.price}$</p>
            <h3 className = {styles.title}>{data.title}</h3>
            <p className = {styles.desc}>{data.description}</p>   
            <button className = {styles.button} onClick = {buttonClick} >Details</button>
        </div>
    );
}