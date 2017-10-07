import React, { Component } from 'react';




class CharacterCreation extends Component {
	
	constructor(props){
		super(props)
		const classes = window.Game.classTemplates.getAvailableClasses();
		this.state = {
			classes: classes,
			selectedClass: classes[0],
			confirmed: false,
			character: null
		}
	}

	showClass = (template)=>{
		this.setState({selectedClass: template})
	}



	startGame = ()=>{
		this.props.buildCharacter(this.state.selectedClass)
		this.props.toggleScreen('CCopen')
		this.props.toggleScreen('PSopen')

	}

	goBack = ()=>{
		this.props.toggleScreen('CCopen')
		this.props.toggleScreen('ISopen')
	}


	render(){
		return (
			<div>
			<h1> Character Creation </h1>
			<div className="class-select">
				<h2> Class Selection </h2>
						<ul className="available-classes"> 
				{this.state.classes.map((a, i)=>(
					<button
						key={i}
						onClick={()=>this.showClass(a)}
					> {a.name} </button>

					) )}
				</ul>
				<div className="selected-class">
					<h3> {this.state.selectedClass.name} </h3>
				</div>
			</div>
			<div className="race-select">
				<h2> Race Selection </h2>
			</div>
			<div>
				<h2>Whatever else... idk</h2>
			</div>

			<div>

			</div>

				
				<button
					onClick={this.startGame}
					> Play </button>
				
				<button
					onClick={this.goBack}
				>Main Menu </button>
			</div>
			)

	}
}



export default CharacterCreation;


//we assume that we are in the public folder when rendering html
//<img src='assets/RLcollab2/art/UI Elements/ClassSelect.png' alt="Class Select" />