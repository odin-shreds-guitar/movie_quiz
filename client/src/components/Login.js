import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Reg from './Reg';
import background from "../img/background.png"



const Login=(props)=>{
    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState("");

    const navi=useNavigate();

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login",{email:email,password:password},{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            axios.get("http://localhost:8000/api/users/logged",{withCredentials:true})
            .then((res)=>{
                console.log(res.data)
                navi(`/user/${res.data._id}`);
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
            setErrors("Invalid email/password")
        })
    }
    return(
        <div style={{ backgroundImage: `url(${background})`}}>
            <div id="main-grid">
				<p id="test-box"></p>
				<p id="test-box2">
					<h3 id="app-title">Movie Quiz</h3>
				</p>
				<p id="test-box">
					{
						errors === ""
						? <span><a href='https://api.themoviedb.org' target="_blank" className='link-success'>API Status: OK</a></span>
						: <span><a href='https://api.themoviedb.org' target="_blank" className='link-danger'>API Status: Down</a></span>
					}
				</p>
			</div>
				{/* validation  */}
				{
					errors 
						? <span style={{color: "red", padding: "30px"}}>{errors}</span>
						: null
				}
			<div id="main-grid">
				<p id="login-box">
                    <div id="login-box" className="bg-light">
                        <form onSubmit={(e)=>{submitHandler(e)}}>
                            {
                                errors?
                                <p>{errors}</p>
                                :
                                null
                            }
                            <h1>Login</h1>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} class="form-control" id="email" aria-describedby="emailHelp"/>
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} class="form-control" id="password"/>
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </p>
				<p id="reg-box" className="bg-light">
                    < Reg />
				</p>
			</div>
            <hr/>
            <div className='col text-center' style={{"padding":"20px"}}><a href="https://github.com/odin-shreds-guitar/movie_quiz" target="_blank" class="link-primary" style={{"text-decoration":"none", "margin-top":"20px"}}><strong>Github</strong></a></div>
        </div>
    )
}
export default Login;
