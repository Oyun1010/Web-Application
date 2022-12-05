import React, {useState, useEffect} from "react";
import Router from 'next/router';
import styles from "../styles/DropDown.module.css";

// export async function getServerSideProps() {
//     const [countryRes, regionRes] = await Promise.all([
//         fetch("../api/country"),
//         fetch("../api/regions")
//         ]);
//     const [country, regions] = await Promise.all([
//         countryRes.json(),
//         regionRes.json()
//     ]);

//     return {props: {country, regions}};

// }

export default function SearchItem() {
    const [data, setData] = useState(null);
    const [region, setRegion] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [searchVal, setSearch] = useState("");
    const [price, setPrice] = useState("");

   
   useEffect(() => {
        setLoading(true)
        fetch("../api/regions")
        .then(res => res.json())
        .then((data) => {
            setRegion(data)
            setLoading(false);
        });
    },[]);


    useEffect(() => {
        setLoading(true)
        fetch("../api/country")
        .then(res => res.json())
        .then((data) => {
            setData(data)
            setLoading(false);
        }, );
    },[]);

   
    console.log(region);
    function regionFunc(regionName) {
        Router.push({pathname: "/regions/" + regionName})
    }

    function handler(countryName) {
        console.log('Country Name'+countryName);
        Router.push({pathname: "/country_fil/" + countryName})
       
    }
    function searchBtn(e) {
        setSearch(e.currentTarget.value);
        // console.log(searchVal);       
        Router.push({pathname: "/", query: {type: "search", search: searchVal}});
    }

    function pricefil(e) {
        setPrice(e.currentTarget.value);
        Router.push({pathname: "/", query: {type: "price",price: price}});
    }
  

    return (
        <div className = "flex justify-around align-middle h-10 my-10">
            <div className = "w-96 flex border-none">
                <div className = "h-10" id = {styles.dropdown}> 
                    <button className = "w-24 h-10 border rounded-l-xl">Regions</button>
                    <div className = "absolute w-11/12 top-18 left-20 flex flex-wrap justify-center" id = {styles.dropdownContent}>              
                        {region && region.regions && 
                            region.regions.slice(0, 15)
                            .filter((val) => {
                                if(val != null) return val;
                            })
                            .map((item, i) => {
                                return (
                                    <div className = "border" key = {i}>
                                        <button className = "w-22 h-8 text-xs px-2" onClick = {() => regionFunc(item)}>{item}</button>
                                    </div>  
                                );
                            })                
                        }
                    </div>
                </div>  
                <div className = "" id = {styles.dropdown}> 
                    <button className = "w-24 h-10 border">Country</button>
                    <div className = "absolute w-11/12 top-18 left-20 flex flex-wrap justify-center" id = {styles.dropdownContent}>              
                        {data && data.country && 
                            data.country.slice(0, 15)
                            .filter((val) => {
                                if(val != null) return val;
                            })
                            .map((item, i) => {
                                return (
                                    <div className = "border" key = {i}>
                                        <button className = "w-16 h-8 text-xs" onClick = {() => handler(item)}>{item}</button>
                                    </div>  
                                );
                            })                
                        }
                    </div>
                </div>          
                <div className = "h-10">
                    <input 
                        type = "text"  
                        value = {searchVal} 
                        className = "h-10 border px-2 rounded-r-xl"
                        onChange = {(e) => searchBtn(e)} 
                        placeholder = "Search"/>              
                </div>

            </div>
            <div className = "mx-4">
                <input 
                    type= "text" 
                    className ="border h-10 rounded-xl px-2" 
                    value = {price} 
                    onChange = {(e) => pricefil(e)}
                    placeholder = "Amount"/> 
            </div>
        </div>        
    );

    

}