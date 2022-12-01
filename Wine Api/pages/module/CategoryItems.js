import React from "react";
import CocktailList from "./CocktailList";
import CocktailsItem from "./CocktailsItem";
import { useState } from "react";

export default function CategoryItems({categoryName}) {
   // console.log(categoryName);    
    return (
        <div>
            {(categoryName == "all") ? <CocktailsItem/> : <CocktailList category={categoryName} more = {true}/>}
        </div>
    );

    
}