import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// declaring the useNavigate to be used in the form

const Results =()=>{
    const {correctNum,totalNum} = useParams();
    const navi = useNavigate();	
    
    return <div>
        <p>You Got {correctNum} out of {totalNum} correct</p>
        <button  type="button" id="go-home" class="shadow-lg btn btn-warning" onClick={() => {navi(`/`)}}>Go to home</button>
    </div>
}
export default Results;