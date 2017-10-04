import React, { Component } from 'react';
import { Link } from 'react-router-dom'



class IntroScreen extends Component {
	render(){
		return (
		<div className="intro-screen" id="intro">
            <h1 className="title">TITLE OF GAME</h1>
            <div className="main-menu">
                <Link to="/newgame"> New Game </Link>
                <Link to="/continue"> Continue </Link>
                <Link to="/options"> Options </Link>
            </div>
        </div>
        )
	}
}

export default IntroScreen