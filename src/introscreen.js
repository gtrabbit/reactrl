import React, { Component } from 'react';




class IntroScreen extends Component {

  startNewGame = ()=>{
    this.props.toggleScreen('ISopen')
    this.props.toggleScreen('CCopen')
  }

  render(){
		return (
  		<div className="intro-screen" id="intro">
        <h1 className="title">TITLE OF GAME</h1>
        <div className="main-menu">
          <button
            onClick={this.startNewGame}
            disabled={!this.props.ready}
          > New Game </button>
          <button> Continue </button>
          <button> Options </button>
        </div>
      </div>
          )
	}
}

export default IntroScreen