import React, {useState, useEffect} from "react";
import Popup from "reactjs-popup";
import { useRouter } from "next/router";
import styles from "../../styles/CocktailDetails.module.css"
import CloseIcon from '@mui/icons-material/Close';
import Tag from "./TagItem";
import Router from "next/router";
import Ingredient from "./Ingredient";
import Instruction from "./Instruction";

export default function CocktailDetails() {  

    const [data, setData] = useState(null);
    const [letter, setLetter] = useState(null);
    const router = useRouter();
    const {query : {id}, } = router;
    const props = {id};
    const _id = props.id;

    let array = [];
    for(let i = 0; i < 15; i++) {
        array[i] = "strIngredient"+(i + 1).toString();
    }

    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+_id)
        .then((res) => res.json())
        .then((data) =>
        setData(data))
    });

    function closeBtn() {
        console.log("click");
        Router.push("../../");
    }
    
    function tagBtn(element) {
        // router.push('../../module/TagItem');
        const tagItem = "tag";
        Router.push({
            pathname: "../../",
            query : {tagItem, element}
        })

    }
 
    return (
        <div className = {styles.container}>            
            {data && data.drinks && 
                <div className = {styles.item}>
                    <div className={styles.title}>
                        <div></div>
                        <h1 className={styles.name}>{data.drinks[0].strDrink}</h1>
                        <button className={styles.closeBtn} onClick = {closeBtn}><CloseIcon/></button>
                    </div>
                                   
                     <div className = {styles.ii}>
                        <img className = {styles.img} src = {data.drinks[0].strDrinkThumb} width = {300} height = {300}></img>
                        <div>                     
                            <Instruction data = {data.drinks[0]}/>
                            <Ingredient data={data.drinks[0]}/>   
                        </div>
                    </div>

                    {/* <h2 className={styles.subtitle}>Ingredients</h2>
                    {array.map(element => {
                        console.log(element.toString());
                        console.log("val", `${data.drinks[0].element}.${element}`);
                        (element != null) ?  <p className = {styles.instructions}>{data.drinks[0].element}</p> : null
                        
                    })} */}
                  
                
                    
                    {(data.drinks[0].strTags != null ? 
                        <div className = {styles.tag}> 
                            {(data.drinks[0].strTags.toString().split(','))
                            .map((element, i) => (                  
                                <button className = {styles.btn} 
                                    type = "submit" 
                                    onClick={() => tagBtn(element)}>
                                    {element}
                                </button>
                            ))
                            }
                        </div>
                       


                        : null)}
                    
                </div>
            }   
        </div>
    );

}