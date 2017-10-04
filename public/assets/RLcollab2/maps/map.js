Game.Map = function(tiles, player){
	this._tiles = tiles;
	this._depth = tiles.length
	this._width = tiles[0].length;
	this._height = tiles[0][0].length;
	this._entities = {};
    this._fov = [];
   
     this.setupFov();
  
    this._explored = new Array(this._depth);
    this._setupExploredArray();
	this._scheduler = new ROT.Scheduler.Speed();
	this._engine = new ROT.Engine(this._scheduler);
};

Game.Map.prototype.getWidth = function(){
	return this._width;
};
Game.Map.prototype.getHeight = function(){
	return this._height;
};
Game.Map.prototype.getDepth = function() {
    return this._depth;
};

Game.Map.prototype.getPlayer = function() {
    return this._player;
};

Game.Map.prototype.dig = function(x, y, z) {
    // If the tile is diggable, update it to a floor
    if (this.getTile(x, y, z).isDiggable()) {
        Game.sendMessage(this._player, "You dig into the cavern wall")
        this._tiles[z][x][y] = Game.TileRepository.create('floorTile');
    } else {
        Game.sendMessage(this._player, "You dig for some time, but make no progress")
    }
}


Game.Map.prototype.removeEntity = function(entity){
    let tile = this.getTile(entity.getX(), entity.getY(), entity.getZ());
    tile.setOccupant(null);
  
	if (entity.hasMixin('Actor')){
		this._scheduler.remove(entity);
	}
    if (entity.hasMixin(Game.Mixins.PlayerActor)) {
        this._player = undefined;
    }
}

Game.Map.prototype.setupFov = function(){
    let map = this;
    for (let z = 0; z < this._depth; z++){
        (function(){
            let depth = z;
            map._fov.push(
                new ROT.FOV.PreciseShadowcasting(function(x, y){
                    if (map.getTile(x, y, depth)){
                         return !map.getTile(x, y, depth).isBlockingLight();
                    }
                   
                }
                , {topology: 4}
                ))
        }) ();
    }
}

Game.Map.prototype.getEntitiesInVisibleRadius = function(point, radius, excludeCenter){
    let targets = []
    let fov = new ROT.FOV.PreciseShadowcasting( (x, y)=>{
        if (this.getTile(x, y, point[2])){
                return !this.getTile(x, y, point[2]).isBlockingLight();
            }
    });

    fov.compute(point[0], point[1], radius, (x, y, r, visibility)=>{
        let tile = this.getTile(x,y,point[2]);
        if ( tile && tile.getOccupant() ){
            if (excludeCenter && r < 1){
                return;
            }
            targets.push(tile.getOccupant());
        }
    })
    return targets;

}

Game.Map.prototype.getTilesInVisibleRadius = function(point, radius){

    let targets = []
    let fov = new ROT.FOV.PreciseShadowcasting( (x, y)=>{
        if (this.getTile(x, y, point[2])){
                return !this.getTile(x, y, point[2]).isBlockingLight();
            }
    }, {topology: 4});

    fov.compute(point[0], point[1], radius, (x, y, r, visibility)=>{
        let coords = [x,y,point[2]];
        if (this.getTile(x, y, point[2])){
            targets.push(coords);
        }
    })
    return targets;
}



Game.Map.prototype._setupExploredArray = function(){
    for (let z = 0; z<this._depth; z++){
        this._explored[z] = new Array(this._width);
        for (let x = 0; x<this._width; x++){
            this._explored[z][x] = new Array(this._height);
            for (let y = 0; y<this._height; y++){
                this._explored[z][x][y] = false;
            }
        }
    }
}

Game.Map.prototype.setExplored = function(x, y, z, state) {
    // Only update if the tile is within bounds
    if (this.getTile(x, y, z) !== Game.Tile.nulltile) {
        this._explored[z][x][y] = state;
    }
};

Game.Map.prototype.isExplored = function(x, y, z) {
    // Only return the value if within bounds
    if (this.getTile(x, y, z) !== Game.Tile.nulltile) {
        return this._explored[z][x][y];
    } else {
        return false;
    }
};

Game.Map.prototype.getFov = function(depth){
    return this._fov[depth];
}

Game.Map.prototype.isEmptyFloor = function(x, y, z) {

    // Check if the tile is floor and also has no entity
    if (x >= this._width-2 || x < 3 || y > this._height-2 || y < 3){
        return false;
    }
    return this.getTile(x, y, z)._name == 'floorTile' &&
           !this.getEntityAt(x, y, z);
}

Game.Map.prototype.getRandomFloorPosition = function(z) {
    // Randomly generate a tile which is a floor

    let x = Math.floor(Math.random() * this._width);
    let y = Math.floor(Math.random() * this._height);
    while (!this.isEmptyFloor(x, y, z)){
        x = Math.floor(Math.random() * this._width);
        y = Math.floor(Math.random() * this._height);
    }


    return {x: x, y: y, z: z};
}



Game.Map.prototype.addEntity = function(entity) {
    // Update the entity's map
    entity.setMap(this);
    this.getTile(entity.getX(), entity.getY(), entity.getZ()).setOccupant(entity);
    // Add the entity to the list of entities
    // Check if this entity is an actor, and if so add
    // them to the scheduler
    if (entity.hasMixin('Actor')) {
       this._scheduler.add(entity, true);
    }
    if (entity.hasMixin(Game.Mixins.PlayerActor)) {
        this._player = entity;
    }
}



Game.Map.prototype.addEntityAtRandomPosition = function(entity, z) {
    var position = this.getRandomFloorPosition(z);
     if (this.isEmptyFloor(position.x, position.y, position.z)){
        entity.setX(position.x);
        entity.setY(position.y);
        entity.setZ(position.z);
        this.addEntity(entity);
     }
   
}


Game.Map.prototype.getEngine = function() {
    return this._engine;
}
Game.Map.prototype.getEntities = function() {
    return this._entities;
}


Game.Map.prototype.getEntityAt = function(x, y, z){
    return this.getTile(x, y, z).getOccupant();
}

Game.Map.prototype.getItemsAt = function(x, y, z) {
    return this.getTile(x, y, z).getLoot();
};

Game.Map.prototype.setItemsAt = function(x, y, z, items) {
    this.getTile(x, y, z).setLoot(items)
};

Game.Map.prototype.addItem = function(x, y, z, item) {
    if (typeof items != Array){
        items = [item];
    }
    this.getTile(x, y, z).setLoot(items)
};

Game.Map.prototype.addItemAtRandomPosition = function(item, z) {
    var position = this.getRandomFloorPosition(z);
    this.addItem(position.x, position.y, position.z, item);
};


Game.Map.prototype.getEntitiesWithinRadius = function(centerX, centerY,
                                                      centerZ, radius) {
    var leftX = centerX - radius;
    var rightX = centerX + radius;
    var topY = centerY - radius;
    var bottomY = centerY + radius;
   
    thingsInRadius = [];
    for (let x = leftX; x <= rightX; x++){
        for (let y = topY; y <= bottomY; y++){
            let tile = this.getTile(x, y, centerZ);
            if (tile){
                let entity = tile.getOccupant()
                if (entity){
                    thingsInRadius.push(entity)
                }
            }
            //need to check if there is a tile in the radius before getting occupant
            
        }
    }
    return thingsInRadius
};

Game.Map.prototype.getEntitiesAround = function(point, radius){
    let results = [];
    let farLeft = point[0] - radius;
    let farRight = point[0] + radius;
    let top = point[1] - radius;
    let bot = point[1] + radius;
    let tile;
    for (let x = farLeft; x <= farRight; x++){
        for (let y = top; y <= bot; y++){
            if (!(x === point[0] && y === point[1])){
                tile = this.getTile(x, y, point[2]);
            }
            if (tile){
                if (tile.getOccupant()){
                }
            }
        }
    }
    return results;

}


Game.Map.prototype.getTile = function(x, y, z) {
    // Make sure we are inside the bounds. If we aren't, return
    // null tile.
    if (x < 0 || x >= this._width || y < 0 || y >= this._height ||
        z < 0 || z >= this._depth) {
        return Game.Tile.nulltile
    } else {
        return this._tiles[z][x][y] || Game.Tile.nulltile
    }
};
