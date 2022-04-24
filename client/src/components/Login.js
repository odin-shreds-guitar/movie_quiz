import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Reg from './Reg';
import background from "../img/background.png"



const Login=(props)=>{
    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState("");
    const navi=useNavigate();
    const API_KEY = "039df924b633bb219ed0678a208e69d4"
    const [apiErrors, setApiErrors] = useState()

	// initial check to confirm the tmdb api is up
	const checkApi = () => {
		axios.get('https://api.themoviedb.org/3/movie/550?api_key=' + API_KEY)
			.then( response =>{
				if (response.status !== 200){
					// actual response error
					setApiErrors("There was a problem establishing connection to the API")
						} 
				else {
					setApiErrors("")
				}
					}
			)
			.catch(
				// call to the api fails altogether
				err => {
					console.log( err )
					if (err.message){
						setApiErrors("There was a problem establishing connection to the API");
					}
				})
			}
	// useEffect to check on the status of the gov API once (hence the empty array)
	useEffect(() => {
            checkApi();
		}, [])

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login",{email:email,password:password},{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            axios.get("http://localhost:8000/api/users/logged",{withCredentials:true})
            .then((res)=>{
                console.log(res.data)
                navi(`/main`);
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
						apiErrors === ""
						? <span><a href='https://api.themoviedb.org' target="_blank" className='link-success'>API Status: OK</a></span>
						: <span><a href='https://api.themoviedb.org' target="_blank" className='link-danger'>API Status: Down</a></span>
					}
				</p>
			</div>
			<div id="main-grid">
				<p id="login-box">
                    <div id="login-box" className="bg-light">
                        <form onSubmit={(e)=>{submitHandler(e)}}>
                            <h1>Login</h1>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} class="form-control" id="email" aria-describedby="emailHelp"/>
                                    <div id="emailHelp" class="form-text">
                                        We'll never share your email with anyone else.
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} class="form-control" id="password"/>
                                {
                                    errors?
                                    <p className="text-danger">{errors}</p>
                                    :
                                    null
                                }
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
