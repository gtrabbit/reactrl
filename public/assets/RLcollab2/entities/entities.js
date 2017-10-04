Game.EntityRepository = new Game.Repository('entities', Game.Entity);



//templates here can be created/modified very similar to the classTemplates


Game.EntityRepository.define('fungus', {
    name: 'fungus',
    character: 'F',
    foreground: 'rgb(30,200,30)',
    maxHP: 10,
	stats: {
        strength: 5,
        vitality: 3,
        willpower: 5,
        dexterity: 5,
		perception: 7,
        intelligence: 5,
        arcana: 5,
        charisma: 5,
        luck: 5,
    },
		abilities: [
        ["Combat Mastery", 0, 1],
        ["Tenacity", 0, 1],
		["Marksmanship", 0, 1],
    ],
	attackValue: 3,
	defenseValue: 3,
    speed: 250,
	rarity: 50,
    mixins: [Game.Mixins.FungusActor,
            Game.Mixins.Destructible,
            Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer,
            Game.Mixins.Sight,
            Game.Mixins.Attacker]

});

Game.EntityRepository.define('giant zombie', {
    name: 'giant zombie', 
    character: 'Z',
    foreground: 'teal',
    maxHp: 100,
	stats: {
        strength: 10,
        vitality: 10,
        willpower: 6,
        dexterity: 2,
		perception: 2,
        intelligence: 1,
        arcana: 1,
        charisma: 1,
        luck: 3,
    },
    attackValue: 12,
    defenseValue: 5,
    level: 5,
	rarity: 3,
    sightRadius: 6,
    mixins: [Game.Mixins.GiantZombieActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('slime', {
    name: 'slime',
    character: 's',
    foreground: 'lightGreen',
    maxHp: 10,
	rarity: 80,
    sightRadius: 3,
    stats: {
        strength: 5,
        vitality: 4,
        willpower: 3,
        dexterity: 4,
        intelligence: 1,
		perception: 3,
        arcana: 1,
        charisma: 1,
        luck: 5
    },
	 abilities: [
        ["Combat Mastery", 0, 1],
        ["Tenacity", 0, 3],
    ],
	attackValue: 3,
	defenseValue: 2,
    tasks: ['hunt', 'wander'],
    mixins: [Game.Mixins.TaskActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer, Game.Mixins.RandomStatGainer]
});

Game.EntityRepository.define('bat', {
    name: 'bat',
    character: 'B',
    foreground: 'white',
    maxHP: 5,
	rarity: 70,
	stats: {
        strength: 3,
        vitality: 2,
        willpower: 4,
        dexterity: 8,
		perception: 7,
        intelligence: 1,
        arcana: 1,
        charisma: 1,
        luck: 5,
    },
    speed: 2000,
    mixins: [Game.Mixins.TaskActor, 
             Game.Mixins.Attacker,
             Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
});

Game.EntityRepository.define('newt', {
    name: 'newt',
    character: 'n',
    foreground: 'yellow',
    maxHP: 3,
	rarity: 75,
	stats: {
        strength: 3,
        vitality: 3,
        willpower: 2,
        dexterity: 7,
		perception: 7,
        intelligence: 2,
        arcana: 1,
        charisma: 5,
        luck: 5,
    },
	attackValue: 3,
	defenseValue: 1,
    mixins: [Game.Mixins.TaskActor, 
             Game.Mixins.Attacker,
             Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
});

Game.EntityRepository.define('kobold', {
    name: 'kobold',
    character: 'k',
    foreground: 'white',
    maxHp: 6,
	rarity: 70,
	stats: {
        strength: 3,
        vitality: 3,
        willpower: 3,
        dexterity: 7,
		perception: 7,
        intelligence: 3,
        arcana: 2,
        charisma: 2,
        luck: 5,
    },
	speed: 300,
	attackValue: 2,
	defenseValue: 1,
    sightRadius: 5,
	
	abilities: [
        ["Combat Mastery", 0, 1],
        ["Tenacity", 0, 1]
    ],
    tasks: ['hunt', 'wander'],
    mixins: [Game.Mixins.TaskActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
});

Game.EntityRepository.define('orc', {
	name: 'orc',
	character: 'O',
	foreground: 'DarkOliveGreen',
	maxHP: 12,
	rarity: 65,
	stats: {
        strength: 8,
        vitality: 6,
        willpower: 3,
        dexterity: 4,
		perception: 4,
        intelligence: 3,
        arcana: 2,
        charisma: 3,
        luck: 5,
    },
	sightRadius: 5,
	attackValue: 4,
	defenseValue: 2,
    abilities: [
        ["Combat Mastery", 0, 1],
        ["Tenacity", 0, 1],
    ],
	tasks: ['hunt', 'wander'],
	mixins: [Game.Mixins.TaskActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
});

Game.EntityRepository.define('ogre', {
	name: 'ogre',
	character: 'O',
	foreground: 'Chocolate',
	maxHP: 20,
	rarity: 30,
	stats: {
        strength: 13,
        vitality: 9,
        willpower: 7,
        dexterity: 3,
		perception: 3,
        intelligence: 3,
        arcana: 2,
        charisma: 2,
        luck: 5,
    },
	attackValue: 6,
	defenseValue: 3,
	sightRadius: 5,
	    abilities: [
        ["Combat Mastery", 0, 2],
        ["Tenacity", 0, 3],
		["Combat Brutality", 0, 1],
    ],
	tasks: ['hunt', 'wander'],
	mixins: [Game.Mixins.TaskActor, Game.Mixins.Sight,
             Game.Mixins.Attacker, Game.Mixins.Destructible,
             Game.Mixins.CorpseDropper,
             Game.Mixins.ExperienceGainer,
            Game.Mixins.RandomStatGainer]
});