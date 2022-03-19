class Grass extends LivingCreature {

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

}

class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 5;
    }


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

    mul() {

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        console.log(emptyCells);
        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 5;
        }
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    eat() {
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }

            this.mul()

        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

class Predatr extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 30;
    }
    

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
    mul() {

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.energy >= 18) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newPredatr = new Predatr(newX, newY);
            PredatrArr.push(newPredatr);
            this.energy = 15;
        }
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells2 = this.chooseCell(1)
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (newCell2 && this.energy >= 0) {

            var newX = newCell2[0]
            var newY = newCell2[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {

            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }

            this.mul()

        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

class NoInfected_Person extends LivingCreature{
    
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
            InfPArr.push(new Infected_Person(this.x, this.y))
            for (var i in NoInfPArr) {
                if (newX == NoInfPArr[i].x && newY == NoInfPArr[i].y) {
                    NoInfPArr.splice(i, 1)
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




class Infected_Person extends LivingCreature{
    
    
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
        var rnd = random()
        if (rnd > 0.5 && this.multiply == 10) {
            this.die()
        } else if (rnd <= 0.5 && this.multiply == 10) {
            var newX = this.x
            var newY = this.y
            matrix[this.y][this.x] = 5
            NoInfPArr.push(new NoInfected_Person(this.x, this.y))
            for (var i in InfPArr) {
                if (newX == InfPArr[i].x && newY == InfPArr[i].y) {
                    InfPArr.splice(i, 1)
                    break
                }
            }


        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in InfPArr) {
            if (this.x == InfPArr[i].x && this.y == InfPArr[i].y) {
                InfPArr.splice(i, 1);
                break;
            }
        }
    }

}