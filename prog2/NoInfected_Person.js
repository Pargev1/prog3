var LivingCreature = require("./LivingCreature");

module.exports = class NoInfected_Person extends LivingCreature{
    
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    ToInf() {
        var emptyCells = this.chooseCell(4)
        var emptyCells1 = this.chooseCell(0)
        var emptyCells2 = this.chooseCell(1)
        if (emptyCells2.length > emptyCells1.length) {
            var newCell1 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        } else {
            var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        }
        //var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (emptyCells.length > 0) {


            var newX = this.x
            var newY = this.y
            matrix[this.y][this.x] = 4
            infPArr.push(new Infected_Person(this.x, this.y))
            for (var i in noinfPArr) {
                if (newX == noinfPArr[i].x && newY == noinfPArr[i].y) {
                    noinfPArr.splice(i, 1)
                    break
                }
            }



        } else if (newCell1) {

            var newX = newCell1[0]
            var newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }

    }


}
