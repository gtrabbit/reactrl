	Game.Abilities['Weapon Proficiency'] = class WeaponProficiency extends Game.Abilities['Ability']{
		constructor(points, name, affinity, entity){
			super(points, name, affinity, entity);
			this.progression = Game.Abilities.levelProgressionLinear(this.maxLevel, this.affinity)
		}
	}

	Game.Abilities["Sword"] = class Sword extends Game.Abilities['Weapon Proficiency']{

		constructor(points, name, affinity, entity){
			super(points, name, affinity, entity);
			if (this.level !== "Master"){
				this.bonuses = {
					'Parry': this.level,
					'DoubleSwing': this.level,
					'AccuracyBonus': 3 * this.level,
					'AttackValue': 3 * this.level
				}
				
			} else { //static bonuses for Mastery
				this.bonuses = {
					'Parry': 15,
					'DoubleSwing': 12,
					'AccuracyBonus': 50,
					'AttackValue': 50
				}
		
			}
			this.entity._proficiencies[name] = this.bonuses;
			

		}
	}
	
	Game.Abilities["Bow"] = class Bow extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.PiercingBonus = this.level;
				this.DoubleSwing = this.level;
				this.AccuracyBonus = 3 * this.level;

			} else { //static bonuses for Mastery
				this.PiercingBonus = 15;
				this.DoubleSwing = 12;
				this.AccuracyBonus = 50;
			}
			

		}
	}
	
	Game.Abilities["Axe"] = class Axe extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master" && this.entity){
				

			} else { //static bonuses for Mastery
				this.CleavingBonus = 15;
				this.DoubleSwing = 12;
				this.AccuracyBonus = 50;
			}
			

		}
	}
	
		Game.Abilities["Mace"] = class Mace extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.BashBonus = this.level;
				this.DoubleSwing = this.level;
				this.AccuracyBonus = 3 * this.level;

			} else { //static bonuses for Mastery
				this.BashBonus = 15;
				this.DoubleSwing = 12;
				this.AccuracyBonus = 50;
			}
			

		}
	}
	
	Game.Abilities["Dagger"] = class Dagger extends Game.Abilities['Ability']{

		constructor(points, name, affinity){
			super(points, name, affinity);
			if (this.level !== "Master"){
				this.StabBonus = this.level;
				this.DoubleSwing = this.level;
				this.AccuracyBonus = 3 * this.level;
				this.CriticalDamageBonus = this.level;

			} else { //static bonuses for Mastery
				this.StabBonus = 15;
				this.DoubleSwing = 12;
				this.AccuracyBonus = 50;
				this.CriticalDamageBonus = 11;
			}
			

		}
	}
	