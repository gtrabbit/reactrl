Game.Builder = function(width, height, depth){
	this._width = width;
	this._height = height;
	this._depth = depth;
	this._tiles = new Array(depth);
	this._regions = new Array(depth);

	for (let z=0; z < depth; z++){
		this._tiles[z] = this._generateLevel();
		this._regions[z] = new Array(width);
		for (let x = 0; x < width; x++){
			this._regions[z][x] = new Array(height);
			for (let y = 0; y < height; y++){
				this._regions[z][x][y] = 0;
			}
		}
	}

	for (let z=0; z<this._depth; z++){
		this._setupRegions(z);
	}
	this._connectAllRegions();
}

Game.Builder.prototype._canFillRegion = function(x, y, z){
	if (x<0 || y<0 || z<0 || x>= this._width ||
		y>= this._height || z>= this._depth){
		return false;
	}
	if (this._regions[z][x][y] != 0){
		return false;
	}
	return this._tiles[z][x][y].isWalkable();
}

Game.Builder.prototype._removeRegion = function(region, z){
	for (let x = 0; x < this._width; x++){
		for (let y = 0; y < this._height; y++){
			if (this._regions[z][x][y] == region){
				this._regions[z][x][y] = 0;
				this._tiles[z][x][y] = Game.TileRepository.create('wallTile');

			}
		}
	}
}

Game.Builder.prototype._setupRegions = function(z){
	let region = 1;
	let tilesFilled;

	for (let x=0; x<this._width; x++){
		for (let y = 0; y<this._width; y++){
			if (this._canFillRegion(x, y, z)){
				tilesFilled = this._fillRegion(region, x, y, z);
				if (tilesFilled <= 20){
					this._removeRegion(region, z);
				} else {
					region++;
				}


			}
		}
	}
}

Game.Builder.prototype._findRegionOverlaps = function(z, r1, r2){
	let matches = [];

	for (let x = 0; x<this._width; x++){
		for (let y = 0; y < this._height; y++){
			if (this._tiles[z][x][y]._name == 'floorTile' &&
				this._tiles[z+1][x][y]._name == 'floorTile' &&
				this._regions[z][x][y] == r1 &&
				this._regions[z+1][x][y] == r2){
				matches.push({x: x, y: y})
			}
		}
	}
	return matches.randomize();
}

Game.Builder.prototype._connectRegions = function(z, r1, r2){
	let overlap = this._findRegionOverlaps(z, r1, r2);
	if (overlap.length === 0){
		return false;
	}

	let point = overlap[0];
	this._tiles[z][point.x][point.y] = Game.TileRepository.create('stairsDownTile');
	this._tiles[z+1][point.x][point.y] = Game.TileRepository.create('stairsUpTile');
	return true;
}

Game.Builder.prototype._connectAllRegions = function(){
	for (let z=0; z<this._depth -1; z++){
		let connected = {};
		let key;
		for (let x = 0; x<this._width; x++){
			for (let y=0; y<this._height; y++){
				key = this._regions[z][x][y] + ',' + this._regions[z+1][x][y];
				if (this._tiles[z][x][y]._name == 'floorTile' &&
					this._tiles[z+1][x][y]._name == 'floorTile' &&
					!connected[key]){
					this._connectRegions(z, this._regions[z][x][y],
						this._regions[z+1][x][y]);
				connected[key] = true;
				}
			}
		}
	}
}

Game.Builder.prototype._fillRegion = function(region, x, y, z){
	let tilesFilled = 1;
	let tiles = [{x:x, y:y}];
	let tile;
	let neighbors;

	this._regions[z][x][y] = region;
	while (tiles.length > 0){

		tile = tiles.pop();
		neighbors = Game.getNeighborPositions(tile.x, tile.y);
		while (neighbors.length > 0){
			tile = neighbors.pop();
			if (this._canFillRegion(tile.x, tile.y, z)){
				this._regions[z][tile.x][tile.y] = region;
				tiles.push(tile);
				tilesFilled++;
			}
		}
	
	}
	return tilesFilled;
}

Game.Builder.prototype._generateLevel = function(){
    var map = new Array(this._width);
    for (var w = 0; w < this._width; w++) {
        map[w] = new Array(this._height);
    }
    // Setup the cave generator
    var generator = new ROT.Map.Cellular(this._width, this._height);
    generator.randomize(0.5);
    var totalIterations = 3;
    // Iteratively smoothen the map
    for (var i = 0; i < totalIterations - 1; i++) {
        generator.create();
    }
    // Smoothen it one last time and then update our map
    generator.create(function(x,y,v) {
        if (v === 1) {
            map[x][y] = Game.TileRepository.create('floorTile');
        } else {
            map[x][y] = Game.TileRepository.create('wallTile');
        }
    });
    return map;
}

Game.Builder.prototype.getTiles = function () {
    return this._tiles;
}
Game.Builder.prototype.getDepth = function () {
    return this._depth;
}
Game.Builder.prototype.getWidth = function () {
    return this._width;
}
Game.Builder.prototype.getHeight = function () {
    return this._height;
}