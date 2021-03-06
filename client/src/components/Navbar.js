import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import axios from "axios";
import { BoxArrowLeft, Person } from "react-bootstrap-icons";

const Navbar=(props)=>{
        const [userId, setUserID] = useState()
        const navi=useNavigate();

        // gets the userId on load
        useEffect(()=>{
            axios.get("http://localhost:8000/api/users/logged",{withCredentials:true})
            .then((res)=>{
                setUserID(res.data._id)
            }).catch((err)=>{console.log(err)})
        },[])
        
        // logout function
        const logout=()=>{
            axios.post("http://localhost:8000/api/users/logout",{},{withCredentials:true})
            .then((res)=>{
                navi("/")
            }).catch((err)=>{console.log(err)})
        }

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                <div className="container-fluid">
                    <a className="navbar-brand fs-2" href="/main">Movie Quiz</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" id="nav-item">
                                {<Link to={"/user/"+ userId} onClick={()=>{
                                    navi(`/user/${userId}`)
                                    window.location.reload(false);}} >< Person size={40}/>Profile</Link>}
                            </li>
                            <li style={{marginTop:6}} className="nav-item" id="nav-item">
                                {<Link to={"/view-all"}  >Find Users</Link>}
                            </li>
                        </ul>
                        <BoxArrowLeft size={40} color="red" onClick={() => logout()}/>
                    </div>
                </div>
            </nav>
    )
};

export default Navbar;
