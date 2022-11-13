import React, {useState} from "react";
import { useEffect } from "react";
import CocktailItem from "../../components/init_cocktail/CocktailItem";
import styles from "../../styles/TagItem.module.css"
export default function Tag({e}) {

    const [data, setData] = useState(null);
    const letter = e.toString().charAt(0);
    console.log("tag", e);
    
    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f="+letter)
        .then((res) => res.json())
        .then((data) => 
             setData(data))
    }, []);

    console.log(data);

    return (
        <div className = {styles.container} >
            <h2 className = {styles.title}>{e}</h2>
            <div className = {styles.drinklist}>
                {data && data.drinks && 
                    data.drinks.map((item, i) => (
                        <div key = {i}>
                            <CocktailItem data={item}/>
                        </div>
                    ))
                }
            </div>            
        </div>
    )

}