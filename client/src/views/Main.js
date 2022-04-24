import React, { useState, useEffect }from 'react';
import axios from 'axios';
import background from "../img/background.png"
// import components here
// 
// 

const Main = () => {
    // const [whatever, setWhatever] = useState([]);
    // const [something, setSomething] = useState();
    const API_KEY = "039df924b633bb219ed0678a208e69d4"
    const [errors, setErrors] = useState()
	// initial check to confirm the tmdb api is up
	const checkApi = () => {
		axios.get('https://api.themoviedb.org/3/movie/550?api_key=' + API_KEY)
			.then( response =>{
				if (response.status !== 200){
					// actual response error
					setErrors("There was a problem establishing connection to the API")
						} 
				else {
					setErrors("")
				}
					}
			)
			.catch(
				// call to the api fails altogether
				err => {
					console.log( err )
					if (err.message){
						setErrors("There was a problem establishing connection to the API");
					}
				})
			}
	// useEffect to check on the status of the gov API once (hence the empty array)
	useEffect(() => {
            checkApi();
		}, [])


	return (
        <div style={{ backgroundImage: `url(${background})`}}>
            <div id="main-grid">
				<p id="test-box"></p>
				<p id="test-box2">
					<h1 id="app-title">Movie Quiz</h1>
				</p>
				<p id="test-box">
					{
						errors === ""
						? <span><a href='https://api.themoviedb.org' target="_blank" className='link-success'>API Status: OK</a></span>
						: <span><a href='https://api.themoviedb.org' target="_blank" className='link-danger'>API Status: Down</a></span>
					}
				</p>
			</div>
				{/* validation  */}
				{
					errors 
						? <span style={{color: "red", padding: "30px"}}>{errors}</span>
						: null
				}
			<div id="main-grid">
				<p id="test-box"></p>
				<p id="test-box2">
					<button type="button" id="start-game-button" class="shadow-lg btn btn-warning">Start a Game</button>
				</p>
				<p id="test-box">
					<p id="p-scoreboard">
						<h2>Scoreboard</h2>
						<table class="table table-dark">
							<thead>
								<tr>
								<th scope="col">Rank</th>
								<th scope="col">Name</th>
								<th scope="col">Score</th>
								<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
								<th scope="row">1</th>
								<td>Mark</td>
								<td>15/20</td>
								<td>Delete</td>
								</tr>
								<tr>
								<th scope="row">2</th>
								<td>Jacob</td>
								<td>11/20</td>
								<td>Delete</td>
								</tr>
								<tr>
								<th scope="row">3</th>
								<td>Larry</td>
								<td>7/20</td>
								<td>Delete</td>
								</tr>
							</tbody>
						</table>
					</p>
				</p>
			</div>
            <hr/>
            <div className='col text-center' style={{"padding":"20px"}}><a href="https://github.com/odin-shreds-guitar/movie_quiz" target="_blank" class="link-primary" style={{"text-decoration":"none", "margin-top":"20px"}}><strong>Github</strong></a></div>
        </div>
    )
}
export default Main;