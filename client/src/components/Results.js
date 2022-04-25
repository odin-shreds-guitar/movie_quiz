import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import background from "../img/background.png"

// declaring the useNavigate to be used in the form

const Results =()=>{
    const {correctNum,totalNum} = useParams();
    const navi = useNavigate();	
    
    return (
        <div style={{ backgroundImage: `url(${background})`}}>
            <Navbar />
            <h1>You Got {correctNum} out of {totalNum} correct</h1>
        </div>
    )
}
export default Results;