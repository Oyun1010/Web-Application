import React, { useEffect } from "react";
import Cookies from "js-cookie";
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router";
import { useState } from "react";
export default function HomePage() {
    let router = useRouter();
    const [email, setEmail] = useState("");

    function logout() {
        console.log("logout");
        Cookies.remove("login");
        // Cookies.remove("password");
        router.push("./sign_in");
    }
    useEffect(() => setEmail(Cookies.get("email")))
    return (
        <div>
             <div className = {styles.home}>
                <h1>Welcome</h1>
                <p>{email}</p>
            </div>
            <button className = {styles.btn} type = "submit" onClick={logout}>Log out</button>
        </div>
    )
}