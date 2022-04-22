import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login=(props)=>{
    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState("");

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login",{email:email,password:password})
        .then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
            setErrors("Invalid email/password")
        })
    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={(e)=>{submitHandler(e)}}>
                {
                    errors?
                    <p>{errors}</p>
                    :
                    null
                }
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;