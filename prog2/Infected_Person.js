var LivingCreature = require("./LivingCreature");

module.exports = class Infected_Person extends LivingCreature{
    
    
    move() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var emptyCells2 = this.chooseCell(1)


        if (emptyCells2.length > emptyCells.length) {
            var newCell = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        } else {
            var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        }
        if (newCell) {

            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }
        var rnd = Math.random()
        if (rnd > 0.5 && this.multiply == 10) {
            this.die()
        } else if (rnd <= 0.5 && this.multiply == 10) {
            var newX = this.x
            var newY = this.y
            matrix[this.y][this.x] = 5
            noinfPArr.push(new NoInfected_Person(this.x, this.y))
            for (var i in infPArr) {
                if (newX == infPArr[i].x && newY == infPArr[i].y) {
                    infPArr.splice(i, 1)
                    break
                }
            }


        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in infPArr) {
            if (this.x == infPArr[i].x && this.y == infPArr[i].y) {
                infPArr.splice(i, 1);
                break;
            }
        }
    }

}

