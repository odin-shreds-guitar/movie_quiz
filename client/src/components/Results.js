import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import background from "../img/background.png"
import { useState, useEffect } from "react";
import axios from "axios";

// declaring the useNavigate to be used in the form
const Results =()=>{
    const {correctNum,totalNum} = useParams();

    // post request to create course
    return (
        <div style={{ backgroundImage: `url(${background})`}}>
            <Navbar />
            <h1 style={{display:"flex", justifyContent:"center"}}>You Got {correctNum} out of {totalNum} correct</h1>
        </div>
    )
}
export default Results;