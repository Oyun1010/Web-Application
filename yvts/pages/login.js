import React  from "react"
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from "next/router";
export default function Login() {

    const initialValues = {userName: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);  
    const router = useRouter();
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };
    const onSubmit = (data) => 
    {
        console.log(data);
        router.push('./toDo');
      
    }
    return (
        <div className = {styles.container}>
            <h3 className = {styles.head}>Login</h3>            
            <form onSubmit = {onSubmit}>                 
                <input className = {styles.input} 
                    onChange = {handleChange} 
                    value = {formValues.email} 
                    type = "text" 
                    placeholder="Нэвтрэх нэр"/>  
                <input className = {styles.input} 
                    onChange = {handleChange} 
                    value = {formValues.email} 
                    type = "text" 
                    placeholder="Нууц үг"/>                  
                 
                 <button className = {styles.btn} type = "submit">Login</button>                                
            </form>          
            
        </div>         
    );
}
 

