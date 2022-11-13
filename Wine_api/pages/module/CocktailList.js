import React, { useEffect } from "react";
import { useState } from "react";
import CocktailItem from "../../components/init_cocktail/CocktailItem";
import styles from "../../styles/DrinkList.module.css"
export default function CocktailList({category, more}) {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    console.log(category)
    useEffect(() => {
        setLoading(true);
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+category)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            setLoading(false);
        })
    }, [category]);

    return (
        <div>
            <div className = {styles.drinklist}>
                {data && data.drinks &&
                    data.drinks.slice(0, more ? data.drinks.length : 14).
                    map((item , i) => (
                        <div key={i}> 
                            {isLoading ? "..." : <CocktailItem data = {item}/>}
                        </div>
                    ))
                }
            </div>
        </div>

    );

}