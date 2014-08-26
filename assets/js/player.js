window.player = {
    colour: "#ac0ff0",
    x: 10, y: ~~(Math.random() * (490 - 10) + 10),
    left: false, right: false,
    up: false, down: false,
    speed: 50, // Speed of the player
    currentPowerUps: [], // The current power ups
    invincible: false, // If invincible
    timers: [], // An array of setTimeouts
    deaths: 0,
    movement: function(dt){
        if(player.left){
			player.x -= player.speed * dt; // Move left
			if(player.x <= 0){ // Don't go behind this point
				player.x += player.speed * dt; // Move right
			}
		}
		if(player.right){
			player.x += player.speed * dt; // Move right
			if(player.x >= 540){ // Don't go beyond this point
				player.x -= player.speed * dt; // Move left
			}
		}
		if(player.up){
			player.y -= player.speed * dt; // Move up
			if(player.y <= 0){ // Don't go behind this point
				player.y += player.speed * dt; // Move down
			}
		}
		if(player.down){
			player.y += player.speed * dt; // Move down
			if(player.y >= 490){ // Don't go beyond this point
				player.y -= player.speed * dt; // Move up
			}
		}
    },
    hit: function(){
        for(var i in window.car.cars){
            var car = window.car.cars[i];
            
            if(
                (player.y >= car.y || player.y + 5 >= car.y || player.y - 5 >= car.y) &&
                (player.y <= car.y + car.length || player.y + 5 <= car.y + car.length || player.y- 5 <= car.y + car.length) &&
                (player.x >= car.x || player.x + 5 >= car.x || player.x - 5 >= car.x) &&
                (player.x <= car.x + 20 || player.x + 5 <= car.x + 20 || player.x - 5 <= car.x + 20)
            ){
                player.die();
            }
        }
    },
    collectPowerUp: function(){
    	for(var i in window.points.powerUps){
            var pU = window.points.powerUps[i];
            
            if(
                (player.y >= pU.y || player.y + 10 >= pU.y) &&
                (player.y <= pU.y + 5 || player.y + 10 <= pU.y + 5) &&
                (player.x >= pU.x || player.x + 10 >= pU.x) &&
                (player.x <= pU.x + 20 || player.x + 10 <= pU.x + 5)
            ){
                if(pU.power == "minion"){
                    player.currentPowerUps.push({
                        type: "minion",
                        position: ~~(Math.random() * 360)
                    });
                }else if(pU.power == "bomb"){
                    player.currentPowerUps.push({
                        type: "bomb",
                        x: player.x,
                        y: player.y,
                        alpha: .5
                    });
                }else{
                    player.currentPowerUps.push(pU.power);
                }
                var powerId = player.currentPowerUps.length - 1; // Get the current id of the power up
                points.killPowerUp(i); 
                
                if(pU.power == "speed"){
                    player.speed *= 2;
                    player.timers.push(setTimeout(function(){
                        player.speed /= 2;
                        player.currentPowerUps.splice(powerId, 1);
                        draw.trails = [];
                    }, 10000));
                }else if(pU.power == "invincibility"){
                    player.invincible = true;
                    player.timers.push(setTimeout(function(){
                        player.invincible = false;
                        player.currentPowerUps.splice(powerId, 1);
                    }, 10000));
                }else if(pU.power == "point"){
                    points.scoreUp(1);
                }else if(pU.power == "bomb"){
                    draw.explosion(pU.x, pU.y);
                }
            }
        }
    },
    die: function(){ // Reset the player
        if(!player.invincible){
            if(points.points > points.highScore){
                points.highScore = points.points;
            }
            points.points = 0;
            points.scoreSide = "right";
            player.x = 10;
            player.y = ~~(Math.random() * (490 - 10) + 10); // Get a random y position
            player.deaths++;
            
            // Clear all timers
            for(var i in player.timers){
                clearTimeout(player.timers[i]);
            }
            
            player.speed = 50; // Reset speed
            
            player.currentPowerUps = []; // Clear all powers
        }
    },
    keyManagement: function(){
        document.addEventListener("keydown", function(e){
			kc = e.keyCode
			if(kc == 65 || kc == 37){ player.left 	= true } // a || left arrow
			if(kc == 68 || kc == 39){ player.right 	= true } // d || right arrow
			if(kc == 87 || kc == 38){ player.up 	= true } // w || up arrow
			if(kc == 83 || kc == 40){ player.down 	= true } // s || down arrow
		})
		document.addEventListener("keyup", function(e){
			var kc = e.keyCode
			if(kc == 65 || kc == 37){ player.left 	= false } // a || left arrow
			if(kc == 68 || kc == 39){ player.right 	= false } // d || right arrow
			if(kc == 87 || kc == 38){ player.up 	= false } // w || up arrow
			if(kc == 83 || kc == 40){ player.down 	= false } // s || down arrow
		})
    }
}