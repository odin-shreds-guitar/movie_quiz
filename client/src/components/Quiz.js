import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import background from "../img/background.png"
import Navbar from "./Navbar";

const Quiz=() =>{
    // List of movies that will be used as questions
    const [quizQuestions , setQuizQuestions ] = useState([]);

    // numbre of correct answers
    var [correctAnswers, setCorrectAnswers] = useState(0);
    const base_url = "https://image.tmdb.org/t/p/original";

    //list of temporariy answers that is used as a buffer so as to set state "onchange"
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    // new state for new answers function
    const [userResponses, setUserResponses] = useState({})

    //call made to API which retrieves one full page of movies
    useEffect(()=>{
        getAnswers();   
    },[])

    // new function 
    function getAnswers(){
        const pageNum = Math.floor(Math.random() * 20);
        const finalMovies = [];
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=039df924b633bb219ed0678a208e69d4&language=en-US&page=${pageNum}`)
            .then( answers=>{
                const useableMovies = answers.data.results.filter(movie => movie.backdrop_path != null);

                for (var i = 0; i < useableMovies.length -1; i++){
                    const movieObject = {
                        id: useableMovies[i].id,
                        title: useableMovies[i].title,
                        backdrop_path: useableMovies[i].backdrop_path
                    };
                    axios.get(`https://api.themoviedb.org/3/movie/${useableMovies[i].id}/similar?api_key=039df924b633bb219ed0678a208e69d4&language=en-US&page=1`)
                        .then(results=>{
                            // build an array of 3 incorrect answers plus the correct answer that is passed into the movieOptions array
                            const movieOptions = [movieObject.title];
                            // loop through response and get 3 other titles similar
                            for (var j = 0; j < 3; j++){
                                // push to movieOptions
                                movieOptions.push(results.data.results[j].title)
                            }
                            movieOptions.sort();
                            movieObject.movieOptions = movieOptions;
                            finalMovies.push(movieObject)
                            setQuizQuestions(finalMovies)
                            })
                            .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    };
    
    //handles submission of quiz
    const handleSubmit =(e) =>{
        //prevents page from refreshing
        e.preventDefault();
        const totalAnswers = 10;
        let correct = 0;
        for (const answer in userResponses) {
            if (answer === userResponses[answer]){
                correct++;
            }  
        }
        setCorrectAnswers(correct);

        //redirects to results page after quiz is submitted
        return navigate(`/results/${correct}/${totalAnswers}`)
    }
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    // new correct set for final check
    const handleChange = (e) => {
        setUserResponses({...userResponses, [e.target.name]:e.target.value})
    }
    
    return(
    <div style={{ backgroundImage: `url(${background})`}}>
        <Navbar/>
        <form onSubmit={handleSubmit}>
                <Carousel 
                    activeIndex={index} 
                    onSelect={handleSelect}  
                    slide={false} 
                    keyboard={false} 
                    indicators={false} 
                    wrap={false} 
                    nextIcon={<i className="bi bi-arrow-right-circle-fill text-warning fs-1"></i>                    } 
                    interval={null} 
                    prevIcon={<i className="bi bi-arrow-left-circle-fill text-warning fs-1"></i>}>
                    {
                    //mapping the quiz questions in state to then display posters
                    quizQuestions.map((movie,indx)=>{
                        if(indx < 10){
                            return<Carousel.Item key={indx} style={{marginLeft:"25vw"}}>
                            <img src={`${base_url}${movie.backdrop_path}`} className="d-block w-100" alt='' style={{maxWidth:"50vw"}}></img>
                            <h1>Question {indx + 1}/10</h1> 
                            <h3>Which movie is this?</h3>
                            <div className="form-group ">
                            {
                                movie.movieOptions.map((title) => {
                                    return (
                                        <div className="form-check" key={title}>
                                        <label className="form-check-label" htmlFor={title}>
                                            <input className="form-check-input" type="radio" value={title} name={movie.title} onChange={(e) => handleChange(e)} id={title}/>{title}
                                        </label>
                                        </div>
                                    )
                                })
                            }
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
                        <button className="btn bg-transparent" type="submit"><i type="submit" className="bi bi-check-circle-fill text-success fs-1"></i></button>
                    </div>:
                    <></>
                }
        </form>
    </div>
    )
}
export default Quiz;