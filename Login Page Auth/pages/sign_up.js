import React  from "react"
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
export default function SingUpPage() {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const initialValues = {
        lastName: "", 
        firstName: "", 
        birthday: "", 
        gender: "", 
        email: "", 
        password: "", 
        phone: ""
    };

    const router = useRouter();
    const [formValues, setFormValues] = useState(initialValues); 
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(e.target);
        setFormValues({...formValues, [name]: value});
    }
    const onSubmit = (event) => {
        console.log("data" + event);
        Cookie.set("email", formValues.email, {expires: 1, secure: true, sameSite: 'strict', path: '/'});
        Cookie.set("password", formValues.password, {expires: 1, secure: true, sameSite: 'strict', path: '/'});
        router.push("./sign_in");  
    }
    return (
        <div className = {styles.regContainer}>
            <h3 className = {styles.head}>Sign Up</h3>            
                <form className = {styles.form} onSubmit = {handleSubmit(onSubmit)}>
                    <input 
                        className = {styles.input} 
                        type = "text" 
                        placeholder="Овог"
                        required 
                        pattern="[A-Za-z]{1,32}"
                        onChange = {handleChange} 
                        {...register('lastName', {required: true})}
                    />
                    <p>{errors.lastName && errors.lastName.type == "required" && <p>Please enter the last name</p>}</p>
                  
                    <input 
                        className = {styles.input} 
                        type = "text"
                        name = "firstName"
                        required
                        placeholder="Нэр" 
                        pattern = "[A-Za-z]{1,32}"                                               
                        onChange = {handleChange}    
                       
                        />     
                    <input 
                        className = {styles.input} 
                        type = "email" 
                        name = "email"
                        placeholder="Имэйл"
                        required
                        onChange = {handleChange} 
                        value = {formValues.email}/>                    
                    <input className = {styles.input}                         
                        type = "text" 
                        name = "phone"
                        placeholder="Утасны дугаар"
                        min={8}
                        required
                        onChange = {handleChange} 
                        value = {formValues.phone}  /> 
                    <input 
                        className = {styles.input} 
                        type = "password" 
                        name = "password" 
                        placeholder="Нууц үг"
                        required
                        min={8}
                        maxLength = {16}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        onChange = {handleChange} 
                        value = {formValues.password} /> 
                    <input className = {styles.input}
                        type = "date" 
                        name = "birthday" 
                        placeholder="Tөрсөн огноо"
                        required
                        onChange = {handleChange} 
                        value = {formValues.birthday} />
                    <div className = {styles.radioButtons}>
                        <input 
                            type = "radio" 
                            value = "Male"
                            name = "gender"
                            onChange={handleChange}
                        />                     
                        <label htmlFor = "male" >Эр</label>
                        <input 
                            type = "radio" 
                            value = "Female"
                            name = "gender"
                            onChange = {handleChange}>
                        </input>
                        <label htmlFor = "female">Эм</label>

                    </div>
                    <button className = {styles.btn} type = "submit" >Sign up</button>
                   
                </form>
            
            <div className = {styles.footer}>
                <p>Have an Account</p>
                <Link href= "./sign_in"><b>Login</b></Link>
            </div>
        </div>         
    );
}
