import React, {useState, useEffect} from "react";
// import {Link, navigate, useNavigate} from "@reach/router"; // "npm i @reach/router --legacy-peer-deps"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const ScoreBoard = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null);
    const [score, setScore] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:8000/api/scores')
            .then((res) => {
                console.log(res);
                console.log(res.data);                
                setScore(res.data);
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
                    {user.map((hero, index) => (
                        
                        <tr>
                        <td scope="row">1</td>

                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )


}

export default ScoreBoard;