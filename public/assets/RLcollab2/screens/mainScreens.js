Game.Screen = {};



Game.Screen.startScreen = {
    _availableClasses: null,
    _selectedIndex: null,
	enter: function(){
        this._selectedIndex = 0;
        this._availableClasses = Game.classTemplates.getAvailableClasses()},
	exit: function(){console.log("exited start screen");},
	render: function(display){
        display.clear();
        let entermsg = 'Please Select a Class'
        let confirmMsg = "Press [Enter] to confirm selection"
		display.drawText((Game.getScreenWidth() - entermsg.length)/2, 1, "%c{yellow}" + entermsg);
		
        let yoffset = -2;
        let y = Game.getScreenHeight()*.6;

        for (let i = 0; i < this._availableClasses.length; i++){
         
            let x = 3 + i + (i%6) * 11;

            if ( i % 6 === 0){
                yoffset +=2;
            }

            display.drawText(x, y+yoffset, this._availableClasses[i].name);

            if (i === this._selectedIndex){

                display.drawText(x-1, y+yoffset, "%c{yellow}[");
                display.drawText(x+this._availableClasses[i].name.length, y+yoffset, "%c{yellow}]");
                let description = this._availableClasses[i].description;
                display.drawText((Game.getScreenWidth() - description.length)/2, (Game.getScreenHeight()/2)-5, description )
            }
        }

        display.drawText((Game.getScreenWidth() - confirmMsg.length)/2, (Game.getScreenHeight()/2)+7+yoffset, confirmMsg);
	},
	handleInput: function(inputType, inputData){
        if (inputType === 'keydown'){
            switch(inputData.keyCode){
                case ROT.VK_NUMPAD4:
                    if (this._selectedIndex > 0){
                        this._selectedIndex--;
                        this.render(Game.getDisplay());
                    }
                    break;
                case ROT.VK_NUMPAD6:
                    if (this._selectedIndex < this._availableClasses.length-1){
                        this._selectedIndex++;
                        this.render(Game.getDisplay());
                    }          
                    break;
                case ROT.VK_RETURN:
                    Game.switchScreen(Game.Screen.playScreen, this._availableClasses[this._selectedIndex]);
                    break;
            }
		}
	}
}


Game.Screen.winScreen = {
    enter: function() {    console.log("Entered win screen."); },
    exit: function() { console.log("Exited win screen."); },
    render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
        }
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
}


Game.Screen.loseScreen = {
    enter: function() {    console.log("Entered lose screen."); },
    exit: function() { console.log("Exited lose screen."); },
    render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            display.drawText(2, i + 1, "%b{red}You lose! :(");
        }
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
}


Game.Screen.helpScreen = {
    render: function(display) {
        var text = 'jsrogue help';
        var border = '-------------';
        var y = 0;
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, text);
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, border);
        display.drawText(0, y++, 'This is a game.');
        display.drawText(0, y++, 'I suggest you start playing it!');
        y += 3;
        display.drawText(0, y++, '[,] to pick up items');
        display.drawText(0, y++, '[d] to drop items');
        display.drawText(0, y++, '[e] to eat items');
        display.drawText(0, y++, '[w] to wield items');
        display.drawText(0, y++, '[t] to throw items');
        display.drawText(0, y++, '[x] to examine items');
        display.drawText(0, y++, '[;] to look around you');
        display.drawText(0, y++, '[?] to show this help screen');
        y += 3;
        text = '--- press [escape] to continue ---';
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, text);
    },
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown'){
            if (inputData.keyCode === ROT.VK_ESCAPE){
                 Game.Screen.playScreen.setSubScreen(null);
            }
        }
       
    }
};

