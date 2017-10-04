import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import IntroScreen from './introscreen';
import CharacterCreation from './charactercreation';


class App extends Component {
    
    componentWillMount(){
        const srcList = [
            "assets/RLcollab/libs/rot.min.js",
            "assets/RLcollab/libs/sprintf.min.js",
            "assets/RLcollab/core/game.js",
            "assets/RLcollab/core/utilities.js",
            "assets/RLcollab/core/repository.js",
            "assets/RLcollab/core/geometry.js",
            "assets/RLcollab/core/glyph.js",
            "assets/RLcollab/core/dynamicglyph.js",
            "assets/RLcollab/screens/mainScreens.js",
            "assets/RLcollab/screens/itemScreens.js",
            "assets/RLcollab/screens/targetScreens.js",
            "assets/RLcollab/screens/levelupscreens.js",
            "assets/RLcollab/screens/playScreen.js",
            "assets/RLcollab/skills/active/activeskills.js",
            "assets/RLcollab/skills/passives/abilities.js",
            "assets/RLcollab/skills/passives/weapon-proficiencies.js",
            "assets/RLcollab/skills/skill.js",
            "assets/RLcollab/maps/tile.js",
            "assets/RLcollab/maps/builder.js",
            "assets/RLcollab/maps/map.js",
            "assets/RLcollab/entities/entity.js",
            "assets/RLcollab/statuses/statuses.js",
            "assets/RLcollab/mixins/basicMixins.js",
            "assets/RLcollab/mixins/behaviors.js",
            "assets/RLcollab/mixins/destructibleANDattacker.js",
            "assets/RLcollab/mixins/EQbased.js",
            "assets/RLcollab/mixins/casterMixin.js",
            "assets/RLcollab/items/item.js",
            "assets/RLcollab/items/itemmixins.js",
            "assets/RLcollab/items/itemTemplates.js",
            "assets/RLcollab/items/prefixesAndsuffixes.js",
            "assets/RLcollab/items/itemFactory.js",
            "assets/RLcollab/items/itemSelector.js",
            "assets/RLcollab/entities/player/classtemplates.js",
            "assets/RLcollab/entities/entities.js",
            "assets/RLcollab/items/items.js",
            "assets/RLcollab/maps/cave.js",
            "assets/RLcollab/maps/bosscavern.js"];
        


        for (let src in srcList){
            let script = document.createElement('script');
            script.src = srcList[src];
            script.defer = true;
            window.setTimeout(()=>{
                document.body.appendChild(script);
            }, 150*src)
            

        }

    }



    render() {
        return (
            <div className="game">


            <Route
                exact path="/"
                render={()=>(
                    <IntroScreen> </IntroScreen>

                    )}
            />

            <Route
                exact path="/newgame"
                render={(history)=>(
                    <CharacterCreation> </CharacterCreation>

                    )}               
            />
            </div>

    	)



  }
}

export default App;
