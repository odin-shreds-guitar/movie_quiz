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
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input id="username" type="text" class="form-control" name="username" value={user.username} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.username?
                        <p className="text-danger">{errors.username.message}</p>
                        :
                        null
                    }
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input id="email" class="form-control"  type="email" name="email" value={user.email} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.email?
                        <p className="text-danger">{errors.email.message}</p>
                        :
                        null
                    }
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" class="form-control"  type="password" name="password" value={user.password} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.password?
                        <p className="text-danger">{errors.password.message}</p>
                        :
                        null
                    }
                </div>
                <div class="mb-3">
                    <label for="confirm-password" class="form-label">Confirm Password</label>
                    <input id="confirm-password" class="form-control" type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=>{inputHandler(e)}}/>
                    {
                        errors.confirmPassword?
                        <p className="text-danger">{errors.confirmPassword.message}</p>
                        :
                        null
                    }
                </div>
                <button class="btn btn-primary" type="submit">Register</button>
            </form>
        </div>
    )
}

export default Reg;