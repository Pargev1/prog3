function generator(matLen, gr, grEat,grEEat,infp,noinfp) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < grEEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < infp; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < noinfp; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

let side = 20;

let matrix = generator(30, 100, 20,20,20,20);
var grassArr = []
var grassEaterArr = []
var PredatrArr = []
var InfPArr = []
var NoInfPArr = []
function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {

                var gr = new Grass(x, y)
                grassArr.push(gr)

            }
            if (matrix[y][x] == 2) {

                var grE = new GrassEater(x, y)
                grassEaterArr.push(grE)

            }
            if (matrix[y][x] == 3) {

                var prd = new Predatr(x, y)
                PredatrArr.push(prd)

            }
            if (matrix[y][x] == 4) {

                var infpe = new Infected_Person(x, y)
                InfPArr.push(infpe)

            }
            if (matrix[y][x] == 5) {

                var noinfpe = new NoInfected_Person(x, y)
                NoInfPArr.push(noinfpe)

            }
        }
    }
    //console.log(grassArr)
}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");

            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");

            }
            else if (matrix[y][x] == 3) {
                fill("red");

            }else if (matrix[y][x] == 4) {
                fill(0,255,255);

            }else if (matrix[y][x] == 5) {
                fill(255,255,255);

            }


            rect(x * side, y * side, side, side);



            //  fill("blue")
            //  text(x+" "+y, x*side+side/2,y*side+side/2)

        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {

        grassEaterArr[i].eat();
    }
    for (var i in PredatrArr) {

        PredatrArr[i].eat();
    }
    for (var i in InfPArr) {

        InfPArr[i].move();
    }
    for (var i in NoInfPArr) {

        NoInfPArr[i].ToInf();
    }


}
