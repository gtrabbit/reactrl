import React, { Component } from 'react';
import Skillbar from './skillbar';


class PlayScreen extends Component {

	componentDidMount(){
		window.Game.startup.newgame(null)
		window.Game.startup.makeNewCharacter(this.props.character)
		console.log("cats")
	}

	render(){

		return (
			<div>
			<div id="gameDisplayContainer">
			</div>
			<Skillbar> </Skillbar>
			</div>
			)


	}

}


export default PlayScreen