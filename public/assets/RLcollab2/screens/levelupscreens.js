Game.Screen.gainStatScreen = {
    setup: function(entity) {
        // Must be called before rendering.
        this._entity = entity;
        this._options = entity.getStatOptions();
    },
    render: function(display) {
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        display.drawText(0, 0, 'Choose a stat to increase: ');

        // Iterate through each of our options
        for (var i = 0; i < this._options.length; i++) {
            display.drawText(0, 2 + i, 
                letters.substring(i, i + 1) + ' - ' + this._options[i]);
        }

        // Render remaining stat points
        display.drawText(0, 4 + this._options.length,
            "Remaining points: " + this._entity.getStatPoints());   
    },
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
            // If a letter was pressed, check if it matches to a valid option.
            if (inputData.keyCode >= ROT.VK_A && inputData.keyCode <= ROT.VK_Z) {
                // Check if it maps to a valid item by subtracting 'a' from the character
                // to know what letter of the alphabet we used.
                var index = inputData.keyCode - ROT.VK_A;
                if (this._options[index]) {
                    // Call the stat increasing function
                    this._entity.increaseStat(this._options[index], 1);
                    // Decrease stat points
                    this._entity.setStatPoints(this._entity.getStatPoints() - 1);
                    // If we have no stat points left, exit the screen, else refresh
                    if (this._entity.getStatPoints() == 0) {
                        Game.Screen.levelAbilitiesScreen.setup(this._entity);
                        Game.Screen.playScreen.setSubScreen(Game.Screen.levelAbilitiesScreen);
                    } else {
                        Game.refresh();
                    }
                }
            }
        }
    }
};

Game.Screen.levelAbilitiesScreen = {
    setup: function(entity){
        this._entity = entity;
        this._abilities = entity.getAbilities();
        this._options = Object.keys(this._abilities);
    },
    render: function(display){
        this.letters = 'abcdefghijklmnopqrstuvwxyz';
        display.drawText(0, 0, 'Choose an ability to increase: ');
        // Iterate through each of our options
        for (var i = 0; i < this._options.length; i++) {
            if (typeof this._abilities[this._options[i]].level === "number"){
                display.drawText(0, 2 + i, 
                this.letters.substring(i, i + 1) + ' - ' + this._options[i] + "  || Current Level: " + this._abilities[this._options[i]].level + " -- To Next Level: " + this._abilities[this._options[i]].toNext + "  || Total " + this._abilities[this._options[i]].totalPoints);
            } else {
                this.letters = "*" + this.letters;
                display.drawText(0, 2 + i, 
                this.letters.substring(i, i + 1) + " - " + this._options[i] + "  || Current Level: " + this._abilities[this._options[i]].level + " -- To Next Level: N/A" + "  || Total " + this._abilities[this._options[i]].totalPoints);
            }
        }
        display.drawText(0, 3+this._options.length, " 0 -- Save points until next level.")

        // Render remaining stat points
        display.drawText(0, 5 + this._options.length,
            "Remaining points: " + this._entity.getAbilityPoints());   
    },
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
            // If a letter was pressed, check if it matches to a valid option.
            if (inputData.keyCode >= ROT.VK_A && inputData.keyCode <= ROT.VK_Z) {
                // Check if it maps to a valid item by subtracting 'a' from the character
                // to know what letter of the alphabet we used.
                var index = inputData.keyCode - ROT.VK_A;
                if (this._options[index] && this.letters[index] !== "*") {
                    this._entity.increaseAbility(this._options[index], 1);
                    this._entity.setAbilityPoints(this._entity.getAbilityPoints() - 1);
                    this.setup(this._entity)
                    if (this._entity.getAbilityPoints() == 0) {
                        Game.Screen.playScreen.setSubScreen(null);
                    } else {
                        Game.refresh();
                    }
                } 
            } else if (inputData.keyCode === ROT.VK_0 || inputData.keyCode === ROT.VK_ESCAPE){
                Game.Screen.playScreen.setSubScreen(null);
            }
        }
    }


}