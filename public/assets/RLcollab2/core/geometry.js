Game.Geometry = {
    getLine: function(startX, startY, endX, endY) {
        var points = [];
        var dx = Math.abs(endX - startX);
        var dy = Math.abs(endY - startY);
        var sx = (startX < endX) ? 1 : -1;
        var sy = (startY < endY) ? 1 : -1;
        var err = dx - dy;
        var e2;

        while (true) {
            points.push({x: startX, y: startY});
            if (startX == endX && startY == endY) {
                break;
            }
            e2 = err * 2;
            if (e2 > -dx) {
                err -= dy;
                startX += sx;
            }
            if (e2 < dx){
                err += dx;
                startY += sy;
            }
        }

        return points;
    },

    getDistance: function(point1, point2){
        return Math.sqrt( Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2) )

    },

    getClosestTarget: function(map, point, radius, actor){
        length = (radius*2) + 1;
        let leftX = point.x - radius;
        let topY = point.y - radius;
        let rightX = point.x + radius;
        let botY = point.y + radius;
        let x = Number(point.x);
        let y = Number(point.y);
        let z = point.z;
 
        let start = 1;

        while (start <= radius){
            let target;
            let dy = y-start;
            for (let i = x-start; i<= x+start; i++ ){
                target = map.getTile(i, dy, z).getOccupant();
                if (actor) {
                    if (target && actor.canSee(target)){
                        return target;
                    } 
                } else {
                    return target;
                }
                   

            }

            let dx = x+start;
            for (let k = y-start+1; k <= y + start; k++){
                target = map.getTile(dx, k, z).getOccupant();
                if (actor) {
                    if (target && actor.canSee(target)){
                        return target;
                    } 
                } else {
                    return target;
                }
            
            }

            let ey = y+start;
            for (let i = x+start-1; i >= x-start; i--){
                target = map.getTile(i, ey, z).getOccupant();
                if (actor) {
                    if (target && actor.canSee(target)){
                        return target;
                    } 
                } else {
                    return target;
                }
            }

            let ex = x-start;
            for (let k = y+start-1; k >= y-start+1; k--){
                target = map.getTile(ex, k, z).getOccupant();
                if (actor) {
                    if (target && actor.canSee(target)){
                        return target;
                    } 
                } else {
                    return target;
                }
            }

            start++

        } //close while loop

        Game.sendMessage(map._player, "No visible targets");
    }



};


