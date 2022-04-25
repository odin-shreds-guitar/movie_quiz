import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";
import {useNavigate} from "react-router";
import Navbar from "./Navbar";
import background from "../img/background.png"

const UserProfile= (props)=>{
    const [loggedUser, setLoggedUser]=useState({});
    const [user,setUser]=useState({});
    const [commentList,setCommentList]=useState([])
    const [comment, setComment]=useState({})
    const [likes, setLikes]=useState([])
    const[likeId,setLikeId]=useState("")
    const[likeAmount,setLikeAmount]=useState(0);
    const [liked,setLiked]=useState("")
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

    const inputHandler=(e)=>{
        setComment({
            ...comment,
            message: e.target.value,
            profile:id,
            createdBy:loggedUser._id,
            username:loggedUser.username,
            likeAmount:likeAmount
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

    const checkLikes=(comm)=>{
        axios.get(`http://localhost:8000/api/likes/${comm._id}`,{withCredentials:true})
        .then((res)=>{
             
            if(res.data.length==0){
                
                return ;
            }
            for(var i=0; i<res.data.length;i++){
                if(res.data[i].user==loggedUser._id){
                    
                    setLikeId(res.data[i].comment)
                    setLiked(res.data[i].user)
                    return  ;
                }
            }
        }).catch((err)=>{console.log(err)})
    }

    const likeHandler=(e,comm)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/likes",{user:loggedUser, comment:comm._id},{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setLikeId(res.data.comment);
            axios.get(`http://localhost:8000/api/likes/${comm._id}`,{withCredentials:true})
            .then((res)=>{
                console.log(res.data);
                axios.put(`http://localhost:8000/api/comments/${comm._id}`,{
                    ...comm,
                    likeAmount:res.data.length
                },{withCredentials:true}).then((res)=>{window.location.reload(false);}).catch((err)=>{console.log(err)})
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }

    const unlikeHandler=(comm)=>{
        axios.get(`http://localhost:8000/api/likes/${comm._id}`,{withCredentials:true})
            .then((res)=>{
                for(var i=0; i<res.data.length;i++){
                    if(res.data[i].user==loggedUser._id){
                        axios.delete(`http://localhost:8000/api/likes/${res.data[i]._id}`,{withCredentials:true})
                        .then((res)=>{
                            axios.get(`http://localhost:8000/api/likes/${comm._id}`,{withCredentials:true})
                            .then((res)=>{
                                axios.put(`http://localhost:8000/api/comments/${comm._id}`,{
                                    ...comm,
                                    likeAmount:res.data.length
                                },{withCredentials:true}).then((res)=>{window.location.reload(false);}).catch((err)=>{console.log(err)})
                            }).catch((err)=>{console.log(err)})

                        }).catch((err)=>{console.log(err)})
                    }
                }
            }).catch((err)=>{console.log(err)})
    }

    return(
        <div style={{ backgroundImage: `url(${background})`}}>
            < Navbar/> 
            <div id="userPro">
                <h1>Hi {user.username} !</h1>
            <h2>Here are your comments:</h2>
            {
                commentList.map((comm,index)=>{
                    return(
                        <>
                            <div>
                                <h4 style={{color:"green"}}>{comm.username}</h4>
                                <p style={{fontStyle:"italic",
                            color:"gray"}}>{getTime(comm.createdAt)}</p>
                            <p>likes:{comm.likeAmount}</p>
                                <p>{comm.message}</p>
                                {
                                    comm.createdBy==loggedUser._id ?
                                    <button onClick={()=>{deleteHandler(comm._id)}}>Delete</button>
                                    :
                                    null
                                }
                                
                                    <>
                                    {checkLikes(comm)

                                    }
                                    
                                    </>
                                    {
                                    liked==loggedUser._id && likeId==comm._id?

                                    
                                    <button onClick={()=>{unlikeHandler(comm)}}>unlike</button>
                                    
                                 
                                    
                                    :
                                    <>
                                       <form onSubmit={(e)=>{likeHandler(e,comm)}}>
                                            
                                            <button onMouseEnter={()=>{setLikeId(comm._id)}} type="submit">like</button>
                                        </form>
                                    
                                    </>
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
            </div>

        </div>
    )
}
export default UserProfile;