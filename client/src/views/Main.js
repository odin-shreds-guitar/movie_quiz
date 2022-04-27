import React from 'react';
import background from "../img/background.png"
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { PlayBtn } from 'react-bootstrap-icons';
import ScoreBoard from '../components/ScoreBoard';

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
						< ScoreBoard />
					</p>
				</p>
			</div>
            <hr/>
            <div className='col text-center' style={{"padding":"20px"}}><a href="https://github.com/odin-shreds-guitar/movie_quiz" target="_blank" className="link-primary" style={{"textDecoration":"none", "marginTop":"20px"}}><strong>Github</strong></a></div>
        </div>
    )
}
export default Main;