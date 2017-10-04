Game.Mixins = {};



Game.Mixins.FoodConsumer = {
    name: 'FoodConsumer',
    init: function(template) {
        this._maxFullness = template['maxFullness'] || 1000;
        // Start halfway to max fullness if no default value
        this._fullness = template['fullness'] || (this._maxFullness / 2);
        // Number of points to decrease fullness by every turn.
        this._fullnessDepletionRate = template['fullnessDepletionRate'] || 1;
    },
    addTurnHunger: function() {
        // Remove the standard depletion points
        this.modifyFullnessBy(-this._fullnessDepletionRate);
    },
    modifyFullnessBy: function(points) {
        this._fullness = this._fullness + points;
        if (this._fullness <= 0) {
            Game.sendMessage(this, "You are dying of hunger");
            this.setHP(this._hp + (Math.round(((this._fullness*6)-20)/50)))
        } else if (this._fullness > this._maxFullness) {
            Game.sendMessage(this, "You are already as full as you can be!");
        }
    },
    getHungerState: function() {
        // Fullness points per percent of max fullness
        var perPercent = this._maxFullness / 100;
        // 5% of max fullness or less = starving
        if (this._fullness <= perPercent * 5) {
            return 'Starving';
        // 25% of max fullness or less = hungry
        } else if (this._fullness <= perPercent * 25) {
            return 'Hungry';
        // 95% of max fullness or more = oversatiated
        } else if (this._fullness >= perPercent * 95) {
            return 'Oversatiated';
        // 75% of max fullness or more = full
        } else if (this._fullness >= perPercent * 75) {
            return 'Full';
        // Anything else = not hungry
        } else {
            return 'Not Hungry';
        }
    }
};




Game.Mixins.Sight = {
    name: "Sight",
    groupName: 'Sight',
    init: function(template){
        this._sightRadius = template['sightRadius'] || 5;
    },
    getSightRadius: function(){
        return this._sightRadius;
    },
    canSee: function(entity) {
        // If not on the same map or on different floors, then exit early
        if (!entity || this._map !== entity.getMap() || this._z !== entity.getZ()) {
            return false;
        }

        var otherX = entity.getX();
        var otherY = entity.getY();

        // If we're not in a square field of view, then we won't be in a real
        // field of view either.
        if ((otherX - this._x) * (otherX - this._x) +
            (otherY - this._y) * (otherY - this._y) >
            this._sightRadius * this._sightRadius) {
            return false;
        }

        // Compute the FOV and check if the coordinates are in there.
        var found = false;
        this.getMap().getFov(this.getZ()).compute(
            this.getX(), this.getY(), 
            this.getSightRadius(), 
            function(x, y, radius, visibility) {
                if (x === otherX && y === otherY) {
                    found = true;
                }
            });
        return found;
    },
    canSeeLocation: function(point){
        let found = false;
        this.getMap().getFov(this.getZ()).compute(
            this.getX(), this.getY(), 
            this.getSightRadius(), 
            function(x, y, radius, visibility) {
                if (x == point[0] && y == point[1]) {
                    found = true;
                }
            });
        return found;
    },
    increaseSightRadius: function(value) {
        // If no value was passed, default to 1.
        value = value || 1;
        // Add to sight radius.
        this._sightRadius += value;
        Game.sendMessage(this, "You are more aware of your surroundings!");
    }
}



Game.Mixins.ExperienceGainer = {
    name: 'ExperienceGainer',
    init: function(template) {
        this._level = template['level'] || 1;
        this._experience = template['experience'] || 0;
        this._statPointsPerLevel = template['statPointsPerLevel'] || 1;
        this._skillPointsPerLevel = template['skillPointsPerLevel'] || 1;
        this._abilityPointsPerLevel = template['abilityPointsPerLevel'] || 1;
        this._statPoints = 0;
        this._skillPoints = 0;
        this._abilityPoints = 0;
        // Determine what stats can be levelled up.
        this._statOptions = [
            'strength',
            'vitality',
            'willpower',
            'dexterity',
            'perception',
            'intelligence',
            'arcana',
            'charisma',
            'luck'
        ];


    },
    listeners: {
        onKill: function(victim) {
            var exp = (victim.getMaxHP()/10)
            for (let key in victim._stats){
                exp += (victim._stats[key]);
            }
            // Account for level differences
            if (victim.hasMixin('ExperienceGainer')) {
                exp -= (this.getLevel() - victim.getLevel()) * 3;
            }
            // Only give experience if more than 0.
            if (exp > 0) {
                this.giveExperience(Math.round(exp));
            }
        },
        details: function() {
            return [{key: 'level', value: this.getLevel()}];
        },
    },
    getLevel: function() {
        return this._level;
    },
    increaseStat: function(stat, value){
        this._stats[stat] += value;
        Game.sendMessage(this, "Your " + stat + " increases")
    },
    increaseAbility: function(ability, value){
        if (this._abilities[ability].level !== "Master"){
             this._abilities[ability] = new Game.Abilities[ability](this._abilities[ability].totalPoints + value, ability, this._abilities[ability].affinity, this);     
        }
       
    },
    getExperience: function() {
        return this._experience;
    },
    getNextLevelExperience: function() {
        return (this._level * this._level) * (10 * this._level) ;
    },
    getStatPoints: function() {
        return this._statPoints;
    },
    getSkillPoints: function(){
        return this._skillPoints;
    },
    getAbilityPoints: function(){
        return this._abilityPoints;
    },
    setAbilityPoints: function(abilityPoints){
        this._abilityPoints = abilityPoints;
    },
    setSkillPoints: function(skillPoints){
        this._skillPoints = skillPoints;
    },
    setStatPoints: function(statPoints) {
        this._statPoints = statPoints;
    },
    getStatOptions: function() {
        return this._statOptions;
    },
    giveExperience: function(points) {
        var statPointsGained = 0;
        let skillPointsGained = 0;
        let abilityPointsGained = 0;
        var levelsGained = 0;
        // Loop until we've allocated all points.
        while (points > 0) {
            // Check if adding in the points will surpass the level threshold.
            if (this._experience + points >= this.getNextLevelExperience()) {
                // Fill our experience till the next threshold.
                var usedPoints = this.getNextLevelExperience() - this._experience;
                points -= usedPoints;
                this._experience += usedPoints;
                // Level up our entity!
                this._level++;
                levelsGained++;
                this._statPoints += this._statPointsPerLevel;
                statPointsGained += this._statPointsPerLevel;
                this._skillPoints += this._skillPointsPerLevel;
                skillPointsGained += this._skillPointsPerLevel;
                this._abilityPoints += this._abilityPointsPerLevel;
                abilityPointsGained += this._abilityPointsPerLevel;
                this._maxHP += this._hpPerLevel;
            } else {
                // Simple case - just give the experience.
                this._experience += points;
                points = 0;
            }
        }
        // Check if we gained at least one level.
        if (levelsGained > 0) {
            Game.sendMessage(this, "You advance to level %d.", [this._level]);
            this.raiseEvent('onGainLevel');  
        }
    }
};

Game.Mixins.CorpseDropper = {
    name: 'CorpseDropper',
    init: function(template) {
        // Chance of dropping a cropse (out of 100).
        this._corpseDropRate = template['corpseDropRate'] || 100;
    },
    listeners: {
        onDeath: function(attacker) {
            // Check if we should drop a corpse.
            if (Math.round(Math.random() * 100) <= this._corpseDropRate) {
                // Create a new corpse item and drop it.
                this._map.addItem(this.getX(), this.getY(), this.getZ(),
                    Game.ItemRepository.create('corpse', {
                        name: this._name + ' corpse',
                        foreground: this._foreground
                    }));
            }    
        }
    }
};





Game.Mixins.MessageRecipient = {
    name: 'MessageRecipient',
    init: function(template){
        this._messages = [];
    },
    recieveMessage: function(message){
        this._messages.push(message);
    },
    getMessages: function(){
        return this._messages;
    },
    clearMessages: function(){
        this._messages = [];
    }
}

Game.sendMessage = function(recipient, message, args){
    if (recipient.hasMixin(Game.Mixins.MessageRecipient)){
        if (args){
            message = vsprintf(message, args);
        }
        recipient.recieveMessage(message);
    }
}

Game.sendMessageNearby = function(map, centerX, centerY, centerZ, message, args){
    if (args){
        message = vsprintf(message, args);
    }

    entities = map.getEntitiesWithinRadius(centerX, centerY, centerZ, 5);
    entities.forEach(function(a){
        
         
     
        if (a.hasMixin(Game.Mixins.MessageRecipient)){
           
            a.recieveMessage(message);
        }
    })
}


