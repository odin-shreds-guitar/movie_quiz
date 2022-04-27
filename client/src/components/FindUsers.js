import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../img/background.png"
import Navbar from "./Navbar";

const FindUsers=(props)=>{
    const [loggedUser,setLoggedUser]=useState({});
    const [allUsers,setAllUsers]=useState([])
    const [searchItem,setSearchItem]=useState("");

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            setLoggedUser(res.data)

        }).catch((err)=>{console.log(err)})

        axios.get("http://localhost:8000/api/users",{withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            setAllUsers(res.data);
        }).catch((err)=>{console.log(err)})
    },[])

    const searchDb=()=>{
        console.log("hello")
        var word=searchItem
        if(allUsers.length==0){
            axios.get("http://localhost:8000/api/users",{withCredentials:true})
            .then((res)=>{
                console.log(res.data);
                setAllUsers(res.data);

            }).catch((err)=>{console.log(err)})
        }
        if(searchItem.length<=1){
            setAllUsers(allUsers.filter((user)=> user.username.slice(0,1).toLowerCase()==searchItem.slice(0,1).toLowerCase()))
            return
        }
        setAllUsers(allUsers.filter((user)=> user.username.slice(0,2).toLowerCase()==searchItem.slice(0,2).toLowerCase()))
        
        if(searchItem.length>=5 && searchItem.length<8){ 
        setAllUsers(allUsers.filter((user)=> user.username.slice(0,5).toLowerCase()==searchItem.slice(0,5).toLowerCase()))}
       
        if(searchItem.length>=10){
            setAllUsers(allUsers.filter((user)=> user.username.slice(0,8).toLowerCase()==searchItem.slice(0,8).toLowerCase()))
        }
    }

    const resetUsers=()=>{
        if(allUsers.length==0){
            axios.get("http://localhost:8000/api/users",{withCredentials:true})
            .then((res)=>{
                console.log(res.data);
                setAllUsers(res.data);

            }).catch((err)=>{console.log(err)})
        }
    }

    const directSearch=()=>{

        setAllUsers(allUsers.filter((user)=>user.username.toLowerCase()==searchItem.toLowerCase()))
    }

    return(
        <div style={{ backgroundImage: `url(${background})`}}>
            <Navbar/>
                <h1 className="d-flex justify-content-center">Find Other Users!</h1>
                <div className="d-flex justify-content-center">
                    <div className="input-group mb-3 fs-3" style={{width:"600px"}}>
                        <input type="text" value={searchItem} name="searchItem" className="form-control d-flex justify-content-center fs-4" placeholder="Start typing to search for a username" aria-label="username" aria-describedby="searchbar" onChange={(e)=>{setSearchItem(e.target.value); searchDb()}}/>
                        <div className="input-group-append">
                            <button className="btn btn-dark ms-2 fs-3" type="button" nMouseEnter={()=>{resetUsers()}} onClick={()=>{directSearch()}}>Search</button>
                        </div>
                </div>
            </div>

            {allUsers.map((user,index)=>{
                return(
                    <div className="d-flex justify-content-center fs-3">
                        <Link to={`/user/${user._id}`}>{user.username}</Link><br></br>
                    </div>
                );
            })}
        </div>
    )
}
export default FindUsers;