Game.Mixins.RandomStatGainer = {
    name: 'RandomStatGainer',
    groupName: 'StatGainer',
    listeners: {
        onGainLevel: function() {
            let options = Object.keys(this._stats);
            while (this.getStatPoints() > 0) {
                this.increaseStat(options.random(), 1);
                this.setStatPoints(this.getStatPoints() - 1);    
            }

            if (Object.keys(this._abilities).length){
                let abilityOptions = Object.keys(this._abilities);
                let start = this.getAbilityPoints();
                for (let i = start; i > 0; i--){
                    this.increaseAbility(abilityOptions.random(), 1);
                    this.setAbilityPoints(this.getAbilityPoints() - 1);
 
                }
            } 
        }
    }
};

Game.Mixins.PlayerStatGainer = {
    name: 'PlayerStatGainer',
    groupName: 'StatGainer',
    listeners: {
        onGainLevel: function() {
            // Setup the gain stat screen and show it.
            Game.Screen.gainStatScreen.setup(this);
            Game.Screen.playScreen.setSubScreen(Game.Screen.gainStatScreen);
        }
    }
};




Game.Mixins.PlayerActor = {
    name: 'PlayerActor',
    groupName: 'Actor',
    act: function(){
        if (this._acting){
            return;
        }
        this._acting = true;
        
        if (this.getHP() < 1){
            Game.Screen.playScreen.setGameEnded(true);
            Game.sendMessage(this, 'Press [enter] to die all the way')
        }
        this._acting = false;
        this.onTick()

       
        Game.refresh();
        this.getMap().getEngine().lock();
    }
}

Game.Mixins.TaskActor = {
    name: 'TaskActor',
    groupName: 'Actor',
    init: function(template) {
        // Load tasks
        this._tasks = template['tasks'] || ['wander']; 
    },
    act: function() {
        this.onTick()
        // Iterate through all our tasks
        for (var i = 0; i < this._tasks.length; i++) {
            if (this.canDoTask(this._tasks[i])) {
                // If we can perform the task, execute the function for it.
                this[this._tasks[i]]();
                return;
            }
        }
    },
    canDoTask: function(task) {
        if (task === 'hunt') {
            return this.hasMixin('Sight') && this.canSee(this.getMap().getPlayer());
        } else if (task === 'wander') {
            return true;
        } else {
            throw new Error('Tried to perform undefined task ' + task);
        }
    },
    hunt: function() {
        var player = this.getMap().getPlayer();
    
        // If we are adjacent to the player, then attack instead of hunting.
        var offsets = Math.abs(player.getX() - this.getX()) + 
            Math.abs(player.getY() - this.getY());
        if (offsets === 1) {
            if (this.hasMixin('Attacker')) {
                this.attack(player);
                return;
            }
        }

        // Generate the path and move to the first tile.
        var source = this;
        var z = source.getZ();
        var path = new ROT.Path.AStar(player.getX(), player.getY(), function(x, y) {
            // If an entity is present at the tile, can't move there.
            var entity = source.getMap().getEntityAt(x, y, z);
            if (entity && entity !== player && entity !== source) {
                return false;
            }
            return source.getMap().getTile(x, y, z).isWalkable();
        }, {topology: 4});
        // Once we've gotten the path, we want to move to the second cell that is
        // passed in the callback (the first is the entity's strting point)
        var count = 0;
        path.compute(source.getX(), source.getY(), function(x, y) {
            if (count == 1) {
                source.tryMove(x, y, z);
            }
            count++;
        });
    },
    wander: function() {
        // Flip coin to determine if moving by 1 in the positive or negative direction
        var moveOffset = (Math.round(Math.random()) === 1) ? 1 : -1;
        // Flip coin to determine if moving in x direction or y direction
        if (Math.round(Math.random()) === 1) {
            this.tryMove(this.getX() + moveOffset, this.getY(), this.getZ());
        } else {
            this.tryMove(this.getX(), this.getY() + moveOffset, this.getZ());
        }
    }
};


Game.Mixins.GiantZombieActor = Game.extend(Game.Mixins.TaskActor, {
    init: function(template) {
       
        // Call the task actor init with the right tasks.
        Game.Mixins.TaskActor.init.call(this, Game.extend(template, {
            'tasks' : ['growArm', 'spawnSlime', 'hunt', 'wander']
        }));
        // We only want to grow the arm once.
        this._hasGrownArm = false;
    },
    canDoTask: function(task) {
       
        // If we haven't already grown arm and HP <= 20, then we can grow.
        if (task === 'growArm') {
            return this.getHP() <= 20 && !this._hasGrownArm;
        // Spawn a slime only a 10% of turns.
        } else if (task === 'spawnSlime') {
            return Math.round(Math.random() * 100) <= 10;
        // Call parent canDoTask
        } else {
           
            return Game.Mixins.TaskActor.canDoTask.call(this, task);
        }
    },
    growArm: function() {
        this._hasGrownArm = true;
        this.increaseAttackValue(5);
        // Send a message saying the zombie grew an arm.
        Game.sendMessageNearby(this.getMap(),
            this.getX(), this.getY(), this.getZ(),
            'An extra arm appears on the giant zombie!');
    },
    spawnSlime: function() {
        // Generate a random position nearby.
        var xOffset = Math.floor(Math.random() * 3) - 1;
        var yOffset = Math.floor(Math.random() * 3) - 1;

        // Check if we can spawn an entity at that position.
        if (!this.getMap().isEmptyFloor(this.getX() + xOffset, this.getY() + yOffset,
            this.getZ())) {
            // If we cant, do nothing
            return;
        }
        // Create the entity
        var slime = Game.EntityRepository.create('slime');
        slime.setX(this.getX() + xOffset);
        slime.setY(this.getY() + yOffset)
        slime.setZ(this.getZ());
        this.getMap().addEntity(slime);
    },
    listeners: {
        onDeath: function(attacker) {
            // Switch to win screen when killed!
            Game.switchScreen(Game.Screen.winScreen);
        }
    }
});

Game.Mixins.StationaryRangedAttacker = {
    name: 'StationaryRangedAttacker',
    groupName: 'Actor',
    init: function(template) {
        // Load tasks
        this._tasks = template['tasks'] || ['shoot']; 
    },
    act: function() {
        this.onTick()
        // Iterate through all our tasks
        for (var i = 0; i < this._tasks.length; i++) {
            if (this.canDoTask(this._tasks[i])) {
                // If we can perform the task, execute the function for it.
                this[this._tasks[i]]();
                return;
            }
        }
    },
    canDoTask: function(task) {
        if (task === 'shoot') {
            return this.hasMixin('Sight') && this.canSee(this.getMap().getPlayer());
        } else {
            throw new Error('Tried to perform undefined task ' + task);
        }
    },
    shoot: function(){
        let target = this.getMap().getPlayer()
        this.attack(target); 
    }
}


Game.Mixins.FungusActor = Game.extend(Game.Mixins.StationaryRangedAttacker, {
    init: function(template) {
        this._growthsRemaining = 3;
        Game.Mixins.StationaryRangedAttacker.init.call(this, Game.extend(template, {
            'tasks' : ['shoot', 'spawnFungus']
        }));
       
    },
    canDoTask: function(task) {
        if (task === 'shoot') {
            return this.hasMixin('Sight') && this.canSee(this.getMap().getPlayer());
        } else if (task=== 'spawnFungus') {
            return true;
        } else {
            throw new Error('Tried to perform undefined task ' + task);
        }
    },
    spawnFungus: function(){
        if (this._growthsRemaining > 0){
            if (Math.random() <= 0.04){
                let xOffset = Math.floor(Math.random() * 3) - 1;
                let yOffset = Math.floor(Math.random() * 3) - 1;
                let newX = this.getX() + xOffset;
                let newY = this.getY() + yOffset;
                let z = this.getZ();
                if (xOffset != 0 || yOffset != 0){
                    if (this.getMap().isEmptyFloor(newX, newY, z)){
                        let entity = Game.EntityRepository.create('fungus');
                        entity.setPosition(newX, newY, z)
                        this.getMap().addEntity(entity);
                        this._growthsRemaining--;
                        Game.sendMessageNearby(this.getMap(),
                            entity.getX(), entity.getY(), z,
                            "The fungus is spreading!")
                    }
                }
            }
        }
    }
})


