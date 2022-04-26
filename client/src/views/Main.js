import React from 'react';
import background from "../img/background.png"
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { PlayBtn } from 'react-bootstrap-icons';

const Main = () => {
	// declaring the useNavigate to be used in the form
	const navi =useNavigate();	

	return (
        <div style={{ backgroundImage: `url(${background})`}}>
			< Navbar />
			<div id="main-grid">
				<p id="test-box"></p>
				<p id="test-box2">
					<PlayBtn color="green" size={150} onClick={() => {navi(`/quiz`)}} />
				</p>
				<p id="test-box">
					<p id="p-scoreboard">
						<h2>Scoreboard</h2>
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
            <div className='col text-center' style={{"padding":"20px"}}><a href="https://github.com/odin-shreds-guitar/movie_quiz" target="_blank" className="link-primary" style={{"textDecoration":"none", "marginTop":"20px"}}><strong>Github</strong></a></div>
        </div>
    )
}
export default Main;