Game.Glyph = function(properties){
	properties = properties || {};
	this._char = properties['character'] || ' ';
	this._foreground = properties['foreground'] || 'white';
	this._background = properties['background'] || 'black';
};

Game.Glyph.prototype.getChar = function(visible){
	if (!visible){
		return this._char;
	}
	if (this._occupant){
		return this._occupant.getChar();
	} else if (this.hasOwnProperty('_loot') && this._loot.length){

		return this._loot[0].getChar();	
	} else {
		return this._char;
	}
	
}
Game.Glyph.prototype.getBackground = function(){
	if (this._occupant){
		return this._occupant.getBackground();
	} else {
		return this._background;
	}

}
Game.Glyph.prototype.getForeground = function(){ 
	if (this._occupant){
		return this._occupant.getForeground();
	} else if (this._loot && this._loot.length){
	
		return this._loot[0].getForeground();	
	} else {
		 return this._foreground; 
	}
   
}
Game.Glyph.prototype.getRepresentation = function() {
    return '%c{' + this._foreground + '}%b{' + this._background + '}' + this._char +
        '%c{white}%b{black}';
};