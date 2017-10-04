Game.Item = function(properties){
	properties = properties || {};
	for (let key in properties){
			this[key] = properties[key] || 0;		
		}
	Game.DynamicGlyph.call(this, properties);

}


Game.Item.extend(Game.DynamicGlyph);


//need to declare namespace here.... the basic setup is already made


Game.Items = {};
Game.Items.Prefix = {};

Game.Items.WeaponPrefix = {};
Game.Items.ArmorPrefix = {};

Game.Items.WeaponPrefix.Material = {};
Game.Items.WeaponPrefix.Quality = {};
Game.Items.WeaponPrefix.Classy = {};
Game.Items.WeaponPrefix.Adjective = {};
Game.Items.ArmorPrefix.Material = {};
Game.Items.ArmorPrefix.Quality = {};
Game.Items.ArmorPrefix.Classy = {};
Game.Items.ArmorPrefix.Adjective = {};


//for each equipment slot, you will need to define it like so

Game.Items.Equipment = {};
Game.Items.Equipment.Weapons = {};
Game.Items.Equipment.Armor = {};
Game.Items.Equipment.Armor.Helmets = {};
Game.Items.Equipment.Armor.Bracers = {};
Game.Items.Equipment.Armor.Body = {};
Game.Items.Equipment.Armor.Boots = {};
Game.Items.Equipment.Armor.Rings = {};
Game.Items.Equipment.Armor.Amulets = {};
Game.Items.Equipment.Armor.Capes = {};
Game.Items.Equipment.Armor.Shields = {};


//and so on, for shields, armor, boots, etc.
