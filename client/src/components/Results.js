import { useParams } from "react-router-dom";

const Results =()=>{
    const {correctNum,totalNum} = useParams();
    return <div>
        <p>You Got {correctNum} out of {totalNum} correct</p>
    </div>
}
export default Results;