let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature{
    
    mul() {
        this.multiply++;
        
        let emptyCells = super.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (this.multiply >= 5 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
        
    }
}