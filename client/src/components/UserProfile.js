import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";
import {useNavigate} from "react-router";

const UserProfile= (props)=>{
    const [loggedUser, setLoggedUser]=useState({});
    const [user,setUser]=useState({});
    const [commentList,setCommentList]=useState([])
    const [comment, setComment]=useState({})
    const {id}=useParams()
    const navi= useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/logged",{withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            setLoggedUser(res.data)
        }).catch((err)=>{console.log(err)})

        axios.get(`http://localhost:8000/api/users/${id}`,{withCredentials:true}).then((res)=>{
            console.log(res.data);
            setUser(res.data);
        }).catch((err)=>{console.log(err)});

        axios.get(`http://localhost:8000/api/comments/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setCommentList(res.data);
        }).catch((err)=>{console.log(err)})
    },[])

    const logout=()=>{
        axios.post("http://localhost:8000/api/users/logout",{},{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            navi("/login")
        }).catch((err)=>{console.log(err)})
    }

    const inputHandler=(e)=>{
        setComment({
            ...comment,
            message: e.target.value,
            profile:id,
            createdBy:loggedUser._id,
            username:loggedUser.username
        })
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/comments",comment,{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})

    }

    const deleteHandler=(com)=>{
        axios.delete(`http://localhost:8000/api/comments/${com}`)
        .then((res)=>{
            console.log(res.data)
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }
    const getTime=(createdAt)=>{
    
        const num1=Math.round(new Date(createdAt).getTime()/1000)
        const num2= Math.round(new Date().getTime()/1000)
        const sec=num2-num1;
        if(sec<60){
            return(`${sec} second ago`);
        }
        if(sec>60 && sec<3600){
            return(`${Math.round(sec/60)} mins ago`)
        }
        if(sec>3600 && sec<86400){
            return(`${Math.round(sec/3600)} hours ago`)
        }
        if(sec>86400 && sec<2628002){
           return(`${Math.round(sec/86400)} days ago`)
        }
        if(sec>2628002 && sec<31536000){
            return(`${Math.round(sec/2628002)} months ago`)
        }
        if(sec>31536000){
            return(new Date(createdAt).toLocaleDateString())
        }


    }

    return(
        <div>
            <h1>{user.username}</h1>
            {
                commentList.map((comm,index)=>{
                    return(
                        <>
                            <div>
                                <h4 style={{color:"green"}}>{comm.username}</h4>
                                <p style={{fontStyle:"italic",
                            color:"gray"}}>{getTime(comm.createdAt)}</p>
                                <p>{comm.message}</p>
                                {
                                    comm.createdBy==loggedUser._id?
                                    <button onClick={()=>{deleteHandler(comm._id)}}>Delete</button>
                                    :
                                    null
                                }
                            </div>
                        </>
                    )
                })
            }<hr></hr>
        <form onSubmit={(e)=>{submitHandler(e)}}>
            <label>Comment</label>
            <input type="text" name="message" value={comment.message} onChange={(e)=>{inputHandler(e)}}/>

            <button type="submit">Comment</button>
        </form>

            <button onClick={()=>{logout()}}>logout</button>
        </div>
    )
}
export default UserProfile;