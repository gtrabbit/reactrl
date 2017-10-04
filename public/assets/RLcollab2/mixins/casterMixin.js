Game.Mixins.Caster = {
	name: 'Caster',
	init: function(template){
		this._maxMP = template['maxMP'] || 20;
		this._mp = template['maxMP'] + this.getMpBonus() || 20;
		this._mpPerLevel = template['mpPerLevel'] || 5;
	},
	listeners: {
		onGainLevel: function(){
			this._maxMP += this._mpPerLevel;
		},
		details: function() {
            return [
                {key: 'mp', value: this.getMP()}
            ];
        }
	},
	getMP: function(){
		return this._mp;
	},
	getMaxMP: function(){
		return this._maxMP + this.getMpBonus();
	},
	setMP: function(mp){
		this._mp = mp;
	},
	modifyMP: function(amount){
		this._mp = Math.min(this._mp + amount, this.getMaxMP())
	}




}