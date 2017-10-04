Game.Mixins.Destructible = {
    name: 'Destructible',
    init: function(template) {
        this._maxHP = template['maxHP'] || 10;
        this._hp = template['maxHP'] + this.getHpBonus() || 10
        this._defenseValue = template['defenseValue'] || 0;
   
    },
    takeDamage: function(attacker, damage, msg){
        if (this.hasMixin('Equipper') && this.isWearingShields() > 0){
            damage -= this.blockDamage();
          }
        damage = Math.max(damage - this.getDefenseValue(), 0);
        this.modifyHP(-damage);
        if (msg){
            Game.sendMessage(attacker, 'Your '+msg+' hits the %s for %d damage!', [this.getName(), damage]);
        } else {
             Game.sendMessage(attacker, 'You strike the %s for %d damage!', [this.getName(), damage]);
        }
        Game.sendMessage(this, "The %s strikes you for %d damage!", [attacker.getName(), damage])
       
        if (this._hp <= 0){
            Game.sendMessage(attacker, "You kill the %s!", [this.getName()]);
            this.raiseEvent('onDeath', attacker);
            attacker.raiseEvent('onKill', this)
            this.kill();
            if (this.hasMixin(Game.Mixins.PlayerActor)){
                this.act();
            } else {
                this.getMap().removeEntity(this);
            }
        }
    },
    listeners: {
        onGainLevel: function() {
           
        },
        details: function() {
            return [
                {key: 'defense', value: this.getDefenseValue()},
                {key: 'hp', value: this.getHP()}
            ];
        }
    },

    blockDamage: function(){
        let reduction = 0;
        if (this._equipment.offhand !== null && this._equipment.offhand.EQType === "shield"){
            if (this.checkBlock(this._equipment.offhand)){
                reduction += (this._equipment.offhand.bonuses.blockValue + (this.getBlock() * 0.1))
            }
            if (this.checkBlock(this._equipment.mainHand)){
                reduction += (this._equipment.mainHand.bonuses.blockValue + (this.getBlock() * 0.1))
            }
        }
        return reduction;


    },

    checkBlock: function(shield){
        let block = this.getBlock() || 1;
        block += shield.bonuses.blockChance || 1;
        return ROT.RNG.getPercentage() < block;

    },
    
    getHP: function(){
        return this._hp;
    },
    getMaxHP: function(){
        return this._maxHP + this.getHpBonus();
    },
    setHP: function(hp) {
        this._hp = hp;
    },
    modifyHP: function(amount){
        this._hp = Math.min(this._hp + amount, this.getMaxHP())
    },
    getDefenseValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into 
        // consideration weapon and armor
        if (this.hasMixin(Game.Mixins.Equipper)) {
            let equipment = this.getEquipment();
            for (let key in equipment){
                if (equipment[key] !== null && equipment[key].hasOwnProperty('defenseValue')){
                    modifier += equipment[key].defenseValue;
                }
            }

        }

        return modifier;
    }
}





//===========================Attacker===================>>>>






Game.Mixins.Attacker = {
    name: 'Attacker',
    groupName: 'Attacker',
    listeners: {
        details: function() {
            return [{key: 'attack', value: this.getMeleeDamageModifier()}];
        }
    },

    attack: function(target){
        console.log(target);
        if (target.hasMixin('Destructible')){

            let mainWeapon;
            let offhandWeapon;
            if (this.hasMixin("Equipper")){
                mainWeapon = this._equipment.mainHand;
                offhandWeapon = this._equipment.offhand;
            } else {
                 mainWeapon = null;
                 offhandWeapon = null;
            }

            let profBonuses
            let sneak = this.checkSneakAttack(target);


            let attacks = 1;
            let offhandAttacks = 0;
       
       //determine number of attacks
        let perc =  ROT.RNG.getPercentage()
     
        while(perc < this.getDoubleSwing(mainWeapon)){
          
            attacks++;

            //check for an offhand weapon
            if (this.hasMixin("Equipper") && this._equipment.offhand !== null){
                if (this._equipment.offhand.EQType !== 'shield'){
                    if (ROT.RNG.getPercentage() < this.getDualWield()){
                        offhandAttacks++;
                    }
                }  
            }
            perc += ROT.RNG.getPercentage();
        }         

        for (let i = attacks; i > 0; i--){
            if (this.checkHit(target, mainWeapon, false)){
                let damage = this.calcMeleeDamage(mainWeapon, false);
                target.takeDamage(this, damage)

            } 

            if (offhandAttacks > 0){
                if (this.checkHit(target, offhandWeapon, true)){
                    let damage2 = this.calcMeleeDamage(offhandWeapon, true);
                    target.takeDamage(this, damage2);
                
                } 
            }
        }               
        }
    },

    checkSneakAttack(target){
        if (target.hasMixin('Sight')){
            return target.canSee(this); 
        } else {
            return false;
        }
    
    },


    calcMeleeDamage(weapon, offhand){
        let modifier = 1;
        if (offhand && weapon){
            modifier =  this.getDualWield(weapon) * 0.01;  
        } 

        let damage = Math.max(0, this.getMeleeDamageModifier(weapon));
        damage += Math.max(0, this.checkProficiencies('AttackValue', weapon))
        if (weapon){
            damage += weapon.getAttackValue() || 0;
        } 

        if ((ROT.RNG.getPercentage() * modifier ) < (this.getFlatCrit() + this.getMeleeCritical(weapon))){
            Game.sendMessage(this, "A critical hit!");
            damage *= 1.5;
            damage += this.getMeleeCriticalDamageBonus(weapon);
        }

        damage *= modifier;
        return damage;

    },

    checkHit(target, weapon, offhand){

        let perc = ROT.RNG.getPercentage()
        if (offhand){
            perc *= (this.getDualWield(weapon) * 0.01)
        }

        if (((perc + this.getAccuracyBonus(weapon)) > target.getEvasion()) +target.getFlatEvade()){
            return true;
        } else {
            Game.sendMessage(this, 'Your attack has missed!', [this.getName()]);
            Game.sendMessage(target, 'The %s\'s attack has missed!', [this.getName()]);
            return false;
        }        
    },
    
	
    throw: function(target, projectile){
        this.removeItem(this._items.indexOf(projectile));
        target.setLoot(projectile);
        let targetedEntity = target.getOccupant();
        if (targetedEntity && target.getOccupant().hasMixin('Destructible')){
            if (this.checkHit(targetedEntity)){
                let damage = projectile._attackValue || 2;
                damage += projectile._weight || 2;
                damage += Math.floor((this.getThrowStat() || 1) );
                damage = Math.floor(damage / 3);
                targetedEntity.takeDamage(this, damage);
            } 
            
                        
        }

    },
    getWeaponAttackValue: function(mainHand, offhand) {
        var modifier = 0;

        if (this.hasMixin(Game.Mixins.Equipper)) {
            if (mainHand && this._equipment.mainHand){
                modifier += this._equipment.mainHand.getAttackValue();
            }
            if (offhand && this._equipment.offhand){
                modifier += this._equipment.offhand.getAttackValue();
            }
        }
        return modifier;
    }
  

}


Game.Mixins.RangedAttacker = {
    name: 'RangedAttacker',
    groupName: 'Attacker',
    listeners: {
        details: function() {
            return [{key: 'attack', value: this.getMeleeDamageModifier()}];
        }
    },
    shoot: function(target){
        if (target.hasMixin('Destructible')){
            if (this.checkHit(target)){
                let attack = this.getRangedDamageModifier();
                attack += this.getWeaponAttackValue();
                let max = 1 + Math.max(0, attack);
                let damage = 1+Math.floor(ROT.RNG.getNormal(max, max/2));
                Game.sendMessage(target, 'The %s strikes you for %d damage!', [this.getName(), damage]);
                target.takeDamage(this, damage);

            }
        }
        

    },
    checkHit(target){
        let point1 = {
            x: this.getX(),
            y: this.getY()
        }
        let point2 = {
            x: target.getX(),
            y: target.getY()
        }
  
        let perc = ROT.RNG.getPercentage()       
        if ((perc + this.getAccuracyBonus()) - Game.Geometry.getDistance(point1, point2)*3 > target.getEvasion()){
            return true;
        } else {
            Game.sendMessage(this, 'your attack has missed!', [this.getName()]);
            Game.sendMessage(target, 'The %s\'s attack has missed!', [this.getName()]);
            return false;
        }        
    },


}