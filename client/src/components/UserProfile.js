import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

const UserProfile= (props)=>{
    const [loggedUser, setLoggedUser]=useState({});
    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/logged")
        .then((res)=>{
            console.log(res.data);
            setLoggedUser(res.data)
        }).catch((err)=>{console.log(err)})
    },[])


    return(
        <div>

        </div>
    )
}