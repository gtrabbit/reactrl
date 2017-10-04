
//if you make another template here, you need to define the namespace in item.js. see notes there



//====================Weapons ===========>>

//daggers
Game.Items.Equipment.Weapons.Daggers = {
	dagger: {
	character: ")",
	foreground: 'grey',
	attackValue: 5,
	name: 'dagger',
	EQsubtype: "Dagger",
	weight: 4,
	variance: 1,
	bonuses: {
		DoubleSwing: 15,
		MeleeCritical: 3,
		StabBonus: 15,
}		
},
}


//swords
Game.Items.Equipment.Weapons.Swords = {
	shortsword: {
	character: ")",
	foreground: 'white',
	attackValue: 8,
	name: 'short sword',
	EQsubtype: "Sword",
	weight: 4,
	variance: 3,
	bonuses: {   
		DoubleSwing: 8,
		MeleeCritical: 2,
		StabBonus: 7,
		ParryBonus: 2,
}
},

	longsword: {
	character: ")",
	foreground: 'white',
	attackValue: 14,
	name: 'long sword',
	EQsubtype: "Sword",
	weight: 9,
	variance: 4,
	bonuses: {
		DoubleSwing: 5,
		ParryBonus: 5,
}
},

	scimitar: {
	character: ")",
	foreground: 'white',
	attackValue: 15,
	name: 'scimitar',
	EQsubtype: "Sword",
	weight: 15,
	variance: 2,
	bonuses: {
		MeleeCritical: 3,
		ParryBonus: 3,
		CleavingBonus: 5,
		MaimBonus: 4,
}
},

	greatsword: {
	character: ")",
	foreground: 'white',
	attackValue: 24,
	name: 'great sword',
	EQsubtype: "Sword",
	weight: 30,
	variance: 6,
	bonuses: {
		MeleeCritical: 5,
		MaimBonus: 5,
		ParryBonus: 2,
		CleavingBonus: 8,
		MaimBonus: 8,
}
},
}

//staves
Game.Items.Equipment.Weapons.Staves = {
	staff: {
	character: ")",
	foreground: 'blue',
	attackValue: 6,
	name: 'staff',
	EQsubtype: "Staff",
	weight: 6,
	variance: 3,
	twoHand: true,
	bonuses: {   
		arcana: 2
}
},
}

//axes
Game.Items.Equipment.Weapons.Axes = {
	handaxe: {
	character: ")",
	foreground: 'brown',
	attackValue: 4,
	name: 'hand axe',
	EQsubtype: "Axe",
	weight: 5,
	variance: 4,
	bonuses: {
		MeleeCriticalDamageBonus: 2,
		MeleeCritical: 1,
		CleavingBonus: 3,
}
},

	broadaxe: {
	character: ")",
	foreground: 'brown',
	attackValue: 9,
	name: 'broad axe',
	EQsubtype: "Axe",
	weight: 4,
	variance: 8,
	bonuses: {  
		MeleeCriticalDamageBonus: 4,
		MeleeCritical: 2,
		CleavingBonus: 6,
}
},	
}
//================ Shields========>>
Game.Items.Equipment.Armor.Shields = {
	buckler: {
		character: "&",
		foreground: 'orange',
		defenseValue: 1,
		attackValue: 1,
		bonuses: {
			blockChance: 15,
			blockValue: 3
		},		
		name: "buckler",
		weight: 4,
	},
}



//================ Armor========>>
Game.Items.Equipment.Armor.Body = {
	crude: {
	defenseValue: 1,
	name: "crude armor",
	weight: 2
},
	
	light: {
	defenseValue: 3,
	name: "light armor",
	weight: 5,
},


	chainmail: {
	defenseValue: 7,
	name: "chainmail",
	weight: 16,
	bonuses: {
	}
},

	platemail: {
	defenseValue: 14,
	name: "platemail",
	weight: 38,
	bonuses: {
}
},
}

//================ Helmets =========>>

Game.Items.Equipment.Armor.Helmets = {
	cap: {
	defenseValue: 2,
	name: "cap",
	weight: 2,
},

	animalmask: {
	defenseValue: 1,
	name: "animal mask",
	weight: 3,
},


	helmet: {
	defenseValue: 2,
	name: "helmet",
	weight: 6,
},
	
	fullhelm: {
	defenseValue: 5,
	name: "full helm",
	weight: 9,
},
	
	feathercap: {
	defenseValue: 1,
	name: "feather cap",
	weight: 1,
	bonuses: {
	speed: 50,
	luck: 3,
	Evasion: 10,
}
},
	
	hood: {
	defenseValue: 1,
	name: "hood",
	weight: 1,
},
}

//================ Bracers =========>>

Game.Items.Equipment.Armor.Bracers = {
	bracer: {
	defenseValue: 1,
	name: "bracer",
	weight: 3,
},
	
	gauntlets: {
	defenseValue: 3,
	name: "gauntlets",
	weight: 5,
}
},

//================ Boots========>>
Game.Items.Equipment.Armor.Boots = {
	boots: {
	defenseValue: 1,
	name: "boots",
	weight: 2,
},

	chainboots: {
	defenseValue: 3,
	name: "chain boots",
	weight: 4,
},

	ninjatabi: {
	defenseValue: 1,
	name: "ninja tabi",
	weight: 1,
	bonuses: {
	Evasion: 10,
	speed: 75,
	dexterity: 2,
}
},
}

//================ Rings=====>>
Game.Items.Equipment.Armor.Rings = {
	ring: {
	defenseValue: 0,
	name: "ring",
	weight: 0,
}
},

//================ Amulets=====>>
Game.Items.Equipment.Armor.Amulets = {
	amulet: {
	defenseValue: 1,
	name: "amulet",
	weight: 0,
}
},
//=========== Capes ========>>

Game.Items.Equipment.Armor.Capes = {
	cape: {
	defenseValue: 0,
	name: "cape",
	weight: 1,
	bonuses: {
	Evasion: 10,
}
}
}

//=========== Thrown =======>>
