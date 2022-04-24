import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import background from "../img/background.png"


const Quiz=() =>{
    // List of movies that will be used as questions
    const [quizQuestions , setQuizQuestions ] = useState([]);

    //list of Users answers
    const [userAnswers, setUserAnswers] = useState([]);

    // numbre of correct answers
    var [correctAnswers, setCorrectAnswers] = useState(0);

    //number of total answers
    var [totalAnswers, setTotalAnswers] = useState(0);

    const base_url = "https://image.tmdb.org/t/p/original";

    //list of temporariy answers that is used as a buffer so as to set state "onchange"
    const tempAnswers = userAnswers;
    const navigate = useNavigate();

    //call made to API which retrieves one full page of movies
    useEffect(()=>{
        const pageNum = Math.floor(Math.random() * 20);
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=039df924b633bb219ed0678a208e69d4&language=en-US&page=${pageNum}`)
            .then(page=>{
                //filters out the movies that don't have posters and storees the ones that do in state
                console.log("results are " + page.data.results)
                setQuizQuestions(page.data.results.filter(movie => movie.backdrop_path != null))
                })
            .catch(err => console.log(err))
    },[])


    console.log(quizQuestions);

    //handles submission of quiz
    const handleSubmit =(e) =>{
        //prevents page from refreshing
        e.preventDefault();

        //maps through the list of movies and compares the User answer to the movie title
        quizQuestions.map((movie,idx) =>{
            // only do this ten times because we only have ten questions
            if(idx < 10){
                //if answer field is empty add 1 to total number of answered questions
                if(userAnswers[idx] === undefined){
                    setTotalAnswers(totalAnswers++);
                }
                
                // if User answer matches movie title set both total and correct amout +1
                else if(userAnswers[idx].toLowerCase() === movie.title.toLowerCase()){
                    setCorrectAnswers(correctAnswers++);
                    setTotalAnswers(totalAnswers++);
                }
    
                // if User answer simply doesn't match add 1 to total answered questions
                else{
                    setTotalAnswers(totalAnswers++);
                }
            }
        })
        //redirects to results page after quiz is submitted
        return navigate(`/results/${correctAnswers}/${totalAnswers}`)
    }
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return(
    <div style={{ backgroundImage: `url(${background})`}}>
        <form onSubmit={handleSubmit}>
                <Carousel activeIndex={index} onSelect={handleSelect}  slide={false} keyboard={false} indicators={false} wrap={false} nextIcon={<button>Next question</button>} interval={null} prevIcon={<button>Previous Question</button>}>
                    {
                    //mapping the quiz questions in state to then display posters
                    quizQuestions.map((movie,indx)=>{
                        if(indx < 10){
                            return<Carousel.Item key={indx} style={{marginLeft:"25vw"}}>
                            <img src={`${base_url}${movie.backdrop_path}`} className="d-block w-100" alt='' style={{maxWidth:"50vw"}}></img>
                            <h1>Question {indx + 1}/10</h1> 
                            <h3>Which movie is this?</h3>
                            <div className="form-group ">
                            <input style={{width:"50vw"}} type="text" className="form-control" id={`answer${indx}`} placeholder="Enter answer"
                                onChange={(e)=>{
                                        //this logic allows the index of quizQuestions to match the index of answered questions so as to make it easier to compare upon submission
                                        tempAnswers[indx] = e.target.value;
                                        setUserAnswers(tempAnswers);
                                        console.log(userAnswers)
                                    }}>
                            </input>
                            {/* for testing purposes */}
                            {/* <p> {movie.title}</p> */}
                            {/* {
                                movie.title === tempAnswers[indx]
                                    ? <span style={{color: "green", padding: "30px"}}>Correct!</span>
                                    : <span style={{color: "red", padding: "30px"}}>Wrong!</span>
                            } */}
                            </div>
                        </Carousel.Item>
                        }
                        else{
                            return
                        }
                        })
                    }
                </Carousel>
                {
                    //if we reach the end of the quiz, display the finish button
                    index === 9?
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <button type='submit'>Finish</button>
                    </div>:
                    <></>
                }
        </form>
    </div>
    )
}
export default Quiz;