import Router from "next/router";
import React from "react";
import styles from "../Header/Header.module.css"

export default function Header() {
    return (
        <div>
            <h1 className = {styles.title}>The CockTail</h1>          
        </div>
    );
}