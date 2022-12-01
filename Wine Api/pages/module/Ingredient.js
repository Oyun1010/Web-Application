import React from "react";
import styles from "../../styles/Info.module.css"

export default function Ingredient({data}) {

    const array = [];
    array[0] = data.strIngredient1;
    array[1] = data.strIngredient2;
    array[2] = data.strIngredient3;
    array[3] = data.strIngredient4;
    array[4] = data.strIngredient5;
    array[5] = data.strIngredient6;
    array[6] = data.strIngredient7;
    array[7] = data.strIngredient8;
    array[8] = data.strIngredient9;
    array[9] = data.strIngredient10;
    array[10] = data.strIngredient11;
    array[11] = data.strIngredient12;
    array[12] = data.strIngredient13;
    array[13] = data.strIngredient14;
    array[14] = data.strIngredient15;

    return (
        <div className = {styles.item}>
            <p className = {styles.title}>Ingredients</p>
            {
                array.map((e, i) => (
                    e != null ?
                    <div className = {styles.text}>{e}</div> : null
                ))
            }
        </div>
    );


}