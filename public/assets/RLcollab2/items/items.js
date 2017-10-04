Game.ItemRepository = new Game.Repository('items', Game.Item);

Game.ItemRepository.define('apple', {
    name: 'apple',
    character: '%',
    foreground: 'red',
	rarity: 60,
    foodValue: 250,
	weight: 2,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('rock', {
    name: 'rock',
    character: '*',
	rarity: 70,
    foreground: 'white',
	weight: 5
});
Game.ItemRepository.define('melon', {
    name: 'melon',
    character: '%',
    foreground: 'lightGreen',
	rarity: 30,
    foodValue: 535,
    consumptions: 1,
	weight: 8,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('corpse', {
    name: 'corpse',
    character: '%',
    foodValue: 200,
	weight: 8,
    consumptions: 1,
    mixins: [Game.ItemMixins.Edible]
}, {
    disableRandomCreation: true
});

//begin weapons

Game.ItemRepository.define('dagger', {
    name: 'dagger',
    character: ')',
    foreground: 'gray',
	weight: 10,
	rarity: 60,
    attackValue: 5,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('short sword', {
    name: 'short sword',
    character: ')',
    foreground: 'white',
	weight: 20,
	rarity: 50,
    attackValue: 10,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('yew staff', {
    name: 'yew staff',
    character: ')',
    foreground: 'yellow',
	weight: 8,
	rarity: 30,
    attackValue: 5,
    defenseValue: 3,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});


Game.ItemRepository.define('hand axe', {
    name: 'hand axe',
    character: ')',
    foreground: 'red',
	weight: 30,
	rarity: 40,
    attackValue: Math.floor(Math.random() * 15),
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

// ranged weapons

 Game.ItemRepository.define('short bow', {
    name: 'short bow',
    character: '}',
    foreground: 'gray',
    weight: 7,
    attackValue: 5,
	rarity: 35,
    rangedWeapon: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

 Game.ItemRepository.define('long bow', {
    name: 'long bow',
    character: '}',
    foreground: 'brown',
    weight: 15,
	rarity: 20,
    attackValue: 7,
    rangedWeapon: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

 Game.ItemRepository.define('dart', {
    name: 'dart',
    character: '}',
    foreground: 'blue',
    weight: 3,
	rarity: 30,
    attackValue: 2,
    rangedWeapon: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});



// Wearables
Game.ItemRepository.define('tunic', {
    name: 'tunic',
    character: '[',
    foreground: 'green',
	weight: 20,
	rarity: 70,
    defenseValue: 2,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('chainmail', {
    name: 'chainmail',
    character: '[',
    foreground: 'white',
    defenseValue: 4,
	weight: 45,
	rarity: 50,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('platemail', {
    name: 'platemail',
    character: '[',
    foreground: 'aliceblue',
	weight: 85,
	rarity: 15,
    defenseValue: 6,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});
Game.ItemRepository.define('pumpkin', {
    name: 'pumpkin',
    character: '%',
    foreground: 'orange',
	rarity: 15,
    foodValue: 350,
    attackValue: 2,
    defenseValue: 2,
	weight: 14,
    wearable: true,
    wieldable: true,
    mixins: [Game.ItemMixins.Edible, Game.ItemMixins.Equippable]
});

