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
    const[likeId,setLikeId]=useState("")
    const [likes,setLikes]=useState([]);
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



    const likeHandler=(comm)=>{
        
        axios.put(`http://localhost:8000/api/comments/${comm._id}`,{...comm,
    likes:[...comm.likes,loggedUser._id]},{withCredentials:true}).then((res)=>{
        console.log(res.data)
        window.location.reload(false);
    })
    .catch((err)=>{console.log(err)})

    }

    const unlikeHandler=(comm)=>{
        
        for(var i=0; i<comm.likes.length; i++){
            console.log("hi")
            if(comm.likes[i]==loggedUser._id){
                comm.likes.splice(i,1);
                
            }
        }
        axios.put(`http://localhost:8000/api/comments/${comm._id}`,{...comm,
    likes:comm.likes},{withCredentials:true}).then((res)=>{
        console.log(res.data)
        window.location.reload(false);
    }).catch((err)=>{console.log(err)})
    }

    const likesCheck=(comm)=>{

        for(var i=0; i<comm.likes.length; i++){
            if(comm.likes[i]==loggedUser._id){
                return true;
            }
        }
        return false
    }

    return(
        <div style={{ backgroundImage: `url(${background})`}}>
            < Navbar/> 
            
            {/* new form */}
            <div className="container mt-5 bg">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                        <div>
                            <h1>Hi {user.username} !</h1>
                        </div>
                        <div className="shadow p-3 bg-light rounded">
                            <div className="mt-5 d-flex flex-row"> 
                                <img className="me-2" src="https://i.imgur.com/jD4jCW9.png" width="40" height="40"/>
                                <div className="w-100 ml-2 comment-area"> 
                                    <textarea className="form-control" onChange={(e)=>{inputHandler(e)}}></textarea>
                                    <button className="btn btn-warning btn-block mt-2 post-btn" id="post" onClick={(e)=>{submitHandler(e)}}>Post Comment</button> 
                                </div>
                            </div>
                            {
                            commentList.map((comm,index)=>{
                                return(
                                    <>
                                        <div className="d-flex flex-row mt-5"> 
                                            <img className="me-2" src="https://i.imgur.com/jD4jCW9.png" width="40" height="40"/>
                                            <div className="w-100">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex flex-row align-items-center"> 
                                                        <h3 className="font-weight-bold name">{comm.username}</h3> 
                                                    </div> 
                                                    <div className="d-flex flex-row align-items-center"> 
                                                        <h4 className="text-muted time-text">{getTime(comm.createdAt)}</h4> 
                                                    </div> 
                                                </div>
                                                <p className="user-comment-text text-justify">{comm.message}</p>
                                                <div class="mt-3 d-flex align-items-center justify-content-between"> 
                                                    <span class="fs-13"><i class="bi bi-hand-thumbs-up text-info fs-3 ms-2"></i> {comm.likes.length}</span> 
                                                    <div>
                                                        <span>
                                                            {
                                                                comm.createdBy==loggedUser._id
                                                                ? <i class="bi bi-backspace-fill text-danger fs-3 ms-2" onClick={()=>{deleteHandler(comm._id)}}></i>
                                                                : null
                                                            }
                                                        </span>
                                                        {likesCheck(comm)== true
                                                            ? <i class="bi bi-hand-thumbs-down-fill text-secondary fs-3 ms-2" id="unlike" onClick={()=>{unlikeHandler(comm)}}></i>
                                                            : <i class="bi bi-hand-thumbs-up-fill text-success fs-3 ms-2" id="like" onClick={()=>{likeHandler(comm)}}></i>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserProfile;