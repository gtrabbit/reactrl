import React, { Component } from 'react';
import IntroScreen from './introscreen';
import CharacterCreation from './charactercreation/charactercreation';
import PlayScreen from './playscreen';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      ISopen: true,
      CCopen: false,
      PSopen: false,
      character: null

    }

  }

  toggleScreen = (screen)=>{
    this.setState(state=> (state[screen] = state[screen] ? false : true)
    );
  }

  buildCharacter = (character)=>{
    this.setState({character})
  }


    
    componentDidMount(){

        const srcList = [
            "/assets/RLcollab2/libs/rot.min.js",
            "/assets/RLcollab2/libs/sprintf.min.js",
            "/assets/RLcollab2/core/game.js",
            "/assets/RLcollab2/core/utilities.js",
            "/assets/RLcollab2/core/repository.js",
            "/assets/RLcollab2/core/geometry.js",
            "/assets/RLcollab2/core/glyph.js",
            "/assets/RLcollab2/core/dynamicglyph.js",
            "/assets/RLcollab2/screens/mainScreens.js",
            "/assets/RLcollab2/screens/itemScreens.js",
            "/assets/RLcollab2/screens/targetScreens.js",
            "assets/RLcollab2/screens/levelupscreens.js",
            "assets/RLcollab2/screens/playScreen.js",
            "assets/RLcollab2/skills/active/activeskills.js",
            "assets/RLcollab2/skills/passives/abilities.js",
            "assets/RLcollab2/skills/passives/weapon-proficiencies.js",
            "assets/RLcollab2/skills/skill.js",
            "assets/RLcollab2/maps/tile.js",
            "assets/RLcollab2/maps/builder.js",
            "assets/RLcollab2/maps/map.js",
            "assets/RLcollab2/entities/entity.js",
            "assets/RLcollab2/statuses/statuses.js",
            "assets/RLcollab2/mixins/basicMixins.js",
            "assets/RLcollab2/mixins/behaviors.js",
            "assets/RLcollab2/mixins/destructibleANDattacker.js",
            "assets/RLcollab2/mixins/EQbased.js",
            "assets/RLcollab2/mixins/casterMixin.js",
            "assets/RLcollab2/items/item.js",
            "assets/RLcollab2/items/itemmixins.js",
            "assets/RLcollab2/items/itemTemplates.js",
            "assets/RLcollab2/items/prefixesANDsuffixes.js",
            "assets/RLcollab2/items/itemFactory.js",
            "assets/RLcollab2/items/ItemSelector.js",
            "assets/RLcollab2/entities/player/classtemplates.js",
            "assets/RLcollab2/entities/entities.js",
            "assets/RLcollab2/items/items.js",
            "assets/RLcollab2/maps/cave.js",
            "assets/RLcollab2/maps/bosscavern.js"];
        


        for (let src in srcList){
            let script = document.createElement('script');
            script.src = srcList[src];
            script.defer = true;
            script.asyc = true;
            window.setTimeout(()=>{
              document.body.appendChild(script);

            }, 50*src)
            

            

        }


    }



    render() {

        return (
            <div className="game">
             

              
              {this.state.ISopen && 
                <IntroScreen 
                  toggleScreen={this.toggleScreen.bind(this)}
                  ready={true}> </IntroScreen>}
              
              {this.state.CCopen && 
                <CharacterCreation
                  toggleScreen={this.toggleScreen.bind(this)}
                  buildCharacter={this.buildCharacter.bind(this)}> </CharacterCreation>}

              {this.state.PSopen && 
                <PlayScreen
                  toggleScreen={this.toggleScreen.bind(this)}
                  character={this.state.character}
                ></PlayScreen>}


            </div>

    	)



  }
}

export default App;