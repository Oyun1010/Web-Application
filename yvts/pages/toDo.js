import { useState } from "react";
import styles from '../styles/Home.module.css'


export default function toListPage() {
    const initialState = [
       "aaaaaaaaaaaaa",
       "bbbbbbbbbbbbb",
       "bbbbbbbbbbbbb",
    ]
    const [text, setText] = useState('');    
    const [items, setItems] = useState([]);   

   
    const addItem = () => {
        setItems([...items, text]);
        setText('');
    }
   
    return (
        <div className = {styles.container}>
            <div className = {styles.form}>
                <input
                    className = {styles.input}
                    type= "text"
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    placeholder="ADD TODO HERE..."/>
                <button type="submit" className = {styles.inputBtn} onClick={addItem}>+</button>
            </div>               
            <div>
                {items.map(item => {
                    return (
                        <div className = {styles.list}>
                            <p>{item}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}