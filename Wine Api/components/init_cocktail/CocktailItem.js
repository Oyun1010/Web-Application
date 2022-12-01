
import styles from './CocktailItem.module.css'
import Popup from "reactjs-popup";
import { useState } from 'react';
import Router from 'next/router';

export default function CocktailItem({data}) {
    const id = data.idDrink;
    
    function btn() {
        Router.push({pathname : "../../module/CocktailDetails" , query : {id}});
    }
    return (
        <div className = {styles.drinkItem} onClick = {btn} >
            <img
            className = {styles.image}
            src = {data.strDrinkThumb}
            width = {250}
            height = {250}
            />
            <p className = {styles.dis}>{data.strDrink}</p>

        </div>
    );
}
