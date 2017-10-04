Game.Repository = function(name, ctor){
	this._name = name;
	this._templates = {};
	this._ctor = ctor;
	this._randomTemplates = {};
}


Game.Repository.prototype.define = function(name, template, options) {
    this._templates[name] = template;
    // Apply any options
    var disableRandomCreation = options && options['disableRandomCreation'];
    if (!disableRandomCreation) {
        this._randomTemplates[name] = template;
    }
};

Game.Repository.prototype.create = function(name, extraProperties){
    let template = Object.create(this._templates[name]);
	if (!template){
		throw new Error("No template by the name '" + name + "' in repository '" + this._name + "'");
	}
    
    // Apply any extra properties
    if (extraProperties) {
        for (var key in extraProperties) {
            template[key] = extraProperties[key];
        }
    }
	return new this._ctor(template);
}

Game.Repository.prototype.getRarityChart = function(templates){
    let chart = {};
    for (let thing in templates){
        chart[thing.name] = thing.rarity || 100;
    }
    return chart;

}

Game.Repository.prototype.createWeightedRandom = function(chart){
    return this.create(ROT.RNG.getWeightedValue(chart))

}


Game.Repository.prototype.createRandom = function(){

	return this.create(Object.keys(this._randomTemplates).random());
}