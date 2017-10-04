Game.Items.Selector = {
	buildItem: function(rare, spread){
		let type;
		let item = this.pickTemplate();
		if (item[1] === "Weapons"){
			type = "WeaponPrefix";
			ctor = "Weapons"
		} else {
			type = "ArmorPrefix";
			ctor = item[2];
		}
 		let prefixes = this.rarityBasedPick(rare, spread, type, ctor);
		let drop = new Game.ItemFactory.Classes[ctor](item[0]);
		drop = new Game.ItemFactory.Classes.Equipment(drop, prefixes);
		drop = new Game.Item(drop);
		return drop


	},
 
	pickTemplate: function(){
		let selectionType = Object.keys(Game.Items.Equipment)[Math.floor(Object.keys(Game.Items.Equipment).length * Math.random())]
		let selection = Game.Items.Equipment[selectionType];
		selection = this.pickRandomValue(selection)
		let ctor = selection[1];
		selection = this.pickRandomValue(selection[0])
		return [selection[0], selectionType, ctor];
	},

	pickRandomValue: function(parentObject){
		let index = Math.floor(Object.keys(parentObject).length * Math.random());
		let value = Object.keys(parentObject)[index]
		return [parentObject[value], value];
	},

	pickRandomPrefixOfType: function(option, type){
		let selected = Game.Items[type][option];
		let optArray = Object.keys(selected);
		let index = Math.floor(Math.random() * optArray.length);
		selectedPrefix = selected[optArray[index]]
		return selectedPrefix
	},


	rarityBasedPick: function(rare, spread, type, ctor){
		let selections = {};
		let options = Object.keys(Game.Items[type]);
		let bonus = 0;
		if (ctor === "Rings" || ctor === "Amulets"){
			bonus = 20;
		}
		while (rare < 100 && options.length){
			let number = Math.floor( Math.random() * options.length )
			let option = options[number]
			let pick = this.pickRandomPrefixOfType(option, type)
			if (pick.hasOwnProperty('prefix') && pick.rarity > rare - spread && pick.rarity < rare + spread){
				options.splice(number, 1);
				selections[option] = pick;
				rare +=  ( ( 100 / options.length ) - ( pick.rarity / options.length ) - bonus) ;
			} else {
				rare += 3;
			}
		}
		return selections
	},







}