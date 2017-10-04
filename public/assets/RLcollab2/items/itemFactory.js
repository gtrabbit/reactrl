Game.ItemFactory = {};

Game.ItemFactory.EquippableListeners = {
        'details': function() {
            var results = [];
            if (this._wieldable) {
                results.push({key: 'attack', value: this.getAttackValue()});
            }
            if (this._wearable) {
                results.push({key: 'defense', value: this.getDefenseValue()});
            }
            return results;
        }
    }

Game.ItemFactory.Classes = {

Equipment: class Equipment {
	constructor(template, extras){
		//console.log("inside equipment constructor ", template)
		this.multi = 1;
		this.bonuses = {};
		this.wielderBonuses = {};
		this.prefix = [];
		this.listeners = Game.ItemFactory.EquippableListeners;
		if (template.hasOwnProperty('mixins') && template.mixins.length){
			while(template.mixins.length){
				this.mixins.push(template.mixins.pop())
			}
			delete template.mixins;
		}
//should include: weight, name, character/foreground, variance, attack/defense value
		for (let key in template){
			this[key] = template[key] || 0;		
		}

		extras.Quality ? this.make(extras.Quality) : {};
		extras.Material ? this.forge(extras.Material) : {};
		extras.Adjective ? this.build(extras.Adjective) : {};
		extras.Classy ? this.build(extras.Classy) : {};
		

		
		this.getAttackValue = function(){
			return this.attackValue === 0 ? 0 :
				Math.round(this.attackValue + (Math.random() * this.variance) - (Math.random() * this.variance))
		}
		this.getDefenseValue = function(){
			return Math.round(this.defenseValue + (Math.random() * this.variance) - (Math.random() * this.variance))
		}

		this.makeName();
		
		} 

	forge(material){
		this.prefix.push(material.prefix);
		this.weight *= material.weight;
		this.boostValue(material.baseStatBonus * this.multi);
		for (let key in material.modifies){
			this.bonuses.hasOwnProperty(key) ? this.bonuses[key] += Math.round(material.modifies[key] * this.multi * material.baseStatBonus) : this.bonuses[key] = Math.round(material.modifies[key] * this.multi * material.baseStatBonus);
		}

	} 

	make(quality){
		this.prefix.push(quality.prefix);
		this.multi = quality.multi;
		this.boostValue(this.multi);
	}

	build(classy){
		this.prefix.push(classy.prefix);
		delete classy.prefix;
		this.defenseValue += classy.defenseValue || 0;
		delete classy.defenseValue;
		this.attackValue += classy.attackValue || 0;
		delete classy.attackValue;
		for (let key in classy.modifies){
			this.bonuses.hasOwnProperty(key) ? this.wielderBonuses[key] += Math.round(classy.modifies[key] * this.multi) : this.wielderBonuses[key] = Math.round(classy.modifies[key] * this.multi );
		}
		delete classy.modifies;
		for (let key in classy){
			this.hasOwnProperty(key) ? this[key] += Math.round(classy[key] * this.multi) : this[key] = Math.round(classy[key] * this.multi );
		}

	}

	boostValue(multi){
		if (this.hasOwnProperty("attackValue")){
			this.attackValue = Math.round(this.attackValue * multi);
		}
		if (this.hasOwnProperty("defenseValue")){
			this.defenseValue = Math.round(this.defenseValue * multi);
		}
	}

	makeName(){
		let initial = this.prefix.join(" ") + " " + this.name
		this.name = initial.trim();
	} 

	// getAttackValue(){
	// 	return this.attackValue === 0 ? 0 :
	// 	Math.round(this.attackValue + (Math.random() * this.variance) - (Math.random() * this.variance))
	// }

	// getDefenseValue(){
	// 	return Math.round(this.defenseValue + (Math.random() * this.variance) - (Math.random() * this.variance))
	// }

},



//equipment class constructors

Weapons: class Weapon {
	constructor(template){
		this.baseStat = 'attackValue';
		if (!template.twoHand){
			this.EQSlot = ['mainHand', "offhand"];
		} else {
			this.EQSlot = ['mainHand']
		}
		
		this.EQType = "weapon"
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
},

Shields: class Shield {
	constructor(template){
		this.baseStat = "defenseValue";
		this.EQSlot = ['mainHand', "offhand"];
		this.EQType = "shield"
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
},

Helmets: class Helmet {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['helmet'];
		this.character = "^";
		this.EQType = "helmet";
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
},

Boots: class Boots {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['boots'];
		this.character = ",";
		this.foreground = "brown";
		this.EQType = "boots"
		for (let key in template){
			this[key] = template[key] || 0;		
		}
	}
},

Bracers: class Bracers {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['bracers'];
		this.character = "8";
		this.foreground = "rgb(200, 230, 150)";
		this.EQType = "bracers";
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
},

Body: class Body {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['body'];
		this.foreground = 'turquoise';
		this.character = "#";
		this.EQType = "armor"
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
},

Rings: class Rings {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ["leftRing", "rightRing"];
		this.character = "*";
		this.foreground = "gold";
		this.EQType = "ring";
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
},

Amulets: class Amulets {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['amulet'];
		this.character = "*";
		this.foreground = "pink";
		this.EQType = "amulet";
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
},

Capes: class Capes {
	constructor(template){
		this.baseStat = 'defenseValue';
		this.EQSlot = ['cape'];
		this.character = "[";
		this.EQType = "cape";
		for (let key in template){
			this[key] = template[key] || 0;
			
			}
		}
}			

}



