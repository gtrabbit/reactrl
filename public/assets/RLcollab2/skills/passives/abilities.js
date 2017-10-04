Game.Abilities = {};

Game.Abilities.Ability = class Ability{
	constructor(points, name, affinity, entity, maxLevel){
			this.entity = entity;
			this.name = name;
			this.totalPoints = points;
			this.maxLevel = maxLevel || 10;
			this.affinity = affinity;
			this.progression = Game.Abilities.levelProgressionExponential(this.maxLevel, this.affinity);
			this.level = this.getLevel(this.totalPoints)
			this.level === -1 ? this.level = "Master" : {}
			this.toNext = Math.abs(this.totalPoints - this.progression[this.level])
		}
		getLevel(points){
			return this.progression.findIndex(points => points > this.totalPoints )

		}
}



Game.Abilities.levelProgressionExponential = function(maxLevel, affinity){
	let seq = [Math.round(0+affinity), Math.round(0+affinity+affinity)];

	for (let i=1; i<maxLevel; i++){
		let cur = Math.round(seq[i] + i + (i * affinity))
		seq.push(cur);
	}

	let result = seq.slice(1);
	return result
}

Game.Abilities.levelProgressionLinear = function(maxLevel, affinity){
	let prog = [];
	for (let i=1; i<=maxLevel; i++){
		prog.push(i * (2+affinity));
	}
	return prog;
}

//====================Abilities=====================>>>>


Game.Abilities["Combat Mastery"] = class CombatMastery extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.DoubleSwing = Math.round(this.level * 0.5);
				this.MeleeCriticalDamageBonus = Math.round(this.level * 0.6);
				this.MeleeCritical = Math.round(this.level * 0.6);
				this.MeleeDamageModifier = Math.round(this.level * 0.2);
				this.AccuracyBonus = this.level;
			} else { //static bonuses for Mastery
				this.DoubleSwing = 6;
				this.MeleeCriticalDamageBonus = 12;
				this.MeleeCritical = 7;
				this.MeleeDamageModifier = 5;
				this.AccuracyBonus = 12;
			}
			

		}
	}
	
	Game.Abilities["Light Armor"] = class LightArmor extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.LightDefense = Math.round(this.level * 0.5);
				this.Evasion = Math.round(this.level * 3);
				this.Speed = (this.level * 50);
			} else { //static bonuses for Mastery
				this.LightDefense = 6;
				this.Evasion = 35;
				this.Speed = 550;
			}
			

		}
	}
	
		Game.Abilities["Medium Armor"] = class MediumArmor extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.MediumDefense = Math.round(this.level * 0.7);
				this.Evasion = Math.round(this.level * 2);
				this.Speed = (this.level * 20);
				this.ArmorPenalty = (this.level - 3);
			} else { //static bonuses for Mastery
				this.MediumDefense = 8;
				this.Evasion = 24;
				this.Speed = 220;
				this.ArmorPenalty = -35;
			}
			

		}
	}
	
		Game.Abilities["Heavy Armor"] = class HeavyArmor extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.HeavyDefense = Math.round(this.level * 1);
				this.Speed = (this.level * 10);
				this.ArmorPenalty = (this.level - 5);
				this.ResistPhysical = (this.level * 2);
			} else { //static bonuses for Mastery
				this.MediumDefense = 8;
				this.Speed = 110;
				this.ArmorPenalty = -70;
				this.ResistPhysical = 30;
			}
			

		}
	}
	
	
	Game.Abilities["Combat Brutality"] = class CombatBrutality extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.CleavingBonus = this.level;
				this.MeleeCriticalDamageBonus = Math.round(this.level * 0.6);
				this.MeleeDamageModifier = Math.round(this.level * 0.3);
				this.MaimBonus = Math.round(this.level * 1.2);
			} else { //static bonuses for Mastery
				this.CleavingBonus = 15;
				this.MeleeCriticalDamageBonus = 10;
				this.MeleeDamageModifier = 8;
				this.MaimBonus = 14;
			}
			

		}
	}
	
	
	
	Game.Abilities["Assassination"] = class Assassination extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.MeleeCritical = Math.round(this.level * 0.5);
				this.MeleeCriticalDamageBonus = Math.round(this.level * 0.6);
				this.StabBonus = this.level;
				this.Disembowel = this.level;
				this.StealthBonus = this.level;
			} else { //static bonuses for Mastery
				this.MeleeCritical = 6;
				this.MeleeCriticalDamageBonus = 10;
				this.StabBonus= 14;
				this.Disembowel = 11;
				this.StealthBonus = 11;
			}
			

		}
	}
	
		Game.Abilities["Marksmanship"] = class Marksmanship extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.RangedCritical = (this.level * 0.5);
				this.RangedDamageModifier = (this.level * 0.5);
				this.AccuracyBonus = (this.level * 3);
			} else { //static bonuses for Mastery
				this.RangedCritical = 11;
				this.RangedDamageModifier = 11;
				this.AccuracyBonus = 35;
			}
			

		}
	}
	
		Game.Abilities["Throwing"] = class Throwing extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.RangedCritical = (this.level * 0.5);
				this.RangedDamageModifier = (this.level * 0.5);
				this.AccuracyBonus = (this.level * 3);
				this.ThrowStat = (this.level * 4);
			} else { //static bonuses for Mastery
				this.RangedCritical = 11;
				this.RangedDamageModifier = 11;
				this.AccuracyBonus = 35;
				this.ThrowStat = 50;
			}
			

		}
	}
	
		Game.Abilities["Awareness"] = class Awareness extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.SeeInvis = (this.level * 3);
				this.Evasion = (this.level * 3);
				this.SightRadius = (this.level * 0.4);

			} else { //static bonuses for Mastery
				this.SeeInvis = 35;
				this.Evasion = 30;
				this.SightRadius = 5;

			}
			

		}
	}
	
		Game.Abilities["Mysticism"] = class Mysticism extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.SpellPenetration = (this.level * 7);
				this.SpellCritical = this.level;
				this.SpellDamage = this.level; 
			} else { //static bonuses for Mastery
				this.SpellPenetration = 80;
				this.SpellCritical = this.level;
				this.SpellDamage = this.level;
			}
		}
	}
	
	Game.Abilities["Tenacity"] = class Tenacity extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.ResistPhysical = Math.round(this.level * 1.3);
				this.MaxHP = Math.round(this.level * 2);
				this.DefenseValue = Math.round(this.level * 2);
				this.RegenBonus = this.level;
			} else { //static bonuses for Mastery
				this.ResistPhysical = 25;
				this.MaxHP = 25;
				this.DefenseValue = 35;
				this.RegenBonus = 18;
			}
			

		}
	}
	
	Game.Abilities["Shield Mastery"] = class ShieldMastery extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.BlockValue = Math.round(this.level * 2);
				this.BlockChance = this.level;
			} else { //static bonuses for Mastery
				this.BlockValue = 25;
				this.BlockChance = 12;
			

		}
	}
}
	
		Game.Abilities["Guardian Combat"] = class GuardianCombat extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.ShieldBash = Math.round(this.level *1.5);
				this.BashBonus = this.level;
			} else { //static bonuses for Mastery
				this.ShieldBash = 20;
				this.BashBonus = 15;
			

		}
	}
}
	
	Game.Abilities["Dodging"] = class Dodging extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.Evasion = Math.round(this.level * 5);
			} else { //static bonuses for Mastery
				this.Evasion = 60;
			}
			

		}
	}


	Game.Abilities["Ambidexterity"] = class Ambidexterity extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.DualWield = this.level;
				this.DoubleSwing = this.level;


			} else { //static bonuses for Mastery
				this.DualWield = 15;
				this.DoubleSwing = 12;
			}
			

		}
	}
	
	Game.Abilities["Meditation"] = class Meditation extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.MpRegen = Math.round(this.level * 0.3);
				this.MagicalResist = Math.round(this.level * 2.6);
				this.MpBonus = 2 * this.level;


			} else { //static bonuses for Mastery
				this.MpRegen = 6;
				this.MagicalResist = 55;
				this.MpBonus = 24;

			}
			

		}
	}
	

	
	






