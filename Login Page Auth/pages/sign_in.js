import React  from "react"
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
export default function Login() {
    const initialValues = {email: "", password: ""};
    const {register, handleSubmit, errors } = useForm();
    const [formValues, setFormValues] = useState(initialValues);  
    const router = useRouter();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };
    const onSubmit = (data) => 
    {
        console.log(data);
        if(formValues.email == "" || formValues.password == "") {
            alert("Имэйл хаяг  нууц үгээ оруулна уу!")
        }
        else {
            if(Cookies.get("email") == formValues.email && Cookies.get("password") == formValues.password) {
                
                Cookies.set("login", "login", {expires: 1, secure: true, sameSite: 'strict', path: '/'});
                console.log("true");
                router.push('./home');
            }
            else {
                alert("Имэйл хаяг эсвэл нууц үг буруу байна");
            }
        }
    }
    return (
        <div className = {styles.loginContainer}>
            <h3 className = {styles.head}>Login</h3>            
            <form onSubmit = {handleSubmit(onSubmit)}>                 
                <input className = {styles.input} 
                    onChange = {handleChange} 
                    value = {formValues.email} 
                    type = "email" 
                    name = "email" 
                    placeholder="Имэйл"/>                    
                <input className = {styles.input} 
                    onChange = {handleChange} 
                    value = {formValues.password} 
                    type = "password" 
                    name = "password" 
                    placeholder="Нууц үг"/>       
                 <button className = {styles.btn} type = "submit">Login</button>                                
            </form>          
            <div className = {styles.footer}>
                <p>Don't hava an Account</p>
                <Link href="./sign_up">
                    <a><b>Sign up</b></a>
                </Link>
            </div>
        </div>         
    );
}
 

