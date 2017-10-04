Game.Screen.playScreen = {

	_player: null,
	_gameEnded: false,
	_subScreen: null,
	exit: function(){
		console.log("exiting the play screen")
	},
	enter: function(className){
 
      
		let width = 100;
		let height = 48;
		let depth = 6;
		let tiles = new Game.Builder(width, height, depth).getTiles();
		this._player = new Game.Entity(className);
        console.log(this._player);
        this.skills = this._player.getSkills();
		this._map = new Game.Map.Cave(tiles, this._player);
		this._map.getEngine().start();
	},
	setSubScreen: function(subScreen){
		this._subScreen = subScreen;
		Game.refresh();
	},
    getScreenOffsets: function() {
        // Make sure we still have enough space to fit an entire game screen
        var topLeftX = Math.max(0, this._player.getX() - (Game.getScreenWidth() / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min(topLeftX, this._player.getMap().getWidth() -
            Game.getScreenWidth());
        // Make sure the y-axis doesn't above the top bound
        var topLeftY = Math.max(0, this._player.getY() - (Game.getScreenHeight() / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftY = Math.min(topLeftY, this._player.getMap().getHeight() - Game.getScreenHeight());
        return {
            x: topLeftX,
            y: topLeftY
        };
    },
	render: function(display, msgDisplay, statusDisplay){
		if (this._subScreen){
			this._subScreen.render(display);
			return;
		}
		let screenWidth = Game.getScreenWidth();
		let screenHeight = Game.getScreenHeight();
        this.renderTiles(display);

        let messages = this._player.getMessages();

        let messageY = 0;
        for (let i = 0; i < messages.length; i++){
            if (messages.length > 8){
                msgDisplay.clear();
                messages.shift();
            }
            messageY += msgDisplay.drawText(
                0,
                messageY,
                '%c{white}%b{black}' + messages[i]
                );
        }
        let printedDisplay = 'HP: %d/%d | St: %d/%d  | L: %d XP: %d'
        let displayedStats = [this._player.getHP(), 
                                        this._player.getMaxHP(),
                                        this._player.getStamina(),
                                        this._player.getMaxStamina(),
                                        this._player.getLevel(),
                                        this._player.getExperience()];
        if (this._player.hasMixin('Caster')){
            displayedStats.splice(4, 0, this._player.getMaxMP())
            displayedStats.splice(4, 0, this._player.getMP())
            printedDisplay = 'HP: %d/%d | St: %d/%d | MP: %d/%d | L: %d XP: %d'
        }

        let stats = '%c{white}%b{black}';
        stats += vsprintf(printedDisplay, displayedStats);
        display.drawText(0, screenHeight, stats);
        var hungerState = this._player.getHungerState();
        display.drawText(screenWidth - hungerState.length, screenHeight, hungerState);

        let statuses = this._player._statuses;
        let spot = 0;
        statusDisplay.clear();
        for (let status of statuses){
            spot += statusDisplay.drawText(spot, 1, status.name + " " + status.duration);
            spot += status.name.length + 5;
        }







		
	},
     renderTiles: function(display) {
        var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight();
        var offsets = this.getScreenOffsets();
        var topLeftX = offsets.x;
        var topLeftY = offsets.y;
        // This object will keep track of all visible map cells
        var visibleCells = {};
        // Store this._player.getMap() and player's z to prevent losing it in callbacks
        var map = this._player.getMap();
        var currentDepth = this._player.getZ();
        // Find all visible cells and update the object
        map.getFov(currentDepth).compute(
            this._player.getX(), this._player.getY(), 
            this._player.getSightRadius(), 
            function(x, y, radius, visibility) {
                visibleCells[x + "," + y] = true;
                // Mark cell as explored
                map.setExplored(x, y, currentDepth, true);
            });


    



        for (let x = topLeftX; x < topLeftX + screenWidth; x++){
            for (let y = topLeftY; y < topLeftY + screenHeight; y++){
                
                if (map.isExplored(x, y, currentDepth)){
                    let glyph = map.getTile(x, y, currentDepth);
                    let char = glyph.getChar();
                    let foreground = 'darkGray';
                    if (visibleCells[x+','+y]){
                        foreground = glyph.getForeground();
                        char = glyph.getChar(true);
                    } 
                    display.draw(
                        x - topLeftX,
                        y - topLeftY,
                        char,
                        foreground,
                        glyph.getBackground()
                        );
                }

            }
          
        }
  
    },
    handleInput: function(inputType, inputData){
		if (this._gameEnded){
			if (inputType === 'keydown' && inputData.keyCode === ROT.VK_RETURN){
				Game.switchScreen(Game.Screen.loseScreen);
			}
			return;
		}
		if (this._subScreen){
			this._subScreen.handleInput(inputType, inputData);
			return;
		}

		if (inputType === 'keydown'){
            let validInput = true;
			switch(inputData.keyCode){
				case ROT.VK_NUMPAD4:
					this.move(-1,0, 0);
					break;
				case ROT.VK_NUMPAD1:
					this.move(-1, 1, 0);
					break;
				case ROT.VK_NUMPAD7:
					this.move(-1, -1, 0);
					break;
				case ROT.VK_NUMPAD9:
					this.move(1, -1, 0);
					break;
				case ROT.VK_NUMPAD3:
					this.move(1, 1, 0);
					break;
				case ROT.VK_NUMPAD6:
					this.move(1,0, 0);
					break;
				case ROT.VK_NUMPAD8:
					this.move(0,-1, 0);
					break;
				case ROT.VK_NUMPAD2:
					this.move(0,1, 0);
					break;

                case ROT.VK_1:
                     if (!this.skills.length){
                        return;

                    } else {
                        if (!this.skills[0].inCoolDown){
                           Game.sendMessage(this._player, this.skills[0].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;
                case ROT.VK_2:
                     if (this.skills.length < 2){
                        return;

                    } else {
                        if (!this.skills[1].inCoolDown){
                           Game.sendMessage(this._player, this.skills[1].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;
                case ROT.VK_3:
                     if (this.skills.length < 3){
                        return;

                    } else {
                        if (!this.skills[2].inCoolDown){
                             Game.sendMessage(this._player, this.skills[2].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;
                case ROT.VK_4:
                     if (this.skills.length < 4){
                        return;

                    } else {
                        if (!this.skills[3].inCoolDown){
                             Game.sendMessage(this._player, this.skills[3].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;
                case ROT.VK_5:
                     if (this.skills.length < 5){
                        return;

                    } else {
                        if (!this.skills[4].inCoolDown){
                          Game.sendMessage(this._player, this.skills[4].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;
                case ROT.VK_6:
                    if (this.skills.length < 6){
                        return;

                    } else {
                        if (!this.skills[5].inCoolDown){
                           Game.sendMessage(this._player, this.skills[5].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;
                case ROT.VK_7:
                    if (this.skills.length < 7){
                        return;

                    } else {
                        if (!this.skills[6].inCoolDown){
                            Game.sendMessage(this._player, this.skills[6].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;
                case ROT.VK_8:
                   if (this.skills.length < 8){
                        return;

                    } else {
                        if (!this.skills[7].inCoolDown){
                            Game.sendMessage(this._player, this.skills[7].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;
                case ROT.VK_9:
                   if (this.skills.length < 9){
                        return;

                    } else {
                        if (!this.skills[8].inCoolDown){
                           Game.sendMessage(this._player, this.skills[8].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;
                case ROT.VK_0:
                    if (this.skills.length < 10){
                        return;

                    } else {
                        if (!this.skills[9].inCoolDown){
                            Game.sendMessage(this._player, this.skills[9].canActivate())
                        } else {
                            Game.sendMessage(this._player, "Skill is in cooldown!")
                            return;
                        }
                    }
                   
                    break;



                case ROT.VK_F:
                    if (this._player.hasMixin('RangedAttacker')){
                        let point = {
                            x: this._player.getX(),
                            y: this._player.getY(),
                            z: this._player.getZ()
                        }
                        let radius = this._player.getSightRadius();
                        let target = Game.Geometry.getClosestTarget(this._map, point, radius, this._player);
                        if (target){
                            this._player.shoot(target);
                        }
                    } else {
                        Game.sendMessage(this._player, "You do not have a ranged weapon equipped")
                    }
                    break;
                case ROT.VK_T:
                    Game.Screen.selectProjectile.setup(this._player, this._player.getItems())
                    this.setSubScreen(Game.Screen.selectProjectile);
                    break;

				case ROT.VK_I:
					this.showItemsSubScreen(Game.Screen.inventoryScreen, this._player.getItems(),
                        'You are not carrying anything.');
                    break;
                case ROT.VK_E:
                	this.showItemsSubScreen(Game.Screen.eatScreen, this._player.getItems(),
                       'You have nothing to eat.');
                    break;
                case ROT.VK_W:
                    if (inputData.shiftKey){
                        this.showItemsSubScreen(Game.Screen.wearScreen, this._player.getItems(),
                            'You have nothing to wear.');
                    } else {
                        // Show the wield screen
                        this.showItemsSubScreen(Game.Screen.wieldScreen, this._player.getItems(),
                            'You have nothing to wield.');
                    }
                    break;

                case ROT.VK_D:
                	this.showItemsSubScreen(Game.Screen.dropScreen, this._player.getItems(),
                        'You have nothing to drop.');
                    break;
                case ROT.VK_COMMA:
                	var items = this._player.getMap().getItemsAt(this._player.getX(), this._player.getY(), this._player.getZ());
                    // If there is only one item, directly pick it up
                    if (items && items.length === 1) {
                        var item = items[0];
                        if (this._player.pickupItems([0])) {
                            Game.sendMessage(this._player, "You pick up %s.", [item.describeA()]);
                        } else {
                            Game.sendMessage(this._player, "Your inventory is full! Nothing was picked up.");
                        }
                    } else {
                        this.showItemsSubScreen(Game.Screen.pickupScreen, items,
                            'There is nothing here to pick up.');
                    } 
                    break;

                case ROT.VK_X:
                    this.showItemsSubScreen(Game.Screen.examineScreen, this._player.getItems(),
                    'You have nothing to examine.');
                    return;


				default:
                    validInput = false;
					break;
			}
            if (validInput){
                this._player.getMap().getEngine().unlock();
            }
			
		} else if (inputType === 'keypress'){
			let keyChar = String.fromCharCode(inputData.charCode);
			switch (keyChar){
				case ">":
					this.move(0, 0, 1);
                    this._player.getMap().getEngine().unlock();
					break;
				case "<":
					this.move(0,0,-1);
                    this._player.getMap().getEngine().unlock();
					break;
                case "?":
                    this.setSubScreen(Game.Screen.helpScreen);
                    return;

                case ";":
                    var offsets = this.getScreenOffsets();
                    Game.Screen.lookScreen.setup(this._player,
                    this._player.getX(), this._player.getY(),
                    offsets.x, offsets.y);
                    this.setSubScreen(Game.Screen.lookScreen);
                    return;
				default:

					break;
			}
			
		}
        
		
	},
	move: function(dX, dY, dZ){
		let newX = this._player.getX() + dX;
		let newY = this._player.getY() + dY;
		let newZ = this._player.getZ() + dZ;
		this._player.tryMove(newX, newY, newZ, this._player.getMap());
	},
	setGameEnded: function(gameEnded){
		this._gameEnded = gameEnded;
	},
    showItemsSubScreen: function(subScreen, items, emptyMessage) {
        if (items && subScreen.setup(this._player, items) > 0) {
            this.setSubScreen(subScreen);
        } else {
            Game.sendMessage(this._player, emptyMessage);
            Game.refresh();
        }
    }
}
