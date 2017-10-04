Game.Skills.renderUI = function(inCoolDown){
		if (!inCoolDown){
			this.UI.childNodes[1].textContent = "";
			this.UI.style.backgroundColor = "white";	
			window.setTimeout(()=> this.UI.style.transition = "", 2000 );
			window.setTimeout(()=> {
				this.UI.style.transition = "background-color 1s";
				this.UI.style.backgroundColor = "rgba(0,0,0,0)";
			} , 50);
		} else {
			this.UI.style.opacity = this.timer / this.coolDownDuration;
			this.UI.childNodes[1].textContent = " : " + (this.coolDownDuration - this.timer);
		}

}

Game.Skills.extractCosts = function(){
	this.inCoolDown = true;
	for (let key in this.costs){
		let modifier = "modify" + key;
		this.actor[modifier](-this.costs[key]);
	}

}
 
Game.Skills.targeting = {
	singleTarget: function(actor, properties, callback){
		let offsets = Game.Screen.playScreen.getScreenOffsets();
        Game.Screen.singleProjectile.setup(actor,
                    actor.getX(), actor.getY(),
                    offsets.x, offsets.y, properties, callback);
        Game.Screen.playScreen.setSubScreen(Game.Screen.singleProjectile);
	},
	AoEAroundCaster: function(actor, props){
		return actor.getMap().getEntitiesInVisibleRadius(actor.getPosition(), props.radius, props.excludeCenter)
	}
}

Game.Skills.getAvailableSkills = function(){
	let skillsArr = [];
	for (key in Game.Skills.Templates){
		skillsArr.push(Game.Skills.Templates[key])
	}
	return skillsArr;
}

Game.Skills.GiveAllSkillsAtLevelOne = function(){
	return Game.Skills.getAvailableSkills().map(function(a){
		return [a, 1]
	})
}

Game.Skill = class skill {
	constructor(skill, actor, level){
		this.title = skill.name;
		this.coolDownDuration = Number(skill.coolDownDuration)+1;
		this.timer = 0;
		this.inCoolDown = false;
		this.isActive = false;
		this.costs = skill.costs;
		this.actor = actor;
		this.activate = skill.activate;
		this.getTargets = skill.getTargets;
		this.level = level;
		this.activateMsg = skill.activateMsg;
		this.extractCosts = Game.Skills.extractCosts
		if (skill.hasOwnProperty('determineTargetingProps')){
			this.targetingProps = skill.determineTargetingProps(this.actor, this.level);
		}
		if (this.actor.hasMixin('PlayerActor')){
			this.makeIcon();
			this.renderUI = Game.Skills.renderUI;
		}
		if (skill.hasOwnProperty('targetingType')){
			this.getTargets = Game.Skills.targeting[skill.targetingType];
		}
	}
	makeIcon(){
		let UI = document.createElement('div');
		UI.className = "skillIcon";
		UI.id = this.title;
		let name = document.createElement('span');
		name.className = "skillTitle";
		name.textContent = this.title;
		let CDcount = document.createElement('span');
		CDcount.className = "CDcount";
		UI.appendChild(name);
		UI.appendChild(CDcount);
		Game.skillBar.appendChild(UI);
		this.UI = UI;
	}
	canActivate(){
		for (let key in this.costs){
			let getter = "get" + key;
			if (this.actor[getter]() < this.costs[key]){
				return "Insufficient " + key;
			}
		}

		this.activate();
		return ""			
	}

	
	coolDown(){
		this.timer++
		if (this.timer > this.coolDownDuration){
			this.timer = 0;
			this.inCoolDown = false;
		} 
		if (this.actor.hasMixin('PlayerActor')){
			this.renderUI(this.inCoolDown);
		}	
	}
	
}