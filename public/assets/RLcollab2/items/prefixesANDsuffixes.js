


//===================MATERIAL===========>>>>
Game.Items.WeaponPrefix.Material.Bone = {
	prefix: "bone",
	baseStatBonus: 1,
	rarity: 40,
	attackValue: 1.2,
	weight: 0.5,
	modifies: {
	speed: 30,
	DoubleSwing: 5,
}
}

Game.Items.ArmorPrefix.Material.Bone = {
	prefix: "bone",
	baseStatBonus: 1,
	rarity: 40,
	defenseValue: 1,
	weight: 0.5,
	modifies: {
	ResistNether: 15,
	speed: 20,
	
}
}
Game.Items.WeaponPrefix.Material.Stone = {
	prefix: "stone",
	baseStatBonus: 1,
	rarity: 40,
	attackValue: 1.2,
	weight: 4,
	modifies: {
	
}
}

Game.Items.ArmorPrefix.Material.Stone = {
	prefix: "stone",
	baseStatBonus: 1,
	rarity: 40,
	defenseValue: 1.2,
	weight: 4,
	modifies: {
	
}
}

Game.Items.ArmorPrefix.Material.Cloth = {
	prefix: "cloth",
	baseStatBonus: 1,
	rarity: 40,
	defenseValue: 0.5,
	weight: 0.3, 
	modifies: { 
	Evasion: 15,
	speed: 25,
}
}

Game.Items.WeaponPrefix.Material.Wooden = {
	prefix: "wood",
	baseStatBonus: 0.6,
	rarity: 30,
	attackValue: 0.6,
	weight: 0.8, 
	modifies: { 
	DoubleSwing: 20
}
}

Game.Items.ArmorPrefix.Material.Wooden = {
	prefix: "wood",
	baseStatBonus: 0.6,
	rarity: 30,
	defenseValue: 0.6,
	weight: 0.8, 
	modifies: { 
}
}

Game.Items.WeaponPrefix.Material.Silver = {
	prefix: "silver",
	baseStatBonus: 1.5,
	rarity: 18,
	attackValue: 1.3,
	weight: 2, 
	modifies: { 
	MeleeCriticalDamageBonus: 4,
	MagicSlayer: 3
}
}

Game.Items.ArmorPrefix.Material.Silver = {
	prefix: "silver",
	baseStatBonus: 1.5,
	rarity: 18,
	defenseValue: 1.3,
	weight: 2, 
	modifies: { 
	MagicalResist: 16,
}
}

Game.Items.WeaponPrefix.Material.Iron = {
	prefix: "iron",
	baseStatBonus: 1,
	rarity: 40,
	attackValue: 1.2,
	weight: 2.2,
	modifies: {
	MeleeCriticalDamageBonus: 4,
	
}
}

Game.Items.ArmorPrefix.Material.Iron = {
	prefix: "iron",
	baseStatBonus: 1,
	rarity: 40,
	defenseValue: 1.2,
	weight: 2.2,
	modifies: {
	ResistPhysical: 15,
	
}
}

Game.Items.WeaponPrefix.Material.Steel = {
	prefix: "steel",
	baseStatBonus: 1.2,
	rarity: 18,
	attackValue: 1.3,
	weight: 1.5,
	modifies: {
	MeleeCriticalDamageBonus: 4,
		
}
}

Game.Items.WeaponPrefix.Material.Mithril = {
	prefix: "mithril",
	baseStatBonus: 1.7,
	rarity: 5,
	attackValue: 1.5,
	weight: 1.2,
	modifies: {
	MeleeCriticalDamageBonus: 4,
	MeleeDamageModifier: 4,
		
}
}

Game.Items.ArmorPrefix.Material.Mithril = {
	prefix: "mithril",
	baseStatBonus: 1.7,
	rarity: 5,
	attackValue: 1.3,
	weight: 1.2,
	modifies: {
	MeleeCriticalDamageBonus: 4,
	ResistPhysical: 20,
		
}
}

Game.Items.WeaponPrefix.Material.Etherial = {
	prefix: "etherial",
	baseStatBonus: 1.2,
	rarity: -2,
	attackValue: 1.1,
	weight: 0.6,
	modifies: {
	MeleeCriticalDamageBonus: 4,
	MagicSlayer: 8,
	SpellPenetration: 35
		
}
}

Game.Items.WeaponPrefix.Material.Vorpal = {
	prefix: "vorpal",
	baseStatBonus: 2.5,
	rarity: -2,
	attackValue: 1.6,
	weight: 1,
	modifies: {
	MeleeCriticalDamageBonus: 7,
	MeleeDamageModifier: 5,
	IgnoreArmor: 20,
		
}
}

Game.Items.ArmorPrefix.Material.Steel = {
	prefix: "steel",
	baseStatBonus: 1.2,
	defenseValue: 1.3,
	rarity: 18,
	weight: 1.5,
	modifies: {
		
}
}

Game.Items.WeaponPrefix.Material.Elven = {
	prefix: "elven",
	baseStatBonus: 2.2,
	rarity: 5,
	weight: 0.6,
	attackValue: 1.1,
	modifies: {
	MeleeCriticalDamageBonus: 2,
	DoubleSwing: 5,
}
}

Game.Items.ArmorPrefix.Material.Elven = {
	prefix: "elven",
	baseStatBonus: 2.2,
	rarity: 5,
	weight: 0.6,
	defenseValue: 1.1,
	modifies: {
	speed: 75,
}
}

Game.Items.WeaponPrefix.Material.Glass = {
	prefix: "glass",
	baseStatBonus: 1,
	rarity: 18,
	weight: 0.2,
	attackValue: 0.5,
	modifies: {
	speed: 250,
	DoubleSwing: 15,
}
}
Game.Items.ArmorPrefix.Material.Glass = {
	prefix: "glass",
	baseStatBonus: 1,
	rarity: 18,
	defenseValue: 0.5,
	weight: 0.2,
	modifies: {
	speed: 150,
}
}

//=========================QUALITY===========>>>>>>

Game.Items.ArmorPrefix.Quality.Good = {
	prefix: "good",
	rarity: 60,
	multi: 1.5, //all relevant attributes multiplied by this number
			//these three are the only relevant values for this prefix type
}

Game.Items.WeaponPrefix.Quality.Good = {
	prefix: "good",
	rarity: 60,
	multi: 1.5, //all relevant attributes multiplied by this number
			//these three are the only relevant values for this prefix type
}

Game.Items.ArmorPrefix.Quality.Formidable = {
	prefix: "formidable",
	rarity: 45,
	multi: 1.75,
	
}

Game.Items.WeaponPrefix.Quality.Formidable = {
	prefix: "formidable",
	rarity: 45,
	multi: 1.75,
	
}

Game.Items.ArmorPrefix.Quality.Cheap = {
	prefix: "cheap",
	multi: 0.4,
	rarity: 100, 

}

Game.Items.WeaponPrefix.Quality.Cheap = {
	prefix: "cheap",
	multi: 0.4,
	rarity: 100, 

}

Game.Items.ArmorPrefix.Quality.Shoddy = {
	prefix: "shoddy",
	multi: 0.7,
	rarity: 120,

}

Game.Items.WeaponPrefix.Quality.Shoddy = {
	prefix: "shoddy",
	multi: 0.7,
	rarity: 120,

}

Game.Items.ArmorPrefix.Quality.Exquisite = {
	prefix: "exquisite",
	multi: 3,
	rarity: 20,

}

Game.Items.WeaponPrefix.Quality.Exquisite = {
	prefix: "exquisite",
	multi: 3,
	rarity: 20,

}

Game.Items.ArmorPrefix.Quality.Masterwork = {
	prefix: "masterwork",
	multi: 3.5,
	rarity: 10,

}

Game.Items.WeaponPrefix.Quality.Masterwork = {
	prefix: "masterwork",
	multi: 3.5,
	rarity: 10,

}

Game.Items.ArmorPrefix.Quality.Glorious = {
	prefix: "glorious",
	multi: 2.5,
	rarity: 30,

}

Game.Items.WeaponPrefix.Quality.Glorious = {
	prefix: "glorious",
	multi: 2.5,
	rarity: 30,

}

Game.Items.ArmorPrefix.Quality.Miraculous = {
	prefix: "miraculous",
	multi: 4,
	rarity: 5,
	
}

Game.Items.WeaponPrefix.Quality.Miraculous = {
	prefix: "miraculous",
	multi: 4,
	rarity: 5,
	
}

Game.Items.ArmorPrefix.Quality.Godlike = {
	prefix: "godlike",
	multi: 5,
	rarity: -10,
	
}

Game.Items.WeaponPrefix.Quality.Godlike = {
	prefix: "godlike",
	multi: 5,
	rarity: -10,
	
}



//====================== CLASSY ===============>>>



Game.Items.WeaponPrefix.Classy.Squire = {
	prefix: "squire's", //notice that these do not need to line up with how it's declared above
	modifies: {
		vitality: 2,
		strength: 3,
		AccuracyBonus: 20,
	},
	rarity: 25,
}

Game.Items.ArmorPrefix.Classy.Squire = {
	prefix: "squire's",
	modifies: {
		vitality: 2,
		strength: 3,
		DefenseValue: 2,
	},
	rarity: 25,
}

Game.Items.WeaponPrefix.Classy.Thief = {
	prefix: "theif's", 
	modifies: {
		dexterity: 3,
		MeleeCritical: 2,
	},
	rarity: 25,
}

Game.Items.ArmorPrefix.Classy.Thief = {
	prefix: "thief's", 
	modifies: {
		dexterity: 3,
		Evasion: 15,
	},
	rarity: 25,
}

Game.Items.WeaponPrefix.Classy.Mage = {
	prefix: "mage's", 
	modifies: {
		intelligence: 3,
		SpellCritical: 3,
	},
	rarity: 25,
}

Game.Items.ArmorPrefix.Classy.Mage = {
	prefix: "mage's", 
	modifies: {
		intelligence: 2,
		arcana: 4,
	},
	rarity: 25,
}

Game.Items.WeaponPrefix.Classy.Illusionist = {
	prefix: "illusionist's",  
	modifies: {
		arcana: 6,
		Evasion: 25,
		MagicalResist: 15
	},
	rarity: 12,
}

Game.Items.ArmorPrefix.Classy.Illusionist = {
	prefix: "illusionist's",  
	modifies: {
		arcana: 6,
		Evasion: 25,
		MagicalResist: 15
	},
	rarity: 12,
}


Game.Items.WeaponPrefix.Classy.Ninja = {
	prefix: "ninja's",
	modifies: {
		perception: 4,
		DoubleSwing: 8,
		ThrowStat: 10,
	},
	rarity: 12,
}

Game.Items.ArmorPrefix.Classy.Ninja = {
	prefix: "ninja's",
	modifies: {
		speed: 100,
		perception: 4,
		dexterity: 4,
		ThrowStat: 10,
	},
	rarity: 12,
}

//========================ADJECTIVE ==============>>>

Game.Items.WeaponPrefix.Adjective.Sharp = {
	prefix: "sharp",
	rarity: 20,
	modifies: {
		MeleeCritical: 3, 
	}
}

Game.Items.WeaponPrefix.Adjective.Deadly = {
	prefix: "deadly",
	rarity: 10,
	modifies: {
		MeleeCritical: 5, 
	}
}

Game.Items.WeaponPrefix.Adjective.Ruthless = {
	prefix: "ruthless",
	rarity: 3,
	modifies: {
		MeleeCritical: 8, 
	}
}

Game.Items.WeaponPrefix.Adjective.Cruel = {
	prefix: "cruel",
	rarity: 20,
	modifies: {
		MeleeDamageModifier: 2, 
	}
}

Game.Items.WeaponPrefix.Adjective.Vicious = {
	prefix: "vicious",
	rarity: 10,
	modifies: {
		MeleeDamageModifier: 4,
	}
}

Game.Items.WeaponPrefix.Adjective.Wicked = {
	prefix: "wicked",
	rarity: 3,
	modifies: {
		MeleeDamageModifier: 7,
	}
}


Game.Items.WeaponPrefix.Adjective.swift = {
	prefix: "swift",
	rarity: 5,
	modifies: {
		DoubleSwing: 15,
		dexterity: 2,
	}
}

Game.Items.ArmorPrefix.Adjective.Agile = {
	prefix: "agile",
	rarity: 7,
	modifies: {
		Speed: 100,
		dexterity: 4,
	}
}

Game.Items.WeaponPrefix.Adjective.Furious = {
	prefix: "furious",
	rarity: 7,
	modifies: {
		DoubleSwing: 10,
		strength: 3,
	}
}

Game.Items.ArmorPrefix.Adjective.Vigorous = {
	prefix: "vigorous",
	rarity: 12,
	modifies: {
		HpBonus: 10,
		vitality: 2,
		RegenBonus: 1,
	}
}

Game.Items.ArmorPrefix.Adjective.Mystic = {
	prefix: "mystic",
	rarity: 12,
	modifies: {
		MpBonus: 10,
		arcana: 2,
		MagicRegenBonus: 1,
	}
}

Game.Items.ArmorPrefix.Adjective.Spiked = {
	prefix: "spiked",
	meleeDamageModifier: 4,
	defenseValue: 3,
	rarity: 12,
}