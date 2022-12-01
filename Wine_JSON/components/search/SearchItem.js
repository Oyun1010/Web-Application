import React, {useState, useEffect} from "react";
import styles from "./SearchItem.module.css"
import Router from 'next/router'

export default function SearchItem() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [country, setCountry] = useState(null);


    useEffect(() => {
        setLoading(true)
        fetch("../api/country")
        .then(res => res.json())
        .then((data) => {
            setData(data)
            setLoading(false);
        });
    },[] );

    function handler(countryName) {
       
        // <Link href = "../../module/country_fil">jjj</Link>
        Router.push({pathname: "/country_fil/" + countryName , query: "countrySearch"})
       
    }


  

    return (
        <div className = {styles.container}>
            <div className = {styles.item}>
                <div className = {styles.dropdown}> 
                    <button className = {styles.btn}>Regions</button>                   
                    {/* <div className = {styles.dropdownContent}>              
                        {data && data.country && 
                            data.country.map((e, i) => {
                                return (
                                    <div key = {i}>
                                        <button className = {styles.nameBtn}>{e}</button>
                                    </div>  
                                );
                            })                
                        }
                    </div> */}
                </div>    
                <div className = {styles.dropdown}> 
                    <button className = {styles.btn}>Country</button>
                    <div className = {styles.dropdownContent}>              
                        {data && data.country && 
                            data.country.map((e, i) => {
                                return (
                                    <div key = {i}>
                                        <button className = {styles.nameBtn} onClick = {() => handler(e)} >{e}</button>
                                    </div>  
                                );
                            })                
                        }
                    </div>
                </div>          
                <div className = {styles.search}>
                    <input type = "text" className = {styles.input}  />              
                </div>
            </div>
        </div>        
    );

    

}