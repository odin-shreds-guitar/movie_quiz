import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const ScoreBoard = () => {

    const navigate = useNavigate()

    const [quizScore, setQuizScore] = useState([]);

    const [user, setUser] = useState(null);
    

    useEffect(() => {
        axios.get('http://localhost:8000/api/scores')
            .then((res) => {
                console.log(res);
                console.log(res.data);                
                setQuizScore(res.data);
            })
            .catch((err) => {
                console.log(err);                
            })
    }, [])


    useEffect(() => {
        axios.get("http://localhost:8000/api/users/logged",
            {withCredentials: true}
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                navigate("/");
            })
    },[]);


    const deleteScore = (idFromBelow) => {
        axios
        .delete(`http://localhost:8000/api/scores/${idFromBelow}`)
        .then((res) => {
            console.log(res.data);
            navigate("/main");
        })
        .catch((err) => {
            console.log(err);
        });
    };



    return (
        <div>
            <table className="table table-dark">

                <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {   
                        quizScore?

                        quizScore.map((score, index) => (
                            
                            <tr key={index}>

                                <td scope="row"> // no time to make ranking algo
                                    n/a                                
                                </td>

                                <td>
                                <Link to={`/user/userprofile/${score.createdBy.username}`}>
                                        {score.createdBy.username}
                                </Link>
                                </td>

                                <td>
                                    {score.score}
                                </td>

                                <td>
                                    <button 
                                        onClick={(e) => deleteScore(score._id)}
                                        style={{backgroundColor:"red", color:"white"}}
                                        >DELETE</button>
                                </td>
                        </tr>
                        ))
                        :null
                    }
                </tbody>
            </table>

        </div>

    )


}

export default ScoreBoard;