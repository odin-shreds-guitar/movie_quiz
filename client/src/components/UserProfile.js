import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import background from "../img/background.png"

const UserProfile= (props)=>{
    const [loggedUser, setLoggedUser]=useState({});
    const [user,setUser]=useState({});
    const [commentList,setCommentList]=useState([])
    const [comment, setComment]=useState({})
    
    const [random, setRandom]=useState({
        "k": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-k-key-keyboard-3-512.png",//
        
        "a":"https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-a-key-keyboard-3-512.png",//

        "b":"https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-b-key-keyboard-3-512.png",//
        
        "c":"https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-c-key-keyboard-3-512.png",//
        
        "d": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-d-key-keyboard-3-512.png",//

        "e": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-e-key-keyboard-3-512.png",//

        "f":"https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-f-key-keyboard-3-512.png",//

        "g": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-g-key-keyboard-3-512.png",//

        "h":"https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-h-key-keyboard-3-512.png",//

        "i": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-i-key-keyboard-3-512.png",//
        
        "j": "https://cdn2.iconfinder.com/data/icons/essential-circles-1/24/_j-512.png",//
        
        "l": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-l-key-keyboard-3-512.png",//

        "m":"https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-m-key-keyboard-3-512.png",//

        "n": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-n-key-keyboard-3-512.png",//

        "o": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-o-key-keyboard-3-512.png",//

        "p": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-p-key-keyboard-3-512.png",//

        "q": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-q-key-keyboard-3-512.png",//

        "r": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-r-key-keyboard-3-512.png",//

        "s": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-s-key-keyboard-3-512.png",//
        
        "t": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-t-key-keyboard-3-512.png",//
        
        "u": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-u-key-keyboard-3-512.png",//

        "v": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-v-key-keyboard-3-512.png",//

        "w": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-w-key-keyboard-3-512.png",//

        "x": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-x-key-keyboard-3-512.png",//

        "y": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-y-key-keyboard-3-512.png",//

        "z": "https://cdn3.iconfinder.com/data/icons/ringtone-music-instruments/512/letter-z-key-keyboard-3-512.png"//


    })
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

    const getLetter=(username)=>{
        if(username){
             
        return username.slice(0,1).toLowerCase();
        }
       
    }

    return(
        <div style={{ backgroundImage: `url(${background})`}}>
            < Navbar/> 
            {/* new form */}
            <div className="container mt-5 bg">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                        <div>
                            {
                                user._id==loggedUser._id?
                            <h1>Hi {user.username} !</h1>
                            :
                            <h1>{user.username+"'s Profile"} </h1>
                            }
                        </div>
                        <div className="shadow p-3 bg-light rounded">
                            <div className="mt-5 d-flex flex-row"> 
                                <img className="me-2" style={{borderRadius:50}} src={random[getLetter(user.username)]}width="40" height="40"/>
                                <div className="w-100 ml-2 comment-area"> 
                                    <textarea className="form-control" onChange={(e)=>{inputHandler(e)}}></textarea>
                                    <button className="btn btn-warning btn-block mt-2 post-btn" id="post" onClick={(e)=>{submitHandler(e)}}>Post Comment</button> 
                                </div>
                            </div>
                            {
                            commentList.map((comm,index)=>{
                                return(
                                    <>
                                    {console.log(user.username.slice(0,1).toLowerCase())}
                                        <div className="d-flex flex-row mt-5"> 
                                            <img className="me-2" style={{borderRadius:50}} src={random[getLetter(comm.username)]} width="40" height="40"/>
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
                                                <div className="mt-3 d-flex align-items-center justify-content-between"> 
                                                    <span className="fs-13"><i className="bi bi-hand-thumbs-up text-info fs-3 ms-2"></i> {comm.likes.length}</span> 
                                                    <div>
                                                        <span>
                                                            {
                                                                comm.createdBy==loggedUser._id
                                                                ? <i className="bi bi-backspace-fill text-danger fs-3 ms-2" onClick={()=>{deleteHandler(comm._id)}}></i>
                                                                : null
                                                            }
                                                        </span>
                                                        {likesCheck(comm)== true
                                                            ? <i className="bi bi-hand-thumbs-down-fill text-secondary fs-3 ms-2" id="unlike" onClick={()=>{unlikeHandler(comm)}}></i>
                                                            : <i className="bi bi-hand-thumbs-up-fill text-success fs-3 ms-2" id="like" onClick={()=>{likeHandler(comm)}}></i>
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