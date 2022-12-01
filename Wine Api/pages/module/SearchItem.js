import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DrinkItem from "../../components/init_cocktail/CocktailItem";
import styles from "../../styles/DrinkList.module.css"

export default function SearchItems({searchValue}) {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+searchValue)
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [searchValue]);
    console.log(data);

    return (
        <div className = {styles.drinklist}>
            {data && data.drinks &&
                data.drinks.map((item , i) => (
                    <div key={i}> 
                        {isLoading ? "..." : <DrinkItem data = {item}/>}
                    </div>
                    ))
            }
        </div>
      );


}