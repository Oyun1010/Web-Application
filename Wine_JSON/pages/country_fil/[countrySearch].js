import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from '../../components/Header'
import SearchItem from "../../components/SearchItem"
import { useRouter } from "next/router";
import WineData from "../../components/WineItem";
import styles from "./CountryFil.module.css";
export async function getServerSideProps(params) {
  //  console.log('dorjoo');
   //console.log(params.query.countrySearch);
   let myquery = [params.query.countrySearch]
    return {
      props: {myquery}, // will be passed to the page component as props
    }
  }

export default function CountryFilter(props) {
    //console.log(props)
    const countrySearch = props.myquery[0];
    //console.log(countrySearch);
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    console.log(countrySearch.search);

    //console.log("../api/country_search/" + countrySearch);
    useEffect(() => {
        if(countrySearch != undefined || countrySearch != 'undefined'){
            fetch("../api/country_search/" + countrySearch)
            .then((res) => res.json())
            .then(data => 
                setData(data)
            );
        }
    }, [props]);

    return (
        <div>
            <Header/>
            <hr></hr>
            <SearchItem/>      
            <div className = {styles.container}>
                <h2 className = "mx-24 my-6 text-3xl font-arimu_madurai">{countrySearch}</h2>
                <div className = {styles.items}>
                    {data && data.data && data.data.slice(0, 20).map((e, i) => {
                        return (
                            <div key = {i}>
                                <WineData data={e}></WineData> 
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );

}