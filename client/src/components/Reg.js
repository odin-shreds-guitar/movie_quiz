import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

const Reg = (props)=>{
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const navi =useNavigate();

    const [errors,setErrors]=useState({});
    

    const inputHandler=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler=(e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",user,{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            axios.post("http://localhost:8000/api/users/login",user,{withCredentials:true})
                    .then((res)=>{
                        console.log(res.data)
                        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true})
                        .then((res)=>{
                            console.log(res.data)
                            navi(`/user/${res.data._id}`)
                        }).catch((err)=>{console.log(err)})
                    }).catch((err)=>{console.log(err)})
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={(e)=>{ submitHandler(e)}}>
                <div>
                    <label>username</label>
                    <input type="text" name="username" value={user.username} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.username?
                        <p>{errors.username.message}</p>
                        :
                        null
                    }
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={user.email} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.email?
                        <p>{errors.email.message}</p>
                        :
                        null
                    }
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.password?
                        <p>{errors.password.message}</p>
                        :
                        null
                    }
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.confirmPassword?
                        <p>{errors.confirmPassword.message}</p>
                        :
                        null
                    }
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Reg;