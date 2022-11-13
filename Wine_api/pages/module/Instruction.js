import React from "react";
import styles from "../../styles/Info.module.css"

export default function Instruction({data}) {  
    return (
        data.strInstructions.toString().length != 0 ?
            <div className = {styles.item}>
                <p className={styles.title}>Instructions</p>
                <p className = {styles.text}>{data.strInstructions}</p>
            </div>                            
        : null            
    );
}